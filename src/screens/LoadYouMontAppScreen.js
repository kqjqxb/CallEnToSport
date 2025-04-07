import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LoadYouMontAppScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();


  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000)
  }, []);

  return (
    <View style={{
      backgroundColor: '#160002',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
      zIndex: 1,
    }}>
      <Animatable.Image
        source={require('../assets/images/loadYouMontImage.png')}
        style={{
          width: dimensions.height * 0.15,
          height: dimensions.height * 0.15,
        }}
        resizeMode="contain"
        animation={{
          from: { rotate: '0deg' },
          to: { rotate: '1080deg' }, 
        }}
        duration={3000}
        easing="linear"
      />
    </View>
  );
};

export default LoadYouMontAppScreen;
