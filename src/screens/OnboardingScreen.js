import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import callEnOnboardingToSportData from '../components/callEnOnboardingToSportData';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const fontInterRegular = 'Inter-Regular';

const fontOrbitronRegular = 'Orbitron-Regular';
const fontOrbitronExtraBold = 'Orbitron-ExtraBold';

const OnboardingScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [currentCallEnSlideToSportIndex, setCurrentCallEnSlideToSportIndex] = useState(0);
  const callEnSlidesToSportRef = useRef(null);
  const callEnScrollToSportX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };
    const dimensionListener = Dimensions.addEventListener('change', onChange);
    return () => {
      dimensionListener.remove();
    };
  }, []);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentCallEnSlideToSportIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToTheNextCallEnSportSlide = () => {
    if (currentCallEnSlideToSportIndex < callEnOnboardingToSportData.length - 1) {
      callEnSlidesToSportRef.current.scrollToIndex({ index: currentCallEnSlideToSportIndex + 1 });
    } else {
      navigation.replace('TermsScreen');
    }
  };

  const callEnRenderItem = ({ item }) => (
    <View style={{
      alignItems: 'center',

      justifyContent: 'space-between',

      flex: 1,

      width: dimensions.width,
    }}>
      <View style={{
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: dimensions.width,
      }}>
        <Image
          source={item.callEnImage}
          style={{
            borderBottomLeftRadius: dimensions.width * 0.05,
            width: dimensions.width,
            borderBottomRightRadius: dimensions.width * 0.05,
            alignSelf: 'center',
            height: dimensions.height * 0.6,
          }}
          resizeMode="stretch"
        />
        <Text
          style={{
            paddingHorizontal: dimensions.width * 0.05,
            textAlign: 'left',
            color: 'white',
            fontSize: dimensions.width * 0.06,
            maxWidth: dimensions.width * 0.89,
            alignSelf: 'flex-start',
            fontFamily: fontOrbitronExtraBold,
            marginTop: dimensions.height * 0.02,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: '#fff',
            marginTop: dimensions.height * 0.015,
            fontWeight: 400,
            textAlign: 'left',
            paddingHorizontal: dimensions.width * 0.05,
            fontFamily: fontInterRegular,
            alignSelf: 'flex-start',
            fontSize: dimensions.width * 0.035,
            maxWidth: dimensions.width * 0.8,
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={{ 
        alignItems: 'center', 
        backgroundColor: '#160002', 
        flex: 1, 
        justifyContent: 'space-between', 
      }}
    >
      <LinearGradient
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        colors={['#EB510A', '#D80715']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={{ display: 'flex' }}>
        <FlatList
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={callEnRenderItem}
          data={callEnOnboardingToSportData}
          viewabilityConfig={viewConfig}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: callEnScrollToSportX } } }], {
            useNativeDriver: false,
          })}
          ref={callEnSlidesToSportRef}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          scrollToTheNextCallEnSportSlide();
        }}
        style={{
          borderRadius: dimensions.width * 0.055,
          marginLeft: dimensions.width * 0.04,
          width: dimensions.width * 0.45,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: dimensions.height * 0.15,
          alignSelf: 'flex-start',
          height: dimensions.height * 0.08,
        }}
      >
        <LinearGradient
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 0,
            borderRadius: dimensions.width * 0.03,
            borderColor: 'white',
            borderWidth: dimensions.width * 0.0015,
            shadowColor: '#000',
            shadowOffset: {
              width: dimensions.width * 0.001,
              height: dimensions.height * 0.01
            },
            shadowOpacity: 0.3,
            elevation: 5,
            shadowRadius: dimensions.width * 0.03

          }}
          colors={['#EB510A', '#D80715']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontFamily: fontOrbitronRegular,
            fontSize: dimensions.width * 0.06,
            color: '#fff',
            textTransform: 'uppercase',
            paddingHorizontal: dimensions.width * 0.05,
          }}>
          {currentCallEnSlideToSportIndex === 0 ? 'Hello' : currentCallEnSlideToSportIndex === 1 ? 'Next' : 'Good!'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;
