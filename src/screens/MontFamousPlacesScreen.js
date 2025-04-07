import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Share,
  Pressable,
  StyleSheet,
} from 'react-native';

const fontInterRegular = 'Inter-Regular';

import popularYouMontData from '../components/popularYouMontData';
import ecoShopsYouMontData from '../components/ecoShopsYouMontData';
import sortingPointsYouMontData from '../components/sortingPointsYouMontData';
import montCafeRealData from '../components/montCafeRealData';
import { XMarkIcon } from 'react-native-heroicons/outline';
import PlaceCardComponent from '../components/PlaceCardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MontFamousPlacesScreen = ({ setSavedMontPlacesReal, savedMontPlacesReal }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  const styles = createMontFamousStyles(dimensions);

  const [isMontRealPlaceOpened, setMontRealPlaceOpened] = useState(false);
  const [selectedMontRealPlace, setSelectedMontRealPlace] = useState(null);

  const scrollMontViewRealRef = useRef(null);

  const [selectedMontRealPlacesType, setSelectedMontRealPlacesType] = useState('Popular');

  const [startPlaceModalVisible, setStartPlaceModalVisible] = useState(false);

  const [generatedMontRealPlace, setGeneratedMontRealPlace] = useState(null);

  const [generatedPrevMontPlace, setGeneratedPrevMontPlace] = useState(null);

  useEffect(() => {
    if (scrollMontViewRealRef.current) {
      scrollMontViewRealRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [isMontRealPlaceOpened]);

  const getYouDataMontRealByC = (selMontCategory) => {
    switch (selMontCategory) {
      case 'Popular':
        return popularYouMontData;
      case 'Eco-shops':
        return ecoShopsYouMontData;
      case 'Sorting points':
        return sortingPointsYouMontData;
      case 'Cafe':
        return montCafeRealData;
      default:
        return [];
    }
  };

  const youMontRealData = getYouDataMontRealByC(selectedMontRealPlacesType);

  const isMontRealPlaceSaved = (shinePlace) => {
    return savedMontPlacesReal.some((nPlace) => nPlace.id === shinePlace?.id);
  };

  const handleGenerateShinePlace = () => {

    let montRandRealPlace;
    if (youMontRealData.length === 0) return;
    do {
      const randomIndex = Math.floor(Math.random() * youMontRealData.length);
      montRandRealPlace = youMontRealData[randomIndex];
    } while (generatedPrevMontPlace && montRandRealPlace.id === generatedPrevMontPlace.id);
    setGeneratedMontRealPlace(montRandRealPlace);
    setGeneratedPrevMontPlace(montRandRealPlace);
    setStartPlaceModalVisible(true);
  };

  const saveMontPlaceReal = async (montPlaceReal) => {
    try {
      const savedMontPlacesReal = await AsyncStorage.getItem('savedMontPlacesReal');
      const parsedSavedMontPlacesReal = savedMontPlacesReal ? JSON.parse(savedMontPlacesReal) : [];

      const thisShinePlaceIndex = parsedSavedMontPlacesReal.findIndex((r) => r.id === montPlaceReal.id);

      if (thisShinePlaceIndex === -1) {
        const updatedSavedMontPlacesReal = [montPlaceReal, ...parsedSavedMontPlacesReal];
        await AsyncStorage.setItem('savedMontPlacesReal', JSON.stringify(updatedSavedMontPlacesReal));
        setSavedMontPlacesReal(updatedSavedMontPlacesReal);
      } else {
        const updatedSavedMontPlacesReal = parsedSavedMontPlacesReal.filter((r) => r.id !== montPlaceReal.id);
        await AsyncStorage.setItem('savedMontPlacesReal', JSON.stringify(updatedSavedMontPlacesReal));
        setSavedMontPlacesReal(updatedSavedMontPlacesReal);
      }
    } catch (error) {
      console.error('error of save/delete shine place:', error);
    }
  };

  const shareMontRealPlace = async (title) => {
    try {
      await Share.share({
        message: `We need visit ${title}!`,
      });
    } catch (error) {
      console.error('Error share:', error);
    }
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingHorizontal: dimensions.width * 0.05,
      width: dimensions.width,
    }}>
      {!isMontRealPlaceOpened ? (
        <ScrollView ref={scrollMontViewRealRef} style={{

          alignSelf: 'center',

          width: dimensions.width,

        }}
          contentContainerStyle={{

            paddingBottom: dimensions.height * 0.16,

          }} showsVerticalScrollIndicator={false}>
          <View style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
            marginLeft: dimensions.width * 0.04,
            width: dimensions.width * 0.92,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              {['Popular', 'Eco-shops', 'Sorting points', 'Cafe'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={{
                    marginRight: dimensions.width * 0.05,
                    borderBottomWidth: dimensions.width * 0.005,
                    borderBottomColor: selectedMontRealPlacesType === category ? '#A53319' : 'transparent',
                    paddingmargin: dimensions.width * 0.03,
                  }}
                  onPress={() => {
                    setSelectedMontRealPlacesType(`${category}`);
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: dimensions.width * 0.04,
                      fontFamily: fontInterRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.04,
                    }}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{
            height: dimensions.height * 0.12,
            alignSelf: 'center',
            paddingVertical: dimensions.height * 0.01,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: dimensions.width * 0.03,
            flexDirection: 'row',
            width: dimensions.width * 0.92,
            backgroundColor: '#FFFFFF',
            borderRadius: dimensions.width * 0.055,
            marginBottom: dimensions.height * 0.015,
            marginTop: dimensions.height * 0.02,
          }}>
            <View>
              <Text
                style={{
                  maxWidth: dimensions.width * 0.57,
                  textAlign: "left",
                  fontFamily: fontInterRegular,
                  
                  fontSize: dimensions.width * 0.039,
                  color: '#A53319',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Don't know where to go?
              </Text>

              <Text
                style={{
                  textAlign: "left",
                  fontSize: dimensions.width * 0.032,
                  maxWidth: dimensions.width * 0.55,
                  
                  
                  fontWeight: 400,
                  marginTop: dimensions.height * 0.005,
                  fontFamily: fontInterRegular,
                  color: '#A53319',
                }}
              >
                Click and we'll suggest a place that could become your new favorite.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleGenerateShinePlace();
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                height: dimensions.height * 0.065,
                backgroundColor: '#A53319',
                borderRadius: dimensions.width * 0.03,
                alignItems: 'center',
                width: dimensions.width * 0.27,
              }}>
              <Image
                source={require('../assets/images/generateMontImage.png')}
                style={{
                  marginRight: dimensions.width * 0.01,
                  textAlign: 'center',
                  height: dimensions.width * 0.05,
                  width: dimensions.width * 0.05,
                }}
              />
              <Text
                style={{
                  marginLeft: dimensions.width * 0.01,
                  maxWidth: dimensions.width * 0.6,
                  fontWeight: 700,
                  color: 'white',
                  textAlign: "left",
                  fontFamily: fontInterRegular,
                  fontSize: dimensions.width * 0.04,
                }}
              >
                Start
              </Text>
            </TouchableOpacity>
          </View>

          {youMontRealData.map((montFamousPlace, index) => (
            <TouchableOpacity onPress={() => {
              setSelectedMontRealPlace(montFamousPlace);
              setMontRealPlaceOpened(true);
            }} key={montFamousPlace.id} style={{
              marginTop: dimensions.height * 0.01,
            }}>
              <PlaceCardComponent props={montFamousPlace} savedMontPlacesReal={savedMontPlacesReal} setSavedMontPlacesReal={setSavedMontPlacesReal} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <>
          <View style={{
            width: dimensions.width * 0.92,
            paddingVertical: dimensions.height * 0.02,
            paddingHorizontal: dimensions.width * 0.05,
            alignSelf: 'center',
            borderRadius: dimensions.width * 0.055,
            backgroundColor: '#2D1304',
            marginTop: dimensions.height * 0.015,
          }}>
            <Image
              source={selectedMontRealPlace?.image}
              style={{
                alignSelf: 'center',
                height: dimensions.height * 0.27,
                borderRadius: dimensions.width * 0.03,
                width: dimensions.width * 0.82,
              }}
              resizeMode='cover'
            />

            <Text
              style={{
                fontFamily: fontInterRegular,
                textAlign: "left",
                fontSize: dimensions.width * 0.045,
                color: 'white',
                alignSelf: 'flex-start',
                marginTop: dimensions.height * 0.015,
                fontWeight: 700,
              }}
            >
              {selectedMontRealPlace?.title}
            </Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',

              alignSelf: 'flex-start',
              marginVertical: dimensions.height * 0.015,
            }}>
              <Image
                source={require('../assets/images/youMontCoordinatesImage.png')}
                style={{

                  marginRight: dimensions.width * 0.015,
                  width: dimensions.height * 0.032,
                  height: dimensions.height * 0.032,
                }}
                resizeMode='contain'
              />

              <Text style={styles.text}>
                Coordinates {selectedMontRealPlace?.coordinates.latitude}, {selectedMontRealPlace?.coordinates.longitude}
              </Text>
            </View>

            <Text style={styles.text}>
              {selectedMontRealPlace?.description}
            </Text>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: dimensions.height * 0.025,

              width: dimensions.width * 0.7,
            }}>
              <TouchableOpacity
                onPress={() => {
                  setMontMapRealPlaceVisible(false);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: dimensions.height * 0.06,
                  backgroundColor: '#A53319',
                  borderRadius: dimensions.width * 0.03,
                  alignSelf: 'center',
                  width: dimensions.width * 0.38,
                }}>
                <Text
                  style={{
                    fontFamily: fontInterRegular,
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: dimensions.width * 0.04,
                    color: 'white',
                  }}
                >
                  Open in MAP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  saveMontPlaceReal(selectedMontRealPlace);
                }}
                style={{
                  borderColor: '#A53319',
                  height: dimensions.height * 0.06,
                  backgroundColor: isMontRealPlaceSaved(selectedMontRealPlace) ? '#A53319' : 'transparent',
                  borderRadius: dimensions.width * 0.03,
                  alignSelf: 'center',
                  borderWidth: isMontRealPlaceSaved(selectedMontRealPlace) ? 0 : dimensions.width * 0.004,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: dimensions.width * 0.14,
                }}>
                <Image
                  source={isMontRealPlaceSaved(selectedMontRealPlace)
                    ? require('../assets/icons/fullHeartMontIcon.png')
                    : require('../assets/icons/emptyHeartYouMontIcon.png')
                  }
                  style={{
                    width: dimensions.width * 0.07,
                    height: dimensions.width * 0.07,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  shareMontRealPlace(selectedMontRealPlace.title);
                }}
                style={{
                  width: dimensions.width * 0.14,
                  height: dimensions.height * 0.06,
                  backgroundColor: 'transparent',
                  borderColor: '#A53319',
                  borderWidth: dimensions.width * 0.004,
                  borderRadius: dimensions.width * 0.03,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/icons/shareYouMontIcon.png')}
                  style={{
                    width: dimensions.width * 0.05,
                    height: dimensions.width * 0.05,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>

          </View>

          <TouchableOpacity
            onPress={() => {
              setSelectedMontRealPlace(null);
              setMontRealPlaceOpened(false);
            }}
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fontInterRegular,
                fontWeight: 500,
                textAlign: "center",
                fontSize: dimensions.width * 0.05,
                marginTop: dimensions.height * 0.015,
                alignSelf: 'center',
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </>
      )}

      <Modal visible={startPlaceModalVisible} transparent={true} animationType="fade">
        <View style={{
          width: dimensions.width,
          height: dimensions.height,
          position: 'absolute',
          top: 0,
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Pressable onPress={() => {
            setStartPlaceModalVisible(false);
          }} style={{
            width: dimensions.width,
            height: dimensions.height,
            position: 'absolute',
            top: 0,
            zIndex: 1,
          }} />
          <View style={{
            width: dimensions.width * 0.86,
            paddingHorizontal: dimensions.width * 0.05,
            backgroundColor: 'white',
            borderRadius: dimensions.width * 0.05,
            alignSelf: 'center',
            zIndex: 2,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: dimensions.height * 0.015,
            }}>
              <Image
                source={require('../assets/images/redGenerateMontImage.png')}
                style={{
                  width: dimensions.height * 0.045,
                  height: dimensions.height * 0.045,
                  textAlign: 'center',
                  marginRight: dimensions.width * 0.01,
                }}
                resizeMode='contain'
              />

              <Text
                style={{
                  textAlign: "left",
                  fontSize: dimensions.width * 0.05,
                  fontFamily: fontInterRegular,
                  fontWeight: 700,
                  color: '#160002',
                }}
              >
                We suggest visiting:
              </Text>
            </View>

            <View style={{
              transform: [{ scale: 0.85 }],
            }}>
              <View style={{
                width: dimensions.width * 0.92,
                borderRadius: dimensions.width * 0.055,
                paddingHorizontal: dimensions.width * 0.05,
                paddingVertical: dimensions.height * 0.02,
                backgroundColor: '#2D1304',
                alignSelf: 'center',
                marginTop: -dimensions.height * 0.02,
              }}>
                <Image
                  source={generatedMontRealPlace?.image}
                  style={{
                    width: dimensions.width * 0.82,
                    height: dimensions.height * 0.27,
                    borderRadius: dimensions.width * 0.03,
                    alignSelf: 'center',
                  }}
                  resizeMode='cover'
                />

                <Text
                  style={{
                    textAlign: "left",
                    fontSize: dimensions.width * 0.045,
                    marginTop: dimensions.height * 0.015,
                    alignSelf: 'flex-start',
                    fontFamily: fontInterRegular,
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  {generatedMontRealPlace?.title}
                </Text>

                <Text
                  style={styles.text}>
                  {generatedMontRealPlace?.description}
                </Text>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: dimensions.height * 0.025,

                  width: dimensions.width * 0.7,
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      setStartPlaceModalVisible(false);
                      setSelectedMontRealPlace(generatedMontRealPlace);
                      setMontRealPlaceOpened(true);
                    }}
                    style={{
                      justifyContent: 'center',
                      height: dimensions.height * 0.06,
                      backgroundColor: '#A53319',
                      borderRadius: dimensions.width * 0.03,
                      alignSelf: 'center',
                      width: dimensions.width * 0.38,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: dimensions.width * 0.04,
                        textAlign: "center",
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: fontInterRegular,
                      }}
                    >
                      Open
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      saveMontPlaceReal(generatedMontRealPlace);
                    }}
                    style={{
                      borderWidth: isMontRealPlaceSaved(generatedMontRealPlace) ? 0 : dimensions.width * 0.004,
                      alignItems: 'center',
                      backgroundColor: isMontRealPlaceSaved(generatedMontRealPlace) ? '#A53319' : 'transparent',
                      borderRadius: dimensions.width * 0.03,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      width: dimensions.width * 0.14,
                      borderColor: '#A53319',
                      height: dimensions.height * 0.06,
                    }}>
                    <Image
                      source={isMontRealPlaceSaved(generatedMontRealPlace)
                        ? require('../assets/icons/fullHeartMontIcon.png')
                        : require('../assets/icons/emptyHeartYouMontIcon.png')
                      }
                      style={{
                        width: dimensions.width * 0.07,
                        height: dimensions.width * 0.07,
                      }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      shareMontRealPlace(generatedMontRealPlace.title);
                    }}
                    style={{
                      justifyContent: 'center',
                      height: dimensions.height * 0.06,
                      alignItems: 'center',
                      borderColor: '#A53319',
                      borderWidth: dimensions.width * 0.004,
                      borderRadius: dimensions.width * 0.03,
                      alignSelf: 'center',
                      backgroundColor: 'transparent',
                      width: dimensions.width * 0.14,
                    }}>
                    <Image
                      source={require('../assets/icons/shareYouMontIcon.png')}
                      style={{
                        width: dimensions.width * 0.05,
                        height: dimensions.width * 0.05,
                      }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </View>

              </View>

              <TouchableOpacity
                onPress={() => {
                  setStartPlaceModalVisible(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: dimensions.height * 0.015,
                  marginBottom: -dimensions.height * 0.015,
                  alignSelf: 'center',
                }}>
                <XMarkIcon color={'#2D1304'} size={dimensions.height * 0.04} />
                <Text
                  style={{
                    justifyContent: 'center',
                    fontWeight: 600,
                    color: '#2D1304',
                    fontSize: dimensions.width * 0.05,
                    alignSelf: 'center',
                    fontFamily: fontInterRegular,
                    alignItems: 'center',
                    textAlign: "center",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView >
  );
};

export const createMontFamousStyles = (dimensions) => StyleSheet.create({
  text: {
    textAlign: "left",
    fontFamily: fontInterRegular,
    color: 'white',
    fontSize: dimensions.width * 0.037,
    fontWeight: 500,
    maxWidth: dimensions.width * 0.8,
  }
});

export default MontFamousPlacesScreen;
