import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import RNRestart from 'react-native-restart';

const fontInterRegular = 'Inter-Regular';
const fontOrbitronRegular = 'Orbitron-Regular';
const fontOrbitronExtraBold = 'Orbitron-ExtraBold';
const fontOrbitronMedium = 'Orbitron-Medium';

const CallEnSettingsScreen = ({ savedMontPlacesReal, setSavedMontPlacesReal, }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const styles = createCallEnSettingsStyles(dimensions);
  const [isVibrationOn, setIsVibrationOn] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [editingAge, setEditingAge] = useState(false);
  const [name, setName] = useState("Name");
  const [age, setAge] = useState("Age");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');
        const savedAge = await AsyncStorage.getItem('userAge');
        const savedImage = await AsyncStorage.getItem('userImage');
        if (savedName !== null) {
          setName(savedName);
        }
        if (savedAge !== null) {
          setAge(savedAge);
        }
        if (savedImage !== null) {
          setImage(savedImage);
        }
      } catch (error) {
        console.error('Error loading user data', error);
      }
    };
    loadData();
  }, []);

  const callEnClearAllSportAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      RNRestart.Restart();
      console.log('AsyncStorage очищено');
    } catch (error) {
      console.error('Помилка при очищенні AsyncStorage', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userAge', age);
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  const callHandleEnToSportImagePicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImage(uri);
        try {
          await AsyncStorage.setItem('userImage', uri);
        } catch (error) {
          console.error('Error saving image in AsyncStorage: ', error);
        }
      }
    });
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    if (editingName || editingAge) {
      setEditingName(false);
      setEditingAge(false);
      saveData();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{
        flex: 1,
        paddingHorizontal: dimensions.width * 0.05,
        width: dimensions.width,
      }}>
        <View style={{
          backgroundColor: '#98000A',
          alignItems: 'center',
          height: dimensions.height * 0.15,
          alignSelf: 'center',
          justifyContent: 'center',
          width: dimensions.width,
          borderBottomLeftRadius: dimensions.width * 0.112,
          borderBottomRightRadius: dimensions.width * 0.112,
        }}>
          <SafeAreaView style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text
              style={{
                textAlign: "center",
                textTransform: 'uppercase',
                fontFamily: fontOrbitronExtraBold,
                fontSize: dimensions.width * 0.05,
                color: 'white',
                marginTop: dimensions.height * 0.017,
                marginRight: dimensions.width * 0.01,
              }}
            >
              Settings
            </Text>
          </SafeAreaView>
        </View>

        <View style={styles.rowSettingsView}>
          <Text style={styles.whiteOrbitronText}>
            Your photo:
          </Text>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {!image || image === 'null' ? (
              <>
                <TouchableOpacity
                  onPress={callHandleEnToSportImagePicker}
                  style={{
                    width: dimensions.height * 0.12,
                    height: dimensions.height * 0.12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: dimensions.height * 0.015,
                    borderColor: 'white',
                    borderWidth: dimensions.width * 0.003,
                  }}>
                  <Text style={[styles.whiteOrbitronText, {
                    textAlign: 'left',
                  }]}>
                    Pick
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: dimensions.height * 0.12,
                    height: dimensions.height * 0.12,
                    borderRadius: dimensions.height * 0.015,
                    borderColor: 'white',
                    borderWidth: dimensions.width * 0.003,
                  }}
                  resizeMode="cover"
                />
              </>
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!image}
              onPress={() => {
                if (image) {
                  Alert.alert(
                    "Deleting image",
                    "Do you want to delete profile image?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      {
                        text: "Delete",
                        onPress: async () => {
                          setImage(null);
                          try {
                            await AsyncStorage.removeItem('userImage');
                          } catch (error) {
                            console.error('Error deleting image from AsyncStorage: ', error);
                          }
                        },
                        style: "destructive"
                      }
                    ]
                  );
                }
              }}
              style={{
                width: dimensions.height * 0.055,
                height: dimensions.height * 0.055,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: dimensions.width * 0.02,
                marginLeft: dimensions.width * 0.04,
              }}>
              <Image
                source={require('../assets/icons/arrowPathIcon.png')}
                style={{
                  width: dimensions.height * 0.025,
                  height: dimensions.height * 0.025,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

        </View>

        <View style={[styles.rowSettingsView, {
          marginTop: dimensions.height * 0.04,
        }]}>
          <View>
            <Text style={[styles.whiteOrbitronText, {
              textAlign: 'left',
            }]}>
              Your name:
            </Text>
            <View style={styles.profileWhiteViews}>
              {editingName ? (
                <TextInput
                  maxLength={12}
                  style={[styles.profileInfoText, { paddingHorizontal: dimensions.width * 0.03 }]}
                  value={name}
                  onChangeText={setName}
                  onBlur={() => {
                    setEditingName(false);
                    saveData();
                  }}
                  autoFocus={true}
                />
              ) : (
                <Text style={styles.profileInfoText}>
                  {name}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => setEditingName(true)}
                style={{
                  position: 'absolute',
                  right: dimensions.width * 0.03,
                }}>
                <Image
                  source={require('../assets/icons/callEnEditIcon.png')}
                  style={{
                    width: dimensions.height * 0.025,
                    height: dimensions.height * 0.025,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={[styles.whiteOrbitronText, {
              textAlign: 'left',
            }]}>
              Years:
            </Text>
            <View style={styles.profileWhiteViews}>
              {editingAge ? (
                <TextInput
                  maxLength={age === 'Age' ? 3 : 2}
                  style={[styles.profileInfoText, { paddingHorizontal: dimensions.width * 0.03 }]}
                  value={age}
                  onChangeText={setAge}
                  onBlur={() => {
                    setEditingAge(false);
                    saveData();
                  }}
                  autoFocus={true}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.profileInfoText}>
                  {age}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => setEditingAge(true)}
                style={{
                  position: 'absolute',
                  right: dimensions.width * 0.03,
                }}>
                <Image
                  source={require('../assets/icons/callEnEditIcon.png')}
                  style={{
                    width: dimensions.height * 0.025,
                    height: dimensions.height * 0.025,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{
          width: dimensions.width * 0.9,
          alignSelf: 'center',
          backgroundColor: 'white',
          height: dimensions.height * 0.005,
          marginTop: dimensions.height * 0.03,
          borderRadius: dimensions.width * 0.03,
        }}></View>

        <Text
          style={[styles.settingText, {
            textAlign: "left",
            marginTop: dimensions.height * 0.05,
          }]}
        >
          Settings
        </Text>

        <View style={[styles.rowSettingsView, {
          marginTop: dimensions.height * 0.025,
        }]}>
          <View>
            <Text style={[styles.whiteOrbitronText, {
              textAlign: 'left',
            }]}>
              Vibration:
            </Text>
            <Pressable
              onPress={() => {
                setIsVibrationOn((prev) => !prev);
              }}
              style={[styles.whiteBottomButtons, {
                width: dimensions.width * 0.27,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: dimensions.width * 0.02,
              }]}>
              {isVibrationOn && (
                <Text style={[styles.onOffText, {
                  marginLeft: dimensions.width * 0.02,
                  textAlign: 'left',
                }]}>
                  On
                </Text>
              )}


              <View style={{
                width: dimensions.height * 0.043,
                height: dimensions.height * 0.043,

              }}>
                <LinearGradient
                  style={[styles.linearGradieint, {
                    borderRadius: dimensions.width * 0.02,
                  }]}
                  colors={['#EB510A', '#D80715']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                />
              </View>

              {!isVibrationOn && (
                <Text style={[styles.onOffText, {
                  marginRight: dimensions.width * 0.02,
                  textAlign: 'left',
                }]}>
                  Off
                </Text>
              )}
            </Pressable>
          </View>

          <View>
            <Text style={[styles.whiteOrbitronText, {
              textAlign: 'left',
            }]}>
              Data
            </Text>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Delete all data",
                  "This action will delete all your data. Are you sure?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    {
                      text: "Delete",
                      onPress: () => callEnClearAllSportAsyncStorage(),
                      style: "destructive"
                    }
                  ]
                );
              }}
              style={[styles.whiteBottomButtons, {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: dimensions.width * 0.001,
                  height: dimensions.height * 0.01
                },
                shadowOpacity: 0.25,
                elevation: 5,
                shadowRadius: dimensions.width * 0.03,
              }]}>
              <Text style={styles.orbitronOrangeText}>
                Delete all data
              </Text>

              <Image
                source={require('../assets/images/deleteCallEnImage.png')}
                style={{
                  width: dimensions.width * 0.05,
                  height: dimensions.width * 0.05,
                  marginLeft: dimensions.width * 0.02,
                }}
                resizeMode='contain'
              />

            </TouchableOpacity>
          </View>
        </View>
      </View >
    </TouchableWithoutFeedback>
  );
};

const createCallEnSettingsStyles = (dimensions) => StyleSheet.create({
  onOffText: {
    color: '#818181',
    textTransform: 'uppercase',
    fontSize: dimensions.width * 0.037,
    fontFamily: fontOrbitronMedium,
    fontWeight: 600,
  },
  settingText: {
    fontFamily: fontOrbitronExtraBold,
    fontSize: dimensions.width * 0.05,
    color: 'white',
    marginTop: dimensions.height * 0.015,
    marginRight: dimensions.width * 0.01,
  },
  linearGradieint: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: dimensions.width * 0.001,
      height: dimensions.height * 0.01
    },
    shadowOpacity: 0.3,
    elevation: 5,
    shadowRadius: dimensions.width * 0.03,
    borderRadius: dimensions.width * 0.02,
  },
  whiteOrbitronText: {
    textAlign: "center",
    fontFamily: fontOrbitronRegular,
    fontSize: dimensions.width * 0.037,
    fontWeight: 600,
    color: 'white',
  },
  orbitronOrangeText: {
    textAlign: "center",
    fontFamily: fontOrbitronMedium,
    fontSize: dimensions.width * 0.035,
    paddingVertical: dimensions.height * 0.015,
    color: '#EB510A',
  },
  rowSettingsView: {
    width: dimensions.width * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: dimensions.height * 0.02,
  },
  profileWhiteViews: {
    width: dimensions.width * 0.43,
    height: dimensions.height * 0.065,
    backgroundColor: 'white',
    borderRadius: dimensions.width * 0.025,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: dimensions.height * 0.01,
  },
  whiteBottomButtons: {
    width: dimensions.width * 0.43,
    height: dimensions.height * 0.06,
    backgroundColor: 'white',
    borderRadius: dimensions.width * 0.025,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: dimensions.height * 0.01,
  },
  profileInfoText: {
    fontFamily: fontInterRegular,
    fontWeight: 600,
    fontSize: dimensions.width * 0.037,
    color: '#818181',
    paddingHorizontal: dimensions.width * 0.03,
  }
});

export default CallEnSettingsScreen;
