import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CallEnSettingsScreen from './CallEnSettingsScreen';
import CallEmSportsFactsScreen from './CallEmSportsFactsScreen';

import CallEnTrainingsScreen from './CallEnTrainingsScreen';

import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeftIcon, PlusCircleIcon } from 'react-native-heroicons/outline';

const fontInterRegular = 'Inter-Regular';
const fontOrbitronRegular = 'Orbitron-Regular';
const fontOrbitronExtraBold = 'Orbitron-ExtraBold';


const trainButtons = [
  {
    id: 1,
    trainImage: require('../assets/images/trainIcons/kitchenImage.png'),
  },
  {
    id: 2,
    trainImage: require('../assets/images/trainIcons/bedroomImage.png'),
  },
  {
    id: 3,
    trainImage: require('../assets/images/trainIcons/balconyImage.png'),
  },
]

const workoutIcons = [
  {
    id: 1,
    callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon1.png'),
    callEmWorkoutTitle: 'Football'
  },
  {
    id: 2,
    callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon2.png'),
    callEmWorkoutTitle: 'Yoga'
  },
  {
    id: 3,
    callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon3.png'),
    callEmWorkoutTitle: 'Hockey'
  },
  {
    id: 4,
    callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon4.png'),
    callEmWorkoutTitle: 'Cardio'
  },
  {
    id: 5,
    callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon5.png'),
    callEmWorkoutTitle: 'Basketball'
  },
  {
    id: 6,
    callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon6.png'),
    callEmWorkoutTitle: 'Physical'
  },
]

const callEnButtonsToSport = [
  {
    id: 1,
    screen: 'Home',
    youIconMont: require('../assets/icons/callEnToSportButtons/callEnHomeIcon.png'),
  },
  {
    id: 2,
    screen: 'Trainings',
    youIconMont: require('../assets/icons/callEnToSportButtons/callEnTrainingIcon.png'),
    youMontTitle: 'MORE FAMOUS PLACES',
  },
  {
    id: 3,
    screen: 'SportsFacts',
    youIconMont: require('../assets/icons/callEnToSportButtons/callEnFactsIcon.png'),
    youMontTitle: 'ABOUT APP',
  },
  {
    id: 4,
    screen: 'CallEnSettings',
    youIconMont: require('../assets/icons/callEnToSportButtons/callEnSettingsIcon.png'),
    youMontTitle: 'FAVORITE PLACES',
  },
]

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedCallEnScreenToSport, setSelectedCallEnScreenToSport] = useState('Home');

  const styles = createCallEnStyles(dimensions);
  const [isCreatingWorkoutNow, setIsCreatingWorkoutNow] = useState(false);
  const [isSelectCategoryWasVisible, setIsSelectCategoryWasVisible] = useState(false);
  const [selectedWorkoutCategory, setSelectedWorkoutCategory] = useState(null);

  const [nameWorkout, setNameWorkout] = useState('');
  const [repeatingWorkout, setRepeatingWorkout] = useState('');
  const [executionTime, setExecutionTime] = useState('');
  const [selectedRestTime, setSelectedRestTime] = useState('');
  const [ownedWorkouts, setOwnedWorkouts] = useState([]);

  const [name, setName] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');

        if (savedName !== null) {
          setName(savedName);
        }
      } catch (error) {
        console.error('Error loading name data', error);
      }
    };
    loadData();
  }, [selectedCallEnScreenToSport]);

  const saveNewWorkout = async () => {
    try {
      const exOwnedWorkouts = await AsyncStorage.getItem('ownedWorkouts');
      const ownedWorkouts = exOwnedWorkouts ? JSON.parse(exOwnedWorkouts) : [];
      const newWorkoutIdentify = ownedWorkouts.length > 0 ? Math.max(...ownedWorkouts.map(newWorkout => newWorkout.id)) + 1 : 1;

      const newWorkout = {
        id: newWorkoutIdentify,
        title: nameWorkout,
        repeatingWorkout,
        executionTime,
        restTime: selectedRestTime,
        workoutCategory: selectedWorkoutCategory,
      };

      ownedWorkouts.unshift(newWorkout);
      await AsyncStorage.setItem('ownedWorkouts', JSON.stringify(ownedWorkouts));
      setOwnedWorkouts(ownedWorkouts);

      setNameWorkout('');
      setRepeatingWorkout('');
      setExecutionTime('');
      setSelectedRestTime('');
      setSelectedWorkoutCategory(null);
      setIsSelectCategoryWasVisible(false);
      setIsCreatingWorkoutNow(false);

      setSelectedCallEnScreenToSport('Trainings');
    } catch (error) {
      console.error('Error saving newWorkout:', error);
    }
  };

  useEffect(() => {
    const loadOwnedWorkouts = async () => {
      try {
        const exOwnedWorkouts = await AsyncStorage.getItem('ownedWorkouts');
        if (exOwnedWorkouts) {
          setOwnedWorkouts(JSON.parse(exOwnedWorkouts));
        }
      } catch (error) {
        console.error('Error loading ownedWorkouts:', error);
      }
    };

    loadOwnedWorkouts();
  }, [selectedCallEnScreenToSport]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{
        backgroundColor: '#160002',
        width: '100%',
        height: dimensions.height,
        flex: 1,
      }}>
        <LinearGradient
          style={styles.linearGradieint}
          colors={['#EB510A', '#D80715']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        {selectedCallEnScreenToSport === 'Home' ? (
          <>
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
                flex: 1,
              }}>
                {selectedCallEnScreenToSport === 'Home' ? (
                  isCreatingWorkoutNow ? (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginTop: -dimensions.height * 0.015,
                      width: dimensions.width * 0.87
                    }}>
                      <TouchableOpacity onPress={() => {
                        if (isSelectCategoryWasVisible) setIsSelectCategoryWasVisible(false);
                        else setIsCreatingWorkoutNow(false);
                      }}
                        style={{
                          width: dimensions.width * 0.08,
                          height: dimensions.width * 0.08,
                        }}
                      >
                        <ArrowLeftIcon size={dimensions.width * 0.08} color='white' />
                      </TouchableOpacity>

                      <Text
                        style={{
                          textAlign: "center",
                          textTransform: 'uppercase',
                          fontFamily: fontOrbitronExtraBold,
                          fontSize: dimensions.width * 0.05,
                          color: 'white',
                          marginLeft: -dimensions.width * 0.03,
                          flex: 1
                        }}
                      >
                        Create workout
                      </Text>
                    </View>
                  ) : (
                    <Image
                      source={require('../assets/images/callEnTopImage.png')}
                      style={{
                        alignSelf: 'center',
                        height: dimensions.height * 0.08,
                        top: -dimensions.height * 0.01,
                        width: dimensions.width * 0.6,
                      }}
                      resizeMode='contain'
                    />
                  )
                ) : (
                  <>
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
                      {selectedCallEnScreenToSport === 'Trainings' ? 'MORE FAMOUS PLACES' : selectedCallEnScreenToSport === 'SportsFacts' ? 'ABOUT APP' : selectedCallEnScreenToSport === 'CallEnSettings' ? 'FAVORITE PLACES' : ''}
                    </Text>
                  </>
                )}
              </SafeAreaView>
            </View>
            <SafeAreaView style={{
              flex: 1,
              paddingHorizontal: dimensions.width * 0.05,
              width: dimensions.width,
            }}>
              {!isCreatingWorkoutNow ? (
                <>
                  <View style={{
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: dimensions.width * 0.05,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: dimensions.height * 0.015
                  }}>
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: 'uppercase',
                        fontFamily: fontOrbitronExtraBold,
                        fontSize: dimensions.width * 0.055,
                        paddingVertical: dimensions.height * 0.015,
                        color: '#EB510A',
                        paddingHorizontal: dimensions.width * 0.06,
                      }}
                    >
                      {name ? `Hey, ${name}` : 'Hello'} 👋
                    </Text>
                  </View>

                  <Text
                    style={[styles.orbitronText, {
                      marginTop: dimensions.height * 0.02,
                    }]}
                  >
                    Choose where you
                    {'\n'}train today
                  </Text>

                  <View style={{
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: dimensions.width * 0.04,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: dimensions.width * 0.09,
                    marginTop: dimensions.height * 0.015,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: dimensions.width * 0.7,
                    height: dimensions.height * 0.13,
                  }}>
                    {trainButtons.map((button, index) => (
                      <TouchableOpacity key={button.id} >
                        <Image
                          source={button.trainImage}
                          style={{
                            width: dimensions.height * 0.04,
                            height: dimensions.height * 0.04,
                          }}
                          resizeMode='contain'
                        />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text
                    style={[styles.orbitronText, {
                      marginTop: dimensions.height * 0.04,
                    }]}
                  >
                    Personal training
                  </Text>

                  <View style={{
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: dimensions.width * 0.05,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: dimensions.width * 0.015,
                    marginTop: dimensions.height * 0.015,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: dimensions.width * 0.9,
                    height: dimensions.height * 0.111,
                  }}>
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: 'uppercase',
                        fontFamily: fontOrbitronExtraBold,
                        fontSize: dimensions.width * 0.035,
                        paddingVertical: dimensions.height * 0.015,
                        color: 'black',
                      }}
                    >
                      Create your own workout
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        setIsCreatingWorkoutNow(true);
                      }}
                      style={{
                        width: dimensions.width * 0.14,
                        height: dimensions.width * 0.14,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: dimensions.width * 0.04,

                      }}
                    >
                      <LinearGradient
                        style={[styles.linearGradieint, {
                          borderRadius: dimensions.width * 0.025,
                        }]}
                        colors={['#EB510A', '#D80715']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      />
                      <PlusCircleIcon size={dimensions.width * 0.075} color='white' />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  {!isSelectCategoryWasVisible ? (
                    <>
                      <Text style={styles.orbitronMediumSizeText}>
                        Select a workout category
                      </Text>

                      <View style={{
                        width: dimensions.width * 0.9,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        alignSelf: 'center',
                        marginTop: dimensions.height * 0.025
                      }}>
                        {workoutIcons.map((workoutIcon, index) => (
                          <TouchableOpacity
                            key={workoutIcon.id}
                            onPress={() => {
                              if (selectedWorkoutCategory === workoutIcon.callEmWorkoutTitle) {
                                setSelectedWorkoutCategory(null);
                              } else setSelectedWorkoutCategory(workoutIcon.callEmWorkoutTitle);
                            }}
                            style={{
                              width: dimensions.width * 0.285,
                              backgroundColor: '#fff',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: dimensions.width * 0.05,
                              marginTop: dimensions.height * 0.012,
                              height: dimensions.width * 0.285,
                              opacity: selectedWorkoutCategory === workoutIcon.callEmWorkoutTitle || !selectedWorkoutCategory ? 1 : 0.5,
                            }}>
                            <Image
                              source={workoutIcon.callEmWorkoutIcon}
                              style={{
                                width: dimensions.width * 0.1,
                                height: dimensions.width * 0.1,
                              }}
                              resizeMode='contain'
                            />

                          </TouchableOpacity>
                        ))}
                      </View>

                      {selectedWorkoutCategory && (
                        <TouchableOpacity
                          onPress={async () => {
                            setIsSelectCategoryWasVisible(true);
                          }}
                          style={{
                            width: dimensions.width * 0.45,
                            height: dimensions.height * 0.08,
                            marginTop: dimensions.height * 0.07,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}
                        >
                          <LinearGradient
                            style={[styles.linearGradieint, {
                              borderRadius: dimensions.width * 0.03,
                              borderColor: '#fff',
                              borderWidth: dimensions.width * 0.0015,
                            }]}
                            colors={['#EB510A', '#D80715']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                          />
                          <Text
                            style={{
                              textAlign: 'center',
                              fontWeight: 700,
                              fontFamily: fontOrbitronRegular,
                              fontSize: dimensions.width * 0.05,
                              color: '#fff',
                              paddingHorizontal: dimensions.width * 0.05,
                            }}>
                            Continue
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  ) : (
                    <>
                      <Text style={styles.orbitronMediumSizeText}>
                        Name workout
                      </Text>

                      <TextInput
                        placeholder="Name workout"
                        maxLength={20}
                        value={nameWorkout}
                        onChangeText={setNameWorkout}
                        placeholderTextColor="#818181"
                        style={[styles.callEnTextInputStyles, {
                          alignSelf: 'center',
                          fontFamily: fontInterRegular,
                          fontWeight: nameWorkout.length > 0 ? 600 : 400,
                        }]}
                      />

                      <Text style={styles.orbitronMediumSizeText}>
                        Repeating the exercise:
                      </Text>

                      <TextInput
                        placeholder="Repetitions"
                        maxLength={3}
                        value={repeatingWorkout}
                        keyboardType='numeric'
                        onChangeText={setRepeatingWorkout}
                        placeholderTextColor="#818181"
                        style={[styles.callEnTextInputStyles, {
                          alignSelf: 'center',
                          fontFamily: fontInterRegular,
                          fontWeight: repeatingWorkout.length > 0 ? 600 : 400,
                        }]}
                      />

                      <Text style={styles.orbitronMediumSizeText}>
                        How many minutes does it take?
                      </Text>

                      <TextInput
                        placeholder="Execution time (minutes)"
                        maxLength={3}
                        keyboardType='numeric'
                        value={executionTime}
                        onChangeText={setExecutionTime}
                        placeholderTextColor="#818181"
                        style={[styles.callEnTextInputStyles, {
                          alignSelf: 'center',
                          fontFamily: fontInterRegular,
                          fontWeight: executionTime.length > 0 ? 600 : 400,
                        }]}
                      />

                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: dimensions.height * 0.04,
                        width: dimensions.width * 0.9,
                        alignSelf: 'center',
                      }}>
                        <Text style={{
                          textAlign: "left",
                          fontFamily: fontOrbitronExtraBold,
                          fontSize: dimensions.width * 0.045,
                          color: 'white',
                        }}>
                          Reset time:
                        </Text>

                        {['1 min', '2 min', '3 min'].map((time, index) => (
                          <TouchableOpacity
                            key={time}
                            onPress={() => {
                              if (selectedRestTime === time) {
                                setSelectedRestTime('');
                              } else setSelectedRestTime(time);
                            }}
                            style={{
                              width: dimensions.width * 0.17,
                              height: dimensions.width * 0.17,
                              backgroundColor: '#fff',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: dimensions.width * 0.03,
                              opacity: selectedRestTime === time || selectedRestTime === '' ? 1 : 0.5,
                            }}>
                            <Text style={{
                              textAlign: "center",
                              fontFamily: fontInterRegular,
                              fontWeight: 600,
                              fontSize: dimensions.width * 0.04,
                              color: selectedRestTime === time ? 'black' : '#818181',
                              textTransform: 'uppercase',
                            }}>
                              {time}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      {nameWorkout.length > 0 && repeatingWorkout.length > 0 && executionTime.length > 0 && selectedRestTime.length > 0 && (
                        <TouchableOpacity
                          onPress={() => {
                            saveNewWorkout();
                          }}
                          style={{
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            borderRadius: dimensions.width * 0.03,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: dimensions.height * 0.025,
                            width: dimensions.width * 0.4,
                            height: dimensions.height * 0.07,
                          }}>
                          <Text
                            style={{
                              textAlign: "center",
                              fontFamily: fontOrbitronExtraBold,
                              fontSize: dimensions.width * 0.05,
                              paddingVertical: dimensions.height * 0.015,
                              color: '#EB510A',
                              paddingHorizontal: dimensions.width * 0.06,
                            }}
                          >
                            Create
                          </Text>
                        </TouchableOpacity>
                      )}

                    </>
                  )}
                </>
              )}
            </SafeAreaView>
          </>
        ) : selectedCallEnScreenToSport === 'CallEnSettings' ? (
          <CallEnSettingsScreen setSelectedCallEnScreenToSport={setSelectedCallEnScreenToSport} />
        ) : selectedCallEnScreenToSport === 'SportsFacts' ? (
          <CallEmSportsFactsScreen setSelectedCallEnScreenToSport={setSelectedCallEnScreenToSport} workoutIcons={workoutIcons} />
        ) : selectedCallEnScreenToSport === 'Trainings' ? (
          <CallEnTrainingsScreen setSelectedCallEnScreenToSport={setSelectedCallEnScreenToSport} setOwnedWorkouts={setOwnedWorkouts} ownedWorkouts={ownedWorkouts} workoutIcons={workoutIcons} />
        ) : null}

        <View
          style={{
            bottom: 0,
            justifyContent: 'space-between',
            paddingHorizontal: dimensions.width * 0.12,
            flexDirection: 'row',
            position: 'absolute',
            alignItems: 'flex-start',
            paddingTop: dimensions.height * 0.025,
            zIndex: 4444,
            backgroundColor: '#98000A',
            height: dimensions.height * 0.16,
            alignSelf: 'center',
            width: dimensions.width,
            borderTopLeftRadius: dimensions.width * 0.112,
            borderTopRightRadius: dimensions.width * 0.112,
          }}
        >
          {callEnButtonsToSport.map((button, index) => (
            <TouchableOpacity
              key={button.id}
              onPress={() => setSelectedCallEnScreenToSport(button.screen)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedCallEnScreenToSport === button.screen ? '#A53319' : 'transparent',
                width: dimensions.height * 0.069,
                height: dimensions.height * 0.069,
                borderRadius: dimensions.height * 0.015,
              }}
            >
              {selectedCallEnScreenToSport === button.screen && (
                <LinearGradient
                  style={[styles.linearGradieint, {
                    borderRadius: dimensions.width * 0.025,
                  }]}
                  colors={['#EB510A', '#D80715']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                />
              )}
              <Image
                source={button.youIconMont}
                style={{
                  textAlign: 'center',

                  width: dimensions.height * 0.03,
                  height: dimensions.height * 0.03,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


const createCallEnStyles = (dimensions) => StyleSheet.create({
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
  },
  orbitronText: {
    textAlign: "center",
    textTransform: 'uppercase',
    fontFamily: fontOrbitronExtraBold,
    fontSize: dimensions.width * 0.055,
    paddingVertical: dimensions.height * 0.015,
    color: 'white',
    paddingHorizontal: dimensions.width * 0.06,
  },
  orbitronMediumSizeText: {
    textAlign: "left",
    fontFamily: fontOrbitronExtraBold,
    fontSize: dimensions.width * 0.045,
    color: 'white',
    paddingHorizontal: dimensions.width * 0.05,
    marginTop: dimensions.height * 0.05,
  },
  callEnTextInputStyles: {
    textAlign: 'left',
    paddingVertical: dimensions.width * 0.035,
    color: 'black',
    height: dimensions.height * 0.065,
    backgroundColor: 'white',
    fontSize: dimensions.width * 0.039,
    paddingHorizontal: dimensions.width * 0.05,
    borderRadius: dimensions.width * 0.02,
    fontFamily: fontInterRegular,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: dimensions.height * 0.01,
    width: dimensions.width * 0.9,
  },
});

export default HomeScreen;
