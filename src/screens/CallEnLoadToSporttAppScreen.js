import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const CallEnLoadToSporttAppScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 4000);
  }, []);

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
      zIndex: 1,
    }}>
      <LinearGradient
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        colors={['#EB510A', '#D80715']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <Animatable.View
        animation={{
          0: { height: 0, opacity: 0 },
          1: { height: dimensions.height * 0.2, opacity: 1 },
        }}
        duration={3000}
        easing="linear"
        style={{
          overflow: 'hidden',
          width: dimensions.height * 0.2,
        }}
      >
        <Image
          source={require('../assets/images/loadingCallEnToImage.png')}
          style={{
            width: dimensions.height * 0.2,
            height: dimensions.height * 0.2,
          }}
          resizeMode="contain"
        />
      </Animatable.View>
    </View>
  );
};

export default CallEnLoadToSporttAppScreen;
