import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import PlaceCardComponent from '../components/PlaceCardComponent';

const fontInterRegular = 'Inter-Regular';

const MontFavouritesRealScreen = ({  savedMontPlacesReal, setSavedMontPlacesReal,}) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingHorizontal: dimensions.width * 0.05,
      width: dimensions.width,
    }}>
      {savedMontPlacesReal.length === 0 ? (
        <>
          <Text
            style={{
              fontSize: dimensions.width * 0.04,
              textAlign: 'center',
              alignSelf: 'center',
              marginTop: dimensions.height * 0.2,
              fontWeight: 400,
              color: '#8D655B',
              fontFamily: fontInterRegular,
            }}>
            You have not added to your favorite places
          </Text>
        </>
      ) : (
        <ScrollView style={{
          width: dimensions.width,
          alignSelf: 'center',
        }} contentContainerStyle={{
          paddingBottom: dimensions.height * 0.16,
        }} showsVerticalScrollIndicator={false}>
          {savedMontPlacesReal.map((savedYouPlaceMont, index) => (
            <View key={index} style={{
              marginTop: dimensions.height * 0.01,
            }}>
              <PlaceCardComponent props={savedYouPlaceMont} savedMontPlacesReal={savedMontPlacesReal} setSavedMontPlacesReal={setSavedMontPlacesReal}/>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView >
  );
};

export default MontFavouritesRealScreen;
