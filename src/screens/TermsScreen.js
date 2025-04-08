import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { CheckIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fontInterRegular = 'Inter-Regular';

const fontOrbitronRegular = 'Orbitron-Regular';
const fontOrbitronExtraBold = 'Orbitron-ExtraBold';

const TermsScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();
  const [isRead, setIsRead] = useState(false);

  return (
    <SafeAreaView
      style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#160002', alignItems: 'center', }}
    >
      <LinearGradient
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        colors={['#EB510A', '#D80715']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={{
        width: dimensions.width,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Image
          source={require('../assets/images/warningImage.png')}
          style={{
            width: dimensions.width * 0.4,
            height: dimensions.width * 0.4,
            alignSelf: 'flex-start',
            marginLeft: dimensions.width * 0.03,
            marginTop: dimensions.height * 0.2,
          }}
          resizeMode="contain"
        />
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
            maxWidth: dimensions.width * 0.9,
          }}>
          This application is not a medical product and does not replace consultation with a doctor or professional trainer.
          You are solely responsible for your health and physical activity.
          Call en to Sport is not responsible for possible injuries, discomfort or other negative consequences that may occur during exercise.

          {'\n\n'}Please listen to your body and train responsibly.
        </Text>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginTop: dimensions.height * 0.05,
        }}>
          <TouchableOpacity
            onPress={() => {
              setIsRead((prev) => !prev);
            }}
            style={{
              width: dimensions.width * 0.1,
              height: dimensions.width * 0.1,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginLeft: dimensions.width * 0.04,
              borderRadius: dimensions.width * 0.02,
              borderColor: 'white',
              borderWidth: !isRead ? dimensions.width * 0.003 : 0,
            }}
          >
            {isRead && (
              <>
                <LinearGradient
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 0,
                    borderRadius: dimensions.width * 0.02,
                    borderColor: 'white',
                    borderWidth: dimensions.width * 0.0015,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: dimensions.width * 0.001,
                      height: dimensions.height * 0.01
                    },
                    shadowOpacity: isRead ? 0.3 : 0,
                    elevation: 5,
                    shadowRadius: dimensions.width * 0.03

                  }}
                  colors={['#EB510A', '#D80715']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                />
                <CheckIcon size={dimensions.width * 0.075} color='white' />
              </>
            )}
          </TouchableOpacity>


          <Text
            style={{
              paddingLeft: dimensions.width * 0.02,
              fontFamily: fontOrbitronExtraBold,
              color: 'white',
              maxWidth: dimensions.width * 0.8,
              fontSize: dimensions.width * 0.032,
              textAlign: 'left',
            }}>
            I have read and accept the terms and conditions.
          </Text>
        </View>
      </View>

      {isRead && (
        <TouchableOpacity
          onPress={async () => {
            try {
              await AsyncStorage.setItem('isReadTerms', 'true');
            } catch (error) {
              console.error('Error storing isReadTerms', error);
            }
            navigation.replace('Home');
          }}
          style={{
            bottom: dimensions.height * 0.03,
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
            Start
          </Text>
        </TouchableOpacity>
      )}

    </SafeAreaView>
  );
};

export default TermsScreen;
