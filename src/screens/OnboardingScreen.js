import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import youOnboardingMontRealData from '../components/youOnboardingMontRealData';
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
    if (currentCallEnSlideToSportIndex < youOnboardingMontRealData.length - 1) {
      callEnSlidesToSportRef.current.scrollToIndex({ index: currentCallEnSlideToSportIndex + 1 });
    } else {
      navigation.replace('TermsScreen');
    }
  };


  const renderYouMontItem = ({ item }) => (
    <View style={{ width: dimensions.width, flex: 1, justifyContent: 'space-between', alignItems: 'center' }} >
      <View style={{
        width: dimensions.width,
        alignSelf: 'flex-start',
        alignItems: 'center',
      }}>
        <Image
          source={item.callEnImage}
          style={{
            width: dimensions.width,
            height: dimensions.height * 0.6,
            alignSelf: 'center',
            borderBottomLeftRadius: dimensions.width * 0.05,
            borderBottomRightRadius: dimensions.width * 0.05,
          }}
          resizeMode="stretch"
        />
        <Text
          style={{
            paddingHorizontal: dimensions.width * 0.05,
            fontFamily: fontOrbitronExtraBold,
            color: 'white',
            maxWidth: dimensions.width * 0.89,
            alignSelf: 'flex-start',
            fontSize: dimensions.width * 0.065,
            marginTop: dimensions.height * 0.02,
            textAlign: 'left',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontWeight: 400,
            marginTop: dimensions.height * 0.02,
            textAlign: 'left',
            alignSelf: 'flex-start',
            fontFamily: fontInterRegular,
            color: '#fff',
            fontSize: dimensions.width * 0.035,
            paddingHorizontal: dimensions.width * 0.05,
            maxWidth: dimensions.width * 0.8,
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#160002', alignItems: 'center', }}
    >
      <LinearGradient
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        colors={['#EB510A', '#D80715']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={{ display: 'flex' }}>
        <FlatList
          pagingEnabled
          data={youOnboardingMontRealData}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          renderItem={renderYouMontItem}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: callEnScrollToSportX } } }], {
            useNativeDriver: false,
          })}
          ref={callEnSlidesToSportRef}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          scrollToTheNextCallEnSportSlide();
        }}
        style={{
          bottom: dimensions.height * 0.15,
          borderRadius: dimensions.width * 0.055,
          width: dimensions.width * 0.45,
          height: dimensions.height * 0.08,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-start',
          marginLeft: dimensions.width * 0.04,
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
