import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MontFavouritesRealScreen from './MontFavouritesRealScreen';
import YouMontAboutApp from './YouMontAboutApp';

import ecoShopsYouMontData from '../components/ecoShopsYouMontData';
import popularYouMontData from '../components/popularYouMontData';
import sortingPointsYouMontData from '../components/sortingPointsYouMontData';
import montCafeRealData from '../components/montCafeRealData';
import MontFamousPlacesScreen from './MontFamousPlacesScreen';
import { CalendarIcon } from 'react-native-heroicons/solid';
import MapView, { Marker } from 'react-native-maps';
import { ArrowLeftIcon, ShareIcon } from 'react-native-heroicons/outline';
import PlaceCardComponent from '../components/PlaceCardComponent';

import interestingMontFactsData from '../components/interestingMontFactsData';

const fontInterRegular = 'Inter-Regular';
const fullMontRealPlacesData = [...popularYouMontData, ...ecoShopsYouMontData, ...sortingPointsYouMontData, ...montCafeRealData];


const montRealButtons = [
  {
    id: 1,
    screen: 'Home',
    youIconMont: require('../assets/icons/youHomeMontIcons/youMontHomeIcon.png'),
  },
  {
    id: 2,
    screen: 'FamousPlaces',
    youIconMont: require('../assets/icons/youHomeMontIcons/youMontPlacesIcon.png'),
    youMontTitle: 'MORE FAMOUS PLACES',
  },
  {
    id: 3,
    screen: 'YouMontAboutApp',
    youIconMont: require('../assets/icons/youHomeMontIcons/youMontInfoIcon.png'),
    youMontTitle: 'ABOUT APP',
  },
  {
    id: 4,
    screen: 'MontRealFavorites',
    youIconMont: require('../assets/icons/youHomeMontIcons/youMontFavIcon.png'),
    youMontTitle: 'FAVORITE PLACES',
  },
]

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedMontRealScreen, setSelectedMontRealScreen] = useState('Home');
  const [savedMontPlacesReal, setSavedMontPlacesReal] = useState([]);
  const [isMontMapRealPlaceVisible, setMontMapRealPlaceVisible] = useState(false);
  const [selectedMontRealPlace, setSelectedMontRealPlace] = useState(null);

  const [isFullMapVisible, setIsFullMapVisible] = useState(false);
  const [factIndex, setFactIndex] = useState(1);

  const loadMontSavedPlaces = async () => {
    try {
      const storedMontSavedPlaces = await AsyncStorage.getItem('savedMontPlacesReal');
      const parsedMontSavedPlaces = storedMontSavedPlaces ? JSON.parse(storedMontSavedPlaces) : [];
      setSavedMontPlacesReal(parsedMontSavedPlaces);
    } catch (error) {
      console.error('Error loading savedMontPlacesReal:', error);
    }
  };

  const updateDayFact = async () => {
    try {
      const storedFact = await AsyncStorage.getItem('dayFact');
      const today = new Date().toISOString().slice(0, 10);
      let factData = storedFact ? JSON.parse(storedFact) : null;
      if (!factData) {
        factData = { lastDate: today, factIndex: 1 };
        await AsyncStorage.setItem('dayFact', JSON.stringify(factData));
        setFactIndex(1);
      } else {
        if (factData.lastDate !== today) {
          const newIndex = (factData.factIndex % 28) + 1;
          factData = { lastDate: today, factIndex: newIndex };
          await AsyncStorage.setItem('dayFact', JSON.stringify(factData));
          setFactIndex(newIndex);
        } else {
          setFactIndex(factData.factIndex);
        }
      }
    } catch (error) {
      console.error('Error updating day fact:', error);
    }
  };

  useEffect(() => {
    loadMontSavedPlaces();
    updateDayFact();
  }, []);

  return (
    <View style={{
      backgroundColor: '#160002',
      width: '100%',
      height: dimensions.height,
      flex: 1,
    }}>
      <View style={{
        backgroundColor: '#2D1304',
        alignItems: 'center',
        height: dimensions.height * 0.18,
        alignSelf: 'center',
        justifyContent: 'center',
        width: dimensions.width,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: dimensions.height * 0.01,
        },
        shadowOpacity: 0.4,
        shadowRadius: dimensions.width * 0.01,
        elevation: 1,
      }}>
        <SafeAreaView style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
          {selectedMontRealScreen === 'Home' ? (
            <Image
              source={require('../assets/images/youMontUpImage.png')}
              style={{
                width: dimensions.width * 0.8,
                height: dimensions.height * 0.1,
                top: -dimensions.height * 0.01,
                alignSelf: 'center',
              }}
              resizeMode='contain'
            />
          ) : (
            <Text
              style={{
                top: -dimensions.height * 0.01,
                textAlign: "left",
                alignSelf: 'flex-start',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontFamily: fontInterRegular,
                fontSize: dimensions.width * 0.07,
                paddingHorizontal: dimensions.width * 0.04,
                color: 'white',
              }}
            >
              {selectedMontRealScreen === 'FamousPlaces' ? 'MORE FAMOUS PLACES' : selectedMontRealScreen === 'YouMontAboutApp' ? 'ABOUT APP' : selectedMontRealScreen === 'MontRealFavorites' ? 'FAVORITE PLACES' : ''}
            </Text>
          )}
        </SafeAreaView>
      </View>

      {selectedMontRealScreen === 'Home' ? (
        <SafeAreaView style={{
          flex: 1,
          paddingHorizontal: dimensions.width * 0.05,
          width: dimensions.width,
        }}>
          {!isFullMapVisible ? (
            <>
              <Text
                style={{
                  fontSize: dimensions.width * 0.05,
                  paddingHorizontal: dimensions.width * 0.04,
                  textAlign: "left",
                  alignSelf: 'flex-start',
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: fontInterRegular,
                  textTransform: 'uppercase',
                  marginTop: dimensions.height * 0.01,
                }}
              >
                Interesting facts for every day
              </Text>

              <View style={{
                height: dimensions.height * 0.12,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.02,
                backgroundColor: '#A53319',
                justifyContent: 'space-between',
                paddingHorizontal: dimensions.width * 0.03,
                flexDirection: 'row',
                width: dimensions.width * 0.92,
                borderRadius: dimensions.width * 0.055,
                paddingVertical: dimensions.height * 0.01,
                alignItems: 'center',
              }}>
                <Text
                  style={{
                    fontSize: dimensions.width * 0.035,
                    textAlign: "left",
                    fontWeight: 600,
                    color: 'white',
                    fontFamily: fontInterRegular,
                    textTransform: 'uppercase',
                    maxWidth: dimensions.width * 0.6,
                  }}
                >
                  {interestingMontFactsData.find(item => item.id === factIndex)?.montText}
                </Text>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  height: dimensions.height * 0.05,
                  backgroundColor: '#160002',
                  borderRadius: dimensions.width * 0.03,
                  alignItems: 'center',
                  width: dimensions.width * 0.23,
                }}>
                  <CalendarIcon size={dimensions.height * 0.025} color='white' />
                  <Text
                    style={{
                      marginLeft: dimensions.width * 0.01,
                      textAlign: "left",
                      fontWeight: 700,
                      color: 'white',
                      fontFamily: fontInterRegular,
                      fontSize: dimensions.width * 0.037,
                      maxWidth: dimensions.width * 0.6,
                      textTransform: 'uppercase',
                    }}
                  >
                    Day: {factIndex}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  paddingHorizontal: dimensions.width * 0.04,
                  textAlign: "left",
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: fontInterRegular,
                  fontSize: dimensions.width * 0.05,
                  alignSelf: 'flex-start',
                  marginTop: dimensions.height * 0.03,
                }}
              >
                Map Montreal
              </Text>

              <MapView
                style={{
                  marginTop: dimensions.height * 0.01,
                  borderRadius: dimensions.width * 0.055,
                  zIndex: 50,
                  alignSelf: 'center',
                  height: dimensions.height * 0.3,
                  width: dimensions.width * 0.92,
                }}
                region={{
                  latitude: fullMontRealPlacesData[1].coordinates.latitude,
                  longitude: fullMontRealPlacesData[1].coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >

                {fullMontRealPlacesData.map((location, index) => (
                  <Marker
                    key={index}
                    coordinate={location.coordinates}
                    title={location.title}
                    description={location.description}
                    pinColor={"#A53319"}
                  />
                ))}
              </MapView>

              <TouchableOpacity
                onPress={() => {
                  setIsFullMapVisible(true);
                }}
                style={{
                  alignItems: 'center',
                  width: dimensions.width * 0.92,
                  marginTop: dimensions.height * 0.015,
                  backgroundColor: '#A53319',
                  borderRadius: dimensions.width * 0.05,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: dimensions.height * 0.07,
                }}>
                <Text
                  style={{
                    fontSize: dimensions.width * 0.045,
                    textAlign: "center",
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: fontInterRegular,
                    textTransform: 'uppercase',
                  }}
                >
                  Open map
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  setIsFullMapVisible(false);
                  setSelectedMontRealPlace(null);
                }}
                style={{
                  marginTop: dimensions.height * 0.015,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: dimensions.width * 0.04,
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                }}>
                <ArrowLeftIcon size={dimensions.width * 0.07} color='white' />
                <Text
                  style={{
                    marginLeft: dimensions.width * 0.025,
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: fontInterRegular,
                    textAlign: "center",
                    textTransform: 'uppercase',
                    fontSize: dimensions.width * 0.045,
                  }}
                >
                  Map Montreal
                </Text>
              </TouchableOpacity>

              <MapView
                style={{
                  zIndex: 0,
                  borderRadius: dimensions.width * 0.055,
                  alignSelf: 'center',
                  marginTop: dimensions.height * 0.01,
                  width: dimensions.width * 0.92,
                  height: dimensions.height * 0.6,
                }}
                region={{
                  latitudeDelta: 0.01,
                  longitude: fullMontRealPlacesData[0].coordinates.longitude,
                  latitude: fullMontRealPlacesData[0].coordinates.latitude,
                  longitudeDelta: 0.01,
                }}
              >

                {fullMontRealPlacesData.map((location, index) => (
                  <Marker
                    title={location.title}
                    coordinate={location.coordinates}
                    description={location.description}
                    pinColor={selectedMontRealPlace && location.coordinates === selectedMontRealPlace.coordinates ? "#181818" : "#A53319"}
                    key={index}
                    onPress={() => {
                      setSelectedMontRealPlace(location);
                      setMontMapRealPlaceVisible(true);
                    }}
                  />
                ))}
              </MapView>

              {selectedMontRealPlace && isMontMapRealPlaceVisible && (
                <View style={{
                  position: 'absolute',
                  bottom: dimensions.height * 0.17,
                }}>
                  <PlaceCardComponent props={selectedMontRealPlace} savedMontPlacesReal={savedMontPlacesReal} setSavedMontPlacesReal={setSavedMontPlacesReal} />
                </View>
              )}
            </>
          )}

        </SafeAreaView>
      ) : selectedMontRealScreen === 'MontRealFavorites' ? (
        <MontFavouritesRealScreen setSelectedMontRealScreen={setSelectedMontRealScreen} setSelectedMontRealPlace={setSelectedMontRealPlace} savedMontPlacesReal={savedMontPlacesReal} setSavedMontPlacesReal={setSavedMontPlacesReal} setMontMapRealPlaceVisible={setMontMapRealPlaceVisible} />
      ) : selectedMontRealScreen === 'YouMontAboutApp' ? (
        <YouMontAboutApp setSelectedMontRealScreen={setSelectedMontRealScreen} selectedMontRealPlace={selectedMontRealPlace} isMontMapRealPlaceVisible={isMontMapRealPlaceVisible} setMontMapRealPlaceVisible={setMontMapRealPlaceVisible} setSavedMontPlacesReal={setSavedMontPlacesReal} savedMontPlacesReal={savedMontPlacesReal} selectedMontRealScreen={selectedMontRealScreen} />
      ) : selectedMontRealScreen === 'FamousPlaces' ? (
        <MontFamousPlacesScreen setSelectedMontRealScreen={setSelectedMontRealScreen} setSavedMontPlacesReal={setSavedMontPlacesReal} savedMontPlacesReal={savedMontPlacesReal} />
      ) : null}

      <View
        style={{
          alignSelf: 'center',
          bottom: dimensions.height * 0.03,
          backgroundColor: '#2D1304',
          height: dimensions.height * 0.1,
          width: dimensions.width * 0.92,
          justifyContent: 'space-between',
          paddingHorizontal: dimensions.width * 0.035,
          borderRadius: dimensions.width * 0.04,
          flexDirection: 'row',
          position: 'absolute',
          alignItems: 'center',
          zIndex: 4444,
          borderColor: '#FDCC06',
        }}
      >
        {montRealButtons.map((button, index) => (
          <TouchableOpacity
            key={button.id}
            onPress={() => setSelectedMontRealScreen(button.screen)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selectedMontRealScreen === button.screen ? '#A53319' : 'transparent',
              width: dimensions.height * 0.07,
              height: dimensions.height * 0.07,
              borderRadius: dimensions.height * 0.015,
            }}
          >
            <Image
              source={button.youIconMont}
              style={{
                textAlign: 'center',
                
                width: dimensions.height * 0.04,
                height: dimensions.height * 0.04,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};

export default HomeScreen;
