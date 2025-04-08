import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Image,
} from 'react-native';

const fontInterRegular = 'Inter-Regular';
const fontOrbitronRegular = 'Orbitron-Regular';
const fontOrbitronExtraBold = 'Orbitron-ExtraBold';


import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeftIcon, CheckIcon } from 'react-native-heroicons/outline';

const CallEnTrainingsScreen = ({ setOwnedWorkouts, ownedWorkouts, workoutIcons, }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isTrainingOpened, setIsTrainingOpened] = useState(false);
  const [isTrainingStarted, setIsTrainingStarted] = useState(false);
  const [isTrainingFinished, setIsTrainingFinished] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const styles = createCallEnStyles(dimensions);

  const shareCallEnToSportTrainingResults = async (workoutCategory) => {
    try {
      await Share.share({
        message: `I successfuly completed workout in the Call en to Sport App! This workout is a ${workoutCategory} workout. Check it out!`,
      });
    } catch (error) {
      console.error('Error share:', error);
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timerInterval;
    if (isTrainingStarted && !isPaused) {
      if (selectedTraining && remainingTime === 0) {
        setRemainingTime(selectedTraining.executionTime * 60);
      }
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0.05) {
            clearInterval(timerInterval);
            setIsTrainingFinished(true);
            return 0;
          }
          return prevTime - 0.05;
        });
      }, 50);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isTrainingStarted, isPaused, selectedTraining]);


  useEffect(() => {
    if (selectedTraining) {
      setRemainingTime(selectedTraining.executionTime * 60);
      setIsTrainingStarted(false);
      setIsTrainingFinished(false);
      setIsPaused(false);
    }
  }, [selectedTraining]);

  const handleStartTraining = () => {
    if (selectedTraining) {
      if (remainingTime === 0) {
        setRemainingTime(selectedTraining.executionTime * 60);
      }
      setIsTrainingStarted(true);
    }
  };

  const handleDeleteTraining = async (workoutId) => {
    const newWorkouts = ownedWorkouts.filter((workout) => workout.id !== workoutId);
    setOwnedWorkouts(newWorkouts);
    try {
      await AsyncStorage.setItem('ownedWorkouts', JSON.stringify(newWorkouts));
    } catch (error) {
      console.error('Failed to update AsyncStorage:', error);
    }
    setIsTrainingOpened(false);
  }

  return (
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
          flex: 1,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: -dimensions.height * 0.015,
            width: dimensions.width * 0.87
          }}>
            {isTrainingOpened && (
              <TouchableOpacity onPress={() => {
                setIsTrainingOpened(false);
                setSelectedTraining(null);
                setIsTrainingStarted(false);
                setIsTrainingFinished(false);
              }}
                style={{
                  width: dimensions.width * 0.08,
                  height: dimensions.width * 0.08,
                }}
              >
                <ArrowLeftIcon size={dimensions.width * 0.08} color='white' />
              </TouchableOpacity>
            )}

            <Text
              style={{
                textAlign: "center",
                textTransform: 'uppercase',
                fontFamily: fontOrbitronExtraBold,
                fontSize: dimensions.width * 0.05,
                color: 'white',
                marginLeft: -dimensions.width * 0.02,
                flex: 1,
                marginRight: isTrainingOpened ? dimensions.width * 0.06 : 0,
              }}
            >
              {!isTrainingOpened ? 'Own training' : selectedTraining?.title}
            </Text>
          </View>
        </SafeAreaView>
      </View>
      {!isTrainingOpened && !isTrainingStarted ? (
        ownedWorkouts.length === 0 ? (
          <Text style={[styles.orbitronOrangeText, {
            color: 'white',
            marginTop: dimensions.height * 0.3,
          }]}>
            You dont have any workouts yet!
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingBottom: dimensions.height * 0.1 }}>
            {ownedWorkouts.map((workout, index) => (
              <View key={workout.id} style={{
                width: dimensions.width * 0.9,
                backgroundColor: 'white',
                borderRadius: dimensions.width * 0.05,
                paddingHorizontal: dimensions.width * 0.05,
                paddingVertical: dimensions.height * 0.02,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.015,
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Image
                    source={workoutIcons.find((icon) => icon.callEmWorkoutTitle === workout.workoutCategory).callEmWorkoutIcon}
                    style={{
                      width: dimensions.width * 0.1,
                      height: dimensions.width * 0.1,
                    }}
                    resizeMode="contain"
                  />

                  <Text style={styles.orbitronOrangeText}>
                    {workout.title}
                  </Text>
                </View>

                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: dimensions.height * 0.02,
                }}>
                  <View>
                    <Text style={styles.cardSilverText}>
                      Repetitions
                    </Text>

                    <Text style={styles.cardOrangeText}>
                      {workout.repeatingWorkout}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.cardSilverText}>
                      Execution time:
                    </Text>

                    <Text style={styles.cardOrangeText}>
                      {workout.executionTime} min
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.cardSilverText}>
                      Rest time:
                    </Text>

                    <Text style={styles.cardOrangeText}>
                      {workout.restTime}
                    </Text>
                  </View>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: dimensions.height * 0.03,
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsTrainingOpened(true);
                      setSelectedTraining(workout);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: dimensions.width * 0.55,
                      height: dimensions.height * 0.075,
                    }}>
                    <LinearGradient
                      style={styles.linearGradieint}
                      colors={['#EB510A', '#D80715']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    />
                    <Image
                      source={require('../assets/images/startTrainingImage.png')}
                      style={{
                        width: dimensions.width * 0.06,
                        height: dimensions.width * 0.06,
                        marginRight: dimensions.width * 0.04,
                      }}
                      resizeMode='contain'
                    />

                    <Text
                      style={styles.orbitronText}
                    >
                      Start training
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDeleteTraining(workout.id)}
                    style={{
                      marginRight: dimensions.width * 0.07,
                    }}>
                    <Image
                      source={require('../assets/images/deleteCallEnImage.png')}
                      style={{
                        width: dimensions.width * 0.08,
                        height: dimensions.width * 0.08,
                      }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

        )
      ) : (
        isTrainingOpened && !isTrainingStarted ? (
          <View style={styles.whiteCardView}>
            <Image
              source={workoutIcons.find((icon) => icon.callEmWorkoutTitle === selectedTraining.workoutCategory).callEmWorkoutIcon}
              style={{
                width: dimensions.height * 0.09,
                height: dimensions.height * 0.09,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />

            <Text style={[styles.orbitronOrangeText, { fontSize: dimensions.width * 0.08, marginTop: dimensions.height * 0.005 }]}>
              {selectedTraining.title}
            </Text>

            <View style={styles.rowView}>
              <Text style={styles.cardSilverText}>
                Repetitions
              </Text>

              <Text style={styles.cardOrangeText}>
                {selectedTraining.repeatingWorkout}
              </Text>
            </View>

            <View style={styles.rowView}>
              <Text style={styles.cardSilverText}>
                Execution time:
              </Text>

              <Text style={styles.cardOrangeText}>
                {selectedTraining.executionTime} min
              </Text>
            </View>

            <View style={styles.rowView}>
              <Text style={styles.cardSilverText}>
                Rest time:
              </Text>

              <Text style={styles.cardOrangeText}>
                {selectedTraining.restTime}
              </Text>
            </View>

            <View style={[styles.rowView, {
              marginTop: dimensions.height * 0.05,
              paddingHorizontal: dimensions.width * 0.03,
            }]}>
              <TouchableOpacity
                onPress={handleStartTraining}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: dimensions.width * 0.55,
                  height: dimensions.height * 0.075,
                }}>
                <LinearGradient
                  style={styles.linearGradieint}
                  colors={['#EB510A', '#D80715']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                />
                <Image
                  source={require('../assets/images/startTrainingImage.png')}
                  style={{
                    width: dimensions.width * 0.06,
                    height: dimensions.width * 0.06,
                    marginRight: dimensions.width * 0.04,
                  }}
                  resizeMode='contain'
                />

                <Text
                  style={styles.orbitronText}
                >
                  Start training
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDeleteTraining(selectedTraining.id)}
                style={{
                  marginRight: dimensions.width * 0.04,
                }}>
                <Image
                  source={require('../assets/images/deleteCallEnImage.png')}
                  style={{
                    width: dimensions.width * 0.08,
                    height: dimensions.width * 0.08,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : isTrainingStarted && !isTrainingFinished ? (
          <View style={[styles.whiteCardView, {
            paddingHorizontal: dimensions.width * 0.05,
            paddingVertical: dimensions.height * 0.02,
          }]}>
            <View style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
              <Image
                source={workoutIcons.find((icon) => icon.callEmWorkoutTitle === selectedTraining.workoutCategory).callEmWorkoutIcon}
                style={{
                  width: dimensions.width * 0.1,
                  height: dimensions.width * 0.1,
                }}
                resizeMode="contain"
              />

              <Text style={[styles.orbitronOrangeText, { fontSize: dimensions.width * 0.07, maxWidth: dimensions.width * 0.7, textAlign: 'left' }]}>
                {selectedTraining.title}
              </Text>
            </View>

            <Text style={[styles.orbitronOrangeText, { fontSize: dimensions.width * 0.045, textTransform: 'none', marginTop: dimensions.height * 0.02 }]}>
              Keep training
            </Text>

            <View style={{
              width: dimensions.width * 0.28,
              height: dimensions.width * 0.28,
              borderRadius: (dimensions.width * 0.28) / 2,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: dimensions.height * 0.02,
              position: 'relative',
            }}>
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: dimensions.width * 0.28,
                height: dimensions.width * 0.28,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {Array.from({ length: 60 }).map((_, i) => {
                  const tickLength = dimensions.width * 0.015; // коротші рисочки
                  const totalTicks = 60;
                  const totalTime = selectedTraining ? selectedTraining.executionTime * 60 : 0;
                  const elapsedTime = totalTime - remainingTime;
                  const progressFraction = totalTime ? elapsedTime / totalTime : 0;
                  const isActive = (i / totalTicks) < progressFraction;
                  return (
                    <View key={i} style={{
                      position: 'absolute',
                      width: 2,
                      height: tickLength,
                      backgroundColor: isActive ? '#EB510A' : '#ccc',
                      transform: [
                        { rotate: `${i * 6}deg` },
                        { translateY: - (dimensions.width * 0.28) / 2 }
                      ],
                    }} />
                  );
                })}
              </View>
              <Text style={{
                textAlign: "center",
                textTransform: 'uppercase',
                fontFamily: fontInterRegular,
                fontWeight: '700',
                fontSize: dimensions.width * 0.042,
                paddingVertical: dimensions.height * 0.015,
                color: '#EB510A',
                paddingHorizontal: dimensions.width * 0.03,
                zIndex: 1,
              }}>
                {formatTime(Math.floor(remainingTime))}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setIsPaused((prev) => !prev);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                width: dimensions.width * 0.4,
                height: dimensions.height * 0.075,
                marginTop: dimensions.height * 0.025,
              }}>
              <LinearGradient
                style={[styles.linearGradieint, {
                  alignSelf: 'center',
                }]}
                colors={['#EB510A', '#D80715']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
              <Text style={styles.orbitronText}>
                {!isPaused ? 'Pause' : 'Continue'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.whiteCardView, { height: dimensions.height * 0.4, paddingVertical: dimensions.height * 0.01 }]}>
            <Text style={[styles.orbitronOrangeText, {
              fontSize: dimensions.width * 0.1,
              textTransform: 'none',
              alignSelf: 'flex-start',
              paddingHorizontal: 0
            }]}>
              Completed!
            </Text>

            <View style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                source={workoutIcons.find((icon) => icon.callEmWorkoutTitle === selectedTraining.workoutCategory).callEmWorkoutIcon}
                style={{
                  width: dimensions.width * 0.1,
                  height: dimensions.width * 0.1,
                }}
                resizeMode="contain"
              />

              <Text style={[styles.orbitronOrangeText, { fontSize: dimensions.width * 0.07, }]}>
                {selectedTraining.title}
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                source={require('../assets/icons/orangeCheckIcon.png')}
                style={{
                  width: dimensions.width * 0.08,
                  height: dimensions.width * 0.08,
                }}
                resizeMode="contain"
              />

              <Text style={[styles.cardSilverText, { fontSize: dimensions.width * 0.045, color: '#000', marginLeft: dimensions.width * 0.03, fontWeight: 500 }]}>
                You've finished your workout!{'\n'}
                Take a break!
              </Text>
            </View>

            <View style={[styles.rowView, {
              marginTop: dimensions.height * 0.05,
              paddingHorizontal: dimensions.width * 0.03,
              justifyContent: 'center',
              marginTop: dimensions.height * 0.05,
            }]}>
              <TouchableOpacity
                onPress={() => {
                  setRemainingTime(selectedTraining.executionTime * 60);
                  setIsTrainingFinished(false);
                  setIsPaused(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: dimensions.width * 0.4,
                  height: dimensions.height * 0.075,
                  marginRight: dimensions.width * 0.04,
                }}>
                <LinearGradient
                  style={[styles.linearGradieint, {
                    alignSelf: 'center',
                  }]}
                  colors={['#EB510A', '#D80715']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                />
                <Text style={styles.orbitronText}>
                  Restart
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  shareCallEnToSportTrainingResults(selectedTraining.workoutCategory);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: dimensions.height * 0.075,
                  height: dimensions.height * 0.075,
                  marginRight: dimensions.width * 0.04,
                }}>
                <LinearGradient
                  style={[styles.linearGradieint, {
                    alignSelf: 'center',
                  }]}
                  colors={['#EB510A', '#D80715']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                />
                <Image
                  source={require('../assets/icons/callEnShareIcon.png')}
                  style={{
                    width: dimensions.width * 0.065,
                    height: dimensions.width * 0.065,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
          </View>
        )
      )
      }
    </View >
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
    borderRadius: dimensions.width * 0.02,
  },
  orbitronText: {
    textAlign: "center",
    fontFamily: fontOrbitronExtraBold,
    fontSize: dimensions.width * 0.045,
    color: 'white',
  },
  orbitronMediumSizeText: {
    textAlign: "left",
    fontFamily: fontOrbitronExtraBold,
    fontSize: dimensions.width * 0.045,
    color: 'white',
    paddingHorizontal: dimensions.width * 0.05,
    marginTop: dimensions.height * 0.05,
  },
  orbitronOrangeText: {
    textAlign: "center",
    textTransform: 'uppercase',
    fontFamily: fontOrbitronExtraBold,
    fontSize: dimensions.width * 0.05,
    paddingVertical: dimensions.height * 0.015,
    color: '#EB510A',
    paddingHorizontal: dimensions.width * 0.03,
  },
  cardSilverText: {
    textAlign: "left",
    fontFamily: fontInterRegular,
    fontWeight: 400,
    fontSize: dimensions.width * 0.037,
    color: '#818181',
  },
  cardOrangeText: {
    textAlign: "left",
    marginTop: dimensions.height * 0.005,
    fontFamily: fontInterRegular,
    fontWeight: 600,
    fontSize: dimensions.width * 0.043,
    color: '#EB510A',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: dimensions.height * 0.007,
  },
  whiteCardView: {
    width: dimensions.width * 0.9,
    height: dimensions.height * 0.5,
    backgroundColor: 'white',
    borderRadius: dimensions.width * 0.05,
    paddingHorizontal: dimensions.width * 0.05,
    paddingVertical: dimensions.height * 0.02,

    alignSelf: 'center',
    marginTop: dimensions.height * 0.1,
  }
});

export default CallEnTrainingsScreen;
