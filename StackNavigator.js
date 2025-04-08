import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, UserContext } from './src/context/UserContext';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { loadUserData } from './src/redux/userSlice';
import CallEnLoadToSporttAppScreen from './src/screens/CallEnLoadToSporttAppScreen';
import TermsScreen from './src/screens/TermsScreen';


const Stack = createNativeStackNavigator();

const CallEnToSportStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  const [isCallEnOnboardingToSportVisibled, setIsCallEnOnboardingToSportVisibled] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [isReadTerms, setIsReadTerms] = useState(false);

  const [initializingCallEnToSportApp, setInitializingCallEnToSportApp] = useState(true);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const loadCallEnToSportUser = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const storedCallEnToSportUser = await AsyncStorage.getItem(storageKey);
        const isCallEnOnboardingWasVisibled = await AsyncStorage.getItem('isCallEnOnboardingWasVisibled');
        const storedIsReadTerms = await AsyncStorage.getItem('isReadTerms');

        if (storedCallEnToSportUser) {
          setUser(JSON.parse(storedCallEnToSportUser));
          setIsCallEnOnboardingToSportVisibled(false);
        } else if (isCallEnOnboardingWasVisibled) {
          setIsCallEnOnboardingToSportVisibled(false);
        } else {
          setIsCallEnOnboardingToSportVisibled(true);
          await AsyncStorage.setItem('isCallEnOnboardingWasVisibled', 'true');
        }

        if (storedIsReadTerms === 'true') {
          setIsReadTerms(true);
        } else {
          setIsReadTerms(false);
        }
      } catch (error) {
        console.error('Error loading of montYou Real user', error);
      } finally {
        setInitializingCallEnToSportApp(false);
      }
    };
    loadCallEnToSportUser();
  }, [setUser]);

  if (initializingCallEnToSportApp) {
    return (
      <View style={{
        backgroundColor: '#EB510A',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isCallEnOnboardingToSportVisibled
            ? 'CallEnOnbToSportScreen'
            : !isReadTerms
              ? 'TermsScreen'
              : 'CallEnLoadApp'
        }
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CallEnOnbToSportScreen" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TermsScreen" component={TermsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CallEnLoadApp" component={CallEnLoadToSporttAppScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default CallEnToSportStack;
