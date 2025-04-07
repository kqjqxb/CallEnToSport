import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    Share,
    Linking,
} from 'react-native';

const fontInterRegular = 'Inter-Regular';

const PlaceCardComponent = ({ props, savedMontPlacesReal, setSavedMontPlacesReal }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    const loadSavedMontPlacesReal = async () => {
        try {
            const storedSavedMontPlacesReal = await AsyncStorage.getItem('savedMontPlacesReal');
            const parsedSavedMontPlacesReal = storedSavedMontPlacesReal ? JSON.parse(storedSavedMontPlacesReal) : [];
            setSavedMontPlacesReal(parsedSavedMontPlacesReal);
        } catch (error) {
            console.error('Error loading savedMontPlacesReal:', error);
        }
    };

    useEffect(() => {
        loadSavedMontPlacesReal();
    }, []);

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

    const isMontRealPlaceSaved = (montPlace) => {
        return savedMontPlacesReal.some((nPlace) => nPlace.id === montPlace?.id);
    };


    return (
        <SafeAreaView style={{
            flex: 1,
            paddingHorizontal: dimensions.width * 0.05,
            width: dimensions.width,
        }}>
            <View key={props.id} style={{
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: dimensions.width * 0.03,
                flexDirection: 'row',
                backgroundColor: '#2D1304',
                borderRadius: dimensions.width * 0.055,
                paddingVertical: dimensions.height * 0.02,
            }}>
                <Image
                    source={props?.image}
                    style={{
                        width: dimensions.width * 0.35,
                        height: dimensions.width * 0.35,
                        borderRadius: dimensions.width * 0.03,
                    }}
                    resizeMode='cover'
                />

                <View style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    height: dimensions.width * 0.35,
                    marginLeft: dimensions.width * 0.03,
                }}>
                    <View>
                        <Text
                            style={{
                                fontSize: dimensions.width * 0.045,
                                textAlign: "left",
                                fontWeight: 700,
                                color: 'white',
                                alignSelf: 'flex-start',
                                fontFamily: fontInterRegular,
                            }}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {props?.title}
                        </Text>

                        <Text
                            style={{
                                fontSize: dimensions.width * 0.03,
                                textAlign: "left",
                                fontWeight: 400,
                                color: 'white',
                                fontFamily: fontInterRegular,
                                marginTop: dimensions.height * 0.01,
                            }}
                            numberOfLines={3}
                            ellipsizeMode='tail'
                        >
                            {props?.description}
                        </Text>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: dimensions.height * 0.01,
                        width: dimensions.width * 0.45,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(props?.montRealMapLink);
                            }}
                            style={{
                                width: dimensions.width * 0.18,
                                height: dimensions.height * 0.05,
                                backgroundColor: '#A53319',
                                borderRadius: dimensions.width * 0.02,
                                alignSelf: 'center',
                                justifyContent: 'center',
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
                                saveMontPlaceReal(props);
                            }}
                            style={{
                                width: dimensions.width * 0.115,
                                height: dimensions.height * 0.05,
                                backgroundColor: isMontRealPlaceSaved(props) ? '#A53319' : 'transparent',
                                borderRadius: dimensions.width * 0.02,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: '#A53319',
                                borderWidth: isMontRealPlaceSaved(props) ? 0 : dimensions.width * 0.004,
                            }}>
                            <Image
                                source={isMontRealPlaceSaved(props)
                                    ? require('../assets/icons/fullHeartMontIcon.png')
                                    : require('../assets/icons/emptyHeartYouMontIcon.png')
                                }
                                style={{
                                    width: dimensions.width * 0.05,
                                    height: dimensions.width * 0.05,
                                }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                shareMontRealPlace(props.title);
                            }}
                            style={{
                                width: dimensions.width * 0.115,
                                height: dimensions.height * 0.05,
                                backgroundColor: 'transparent',
                                borderColor: '#A53319',
                                borderWidth: dimensions.width * 0.004,
                                borderRadius: dimensions.width * 0.02,
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
            </View>
        </SafeAreaView >
    );
};

export default PlaceCardComponent;
