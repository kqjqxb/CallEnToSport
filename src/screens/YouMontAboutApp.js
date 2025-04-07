import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    SafeAreaView,
} from 'react-native';

const fontInterRegular = 'Inter-Regular';

const YouMontAboutApp = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    return (
        <SafeAreaView style={{ width: dimensions.width }}>
            <Image
                source={require(`../assets/images/youOnbImage.png`)}
                style={{
                    marginTop: dimensions.height * 0.02,
                    alignSelf: 'center',
                    height: dimensions.height * 0.2,
                    width: dimensions.width * 0.55,
                    marginRight: dimensions.width * 0.04,
                }}
                resizeMode="contain"
            />

            <View style={{
                paddingHorizontal: dimensions.width * 0.03,
                marginTop: dimensions.height * 0.03,
                alignSelf: 'center',
                backgroundColor: '#2D1304',
                borderRadius: dimensions.width * 0.04,
                width: dimensions.width * 0.92,
                paddingVertical: dimensions.height * 0.02,
            }}>
                <Text
                    style={{
                        fontSize: dimensions.width * 0.04,
                        textAlign: "left",
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: fontInterRegular,
                    }}
                >
                    You Montreal Way is your personal guide to Montreal, created for those looking for more than just tourist routes.{'\n'}

                    {'\n'}We have collected the most interesting places in the city: from cultural locations and eco-shops to cafes and restaurants.{'\n'}

                    {'\n'}💡 Random selection for inspiration
                    🗺️ Interactive map
                    🏙️ Interesting facts about the city - all in one app{'\n'}

                    {'\n'}Let Montreal open up to you
                    in a new way - your way.
                    Created with love for the city and
                    respect for the planet 💚
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default YouMontAboutApp;
