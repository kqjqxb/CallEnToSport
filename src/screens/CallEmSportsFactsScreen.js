import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Share,
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';

import badmintonFacts from '../components/badmintonFacts';
import footballFacts from '../components/footballFacts';
import hockeyFacts from '../components/hockeyFacts';
import powerliftingFacts from '../components/powerliftingFacts';
import yogaFacts from '../components/yogaFacts';
import basketballFacts from '../components/basketballFacts';

const sportCategories = [
    {
        id: 1,
        callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon1.png'),
        callEmWorkoutTitle: 'Football'
    },
    {
        id: 6,
        callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon6.png'),
        callEmWorkoutTitle: 'Basketball'
    },

    {
        id: 3,
        callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon3.png'),
        callEmWorkoutTitle: 'Hockey'
    },
    {
        id: 2,
        callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon2.png'),
        callEmWorkoutTitle: 'Yoga'
    },
    {
        id: 4,
        callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon5-2.png'),
        callEmWorkoutTitle: 'Powerlifting'
    },
    {
        id: 5,
        callEmWorkoutIcon: require('../assets/icons/workoutIcons/workoutIcon6-2.png'),
        callEmWorkoutTitle: 'Badminton'
    },

]

const fontInterRegular = 'Inter-Regular';
const fontOrbitronRegular = 'Orbitron-Regular';
const fontOrbitronExtraBold = 'Orbitron-ExtraBold';

const CallEmSportsFactsScreen = ({ }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const styles = createCallEnSportsFactsStyles(dimensions);
    const [selectedSportCategory, setSelectedSportCategory] = useState(null);
    const [isSportFactVisible, setIsSportFactVisible] = useState(false);
    const [generatedSportFact, setGeneratedSportFact] = useState(null);
    const [prevGeneratedSportFact, setPrevGeneratedSportFact] = useState(null);

    const handleGenerateSportFact = () => {
        let facts = [];
        switch (selectedSportCategory) {
            case 'Football':
                facts = footballFacts;
                break;
            case 'Basketball':
                facts = basketballFacts;
                break;
            case 'Hockey':
                facts = hockeyFacts;
                break;
            case 'Yoga':
                facts = yogaFacts;
                break;
            case 'Powerlifting':
                facts = powerliftingFacts;
                break;
            case 'Badminton':
                facts = badmintonFacts;
                break;
            default:
                break;
        }
        if (facts.length === 0) return;

        let randomIndex = Math.floor(Math.random() * facts.length);
        let randomFact = facts[randomIndex];
        let attempts = 0;
        while (
            attempts < 10 &&
            prevGeneratedSportFact &&
            randomFact.id === prevGeneratedSportFact.id &&
            facts.length > 1
        ) {
            randomIndex = Math.floor(Math.random() * facts.length);
            randomFact = facts[randomIndex];
            attempts++;
        }
        setGeneratedSportFact(randomFact.fact);
        setPrevGeneratedSportFact(randomFact);
    };

    const shareSportFact = async (fact) => {
        try {
            await Share.share({
                message: `I hear some fact: ${fact.length > 25 ? fact.substring(0, 25) + "..." : fact}!`,
            });
        } catch (error) {
            console.error('Error share:', error);
        }
    };

    return (
        <View style={{ width: dimensions.width }}>
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

                    <Text
                        style={{
                            textAlign: "center",
                            textTransform: 'uppercase',
                            fontFamily: fontOrbitronExtraBold,
                            fontSize: dimensions.width * 0.05,
                            color: 'white',
                            flex: 1,
                        }}
                    >
                        interesting facts {'\n'}
                        about sports
                    </Text>
                </SafeAreaView>
            </View>

            {!isSportFactVisible ? (
                <>
                    <Text
                        style={[styles.orbitronText, {
                            marginTop: dimensions.height * 0.02,
                            textTransform: 'uppercase',
                            marginTop: dimensions.height * 0.05,
                        }]}
                    >
                        Choose a category
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
                        {sportCategories.map((workoutIcon, index) => (
                            <TouchableOpacity
                                key={workoutIcon.id}
                                onPress={() => {
                                    if (selectedSportCategory === workoutIcon.callEmWorkoutTitle) {
                                        setSelectedSportCategory(null);
                                    } else setSelectedSportCategory(workoutIcon.callEmWorkoutTitle);
                                }}
                                style={{
                                    width: dimensions.width * 0.285,
                                    backgroundColor: '#fff',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: dimensions.width * 0.05,
                                    marginTop: dimensions.height * 0.012,
                                    height: dimensions.width * 0.285,
                                    opacity: selectedSportCategory === workoutIcon.callEmWorkoutTitle || !selectedSportCategory ? 1 : 0.5,
                                }}>
                                <Image
                                    source={workoutIcon.callEmWorkoutIcon}
                                    style={{
                                        width: dimensions.width * 0.09,
                                        height: dimensions.width * 0.09,
                                    }}
                                    resizeMode='contain'
                                />

                                <Text style={[styles.orbitronText, {
                                    marginTop: dimensions.height * 0.01,
                                    fontSize: dimensions.width * 0.027,
                                    textTransform: 'uppercase',
                                    marginTop: dimensions.height * 0.015,
                                    color: '#000'
                                }]}>
                                    {workoutIcon.callEmWorkoutTitle}
                                </Text>

                            </TouchableOpacity>
                        ))}
                    </View>

                    {selectedSportCategory && (
                        <TouchableOpacity
                            onPress={async () => {
                                setIsSportFactVisible(true);
                                handleGenerateSportFact();
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
                    <View style={{
                        width: dimensions.width * 0.9,
                        alignSelf: 'flex-start',
                        marginTop: dimensions.height * 0.05,
                        marginLeft: dimensions.width * 0.05,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity onPress={() => {
                            setIsSportFactVisible(false);
                            setSelectedSportCategory(null);
                        }}>
                            <ArrowLeftIcon size={dimensions.width * 0.08} color='white' />
                        </TouchableOpacity>
                        <Text
                            style={[styles.orbitronText, {
                                marginTop: dimensions.height * 0.02,
                                textTransform: 'uppercase',
                                marginTop: 0,
                                marginLeft: dimensions.width * 0.03,
                            }]}
                        >
                            category:
                        </Text>
                    </View>

                    <View style={[styles.whiteSportCardView, {
                        height: dimensions.height * 0.1,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }]}>
                        <Image
                            source={sportCategories.find((icon) => icon.callEmWorkoutTitle === selectedSportCategory).callEmWorkoutIcon}
                            style={{
                                width: dimensions.width * 0.1,
                                height: dimensions.width * 0.1,
                            }}
                            resizeMode="contain"
                        />

                        <Text style={[styles.orbitronText, {
                            marginTop: dimensions.height * 0.02,
                            textTransform: 'uppercase',
                            marginTop: 0,
                            marginLeft: dimensions.width * 0.03,
                            color: '#000'
                        }]}>
                            {selectedSportCategory}
                        </Text>
                    </View>

                    <View style={[styles.whiteSportCardView, {
                        height: dimensions.height * 0.35,
                        paddingVertical: dimensions.height * 0.02,
                    }]}>
                        <Text style={[styles.factBlackText, {
                            paddingHorizontal: dimensions.width * 0.05,
                        }]}>
                            {generatedSportFact}
                        </Text>

                        <View style={[styles.factButtonsRowView, {
                            justifyContent: 'center',
                            marginTop: dimensions.height * 0.05,
                            paddingHorizontal: dimensions.width * 0.03,
                            marginTop: dimensions.height * 0.05,
                        }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsSportFactVisible(false);
                                    setSelectedSportCategory(null);
                                }}
                                style={{
                                    marginRight: dimensions.width * 0.05,
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    width: dimensions.width * 0.45,
                                    height: dimensions.height * 0.075,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                <LinearGradient
                                    style={[styles.linearGradieint, {
                                        alignSelf: 'center',
                                    }]}
                                    colors={['#EB510A', '#D80715']}
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                />
                                <Text style={[styles.orbitronText, {
                                    fontSize: dimensions.width * 0.05,
                                }]}>
                                    WOW, NEXT
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    shareSportFact(generatedSportFact);
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


                </>
            )}


        </View>
    );
};

const createCallEnSportsFactsStyles = (dimensions) => StyleSheet.create({
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
    orbitronOrangeText: {
        textAlign: "center",
        textTransform: 'uppercase',
        fontFamily: fontOrbitronExtraBold,
        fontSize: dimensions.width * 0.05,
        paddingVertical: dimensions.height * 0.015,
        color: '#EB510A',
        paddingHorizontal: dimensions.width * 0.03,
    },
    whiteSportCardView: {
        width: dimensions.width * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: dimensions.width * 0.05,
        marginTop: dimensions.height * 0.02,
    },
    factBlackText: {
        textAlign: "left",
        fontFamily: fontInterRegular,
        fontWeight: 400,
        fontSize: dimensions.width * 0.034,
        color: '#000000',
    },
    factButtonsRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: dimensions.height * 0.007,
    },
});

export default CallEmSportsFactsScreen;
