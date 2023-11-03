import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Dimensions, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme';
import Back from '../components/button/Back';
import ShareBubble from '../assets/sharebubble/sharebubble';

const screenWidth = Dimensions.get("window").width;

const RecipeInfo = ({ navigation }) => {
    const [showShareBubble, setShowShareBubble] = useState(true);
    const fadeAnim = new Animated.Value(1);

    useEffect(() => {
        if (showShareBubble) {
            const timer = setTimeout(() => {
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }
                ).start(() => {
                    setShowShareBubble(false);
                });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showShareBubble]);

    return (
        <View>
            <View>
                <Image style={styles.img} source={require('../assets/recipes/hotpot.jpg')} />
            </View>
            <ScrollView>
                <View style={styles.back}>
                    <Back navigation={navigation} color="black" />
                </View>

                <View style={styles.recipe}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        {showShareBubble && <ShareBubble style={styles.shareBubble} />}
                    </Animated.View>
                    <View style={styles.icons}>
                        <FontAwesome5 name={'share-alt'} size={25} color={colors.asparagus} solid />
                        <FontAwesome5 name={'heart'} size={25} color={colors.asparagus} />
                    </View>
                    <Text style={styles.name}>Hot Pot</Text>
                    <Text style={styles.cuisine}>ASIAN</Text>
                    <View style={styles.infoWrapper}>
                        <View style={styles.info}>
                            <FontAwesome5 name={'clock'} size={15} color={colors.offWhite} />
                            <Text style={styles.infoText}>40 mins</Text>
                        </View>
                        <View style={styles.info}>
                            <FontAwesome5 name={'list'} size={15} color={colors.offWhite} />
                            <Text style={styles.infoText}>6 ingredients</Text>
                        </View>
                        <View style={styles.info}>
                            <FontAwesome5 name={'fire'} size={15} color={colors.offWhite} />
                            <Text style={styles.infoText}>560 cal</Text>
                        </View>
                    </View>
                    <Text style={styles.heading}>Description</Text>
                    <Text style={styles.description}>
                        A thorough how-to guide to Chinese hot pot covering all aspects of
                        preparing this iconic meal at home. It will help you to throw a
                        stress-free hot pot party.
                    </Text>
                    <Text style={styles.heading}>Ingredients</Text>
                    <Text style={styles.ingredient}>Spicy Hot Pot Base</Text>
                    <Text style={styles.ingredient}>Fresh Wheat Noodles</Text>
                    <Text style={styles.ingredient}>Lotus Root</Text>
                    <Text style={styles.ingredient}>Nappa Cabbage</Text>
                    <Text style={styles.ingredient}>Tofu</Text>
                    <Text style={styles.ingredient}>King Oyster Mushrooms</Text>
                    <Text style={styles.heading}>Instructions</Text>
                    <View style={styles.steps}>
                        <Text style={styles.step}>
                            1.Place the heat source and the pot/wok in the middle of the table.
                            Pour in the broth. Place various food items around the pot.
                        </Text>
                        <Text style={styles.step}>
                            2. Have the dipping sauces mixed and distributed in individual bowls.
                            Keep some extra in case you need an adjustment or top-up during the meal.
                        </Text>
                        <Text style={styles.step}>
                            3. Turn on the heat. Once the broth comes to a boil, you may start putting
                            food items into the broth to cook. Fish out the cooked items and enjoy with the dipping sauce.
                        </Text>
                        <Text style={styles.step}>
                            4. The water in the broth evaporates as you eat. Top up with hot water when needed.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    img: {
        position: 'absolute',
        width: 420,
    },
    back: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        marginLeft: 20,
        marginTop: 40
    },
    recipe: {
        position: 'relative',
        top: 200,
        backgroundColor: 'white',
        width: { screenWidth },
        height: 1200,
        border: 'solid',
        borderTopRightRadius: 250,
        paddingTop: 30,
        paddingLeft: 20,
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    shareBubble: {
        position: 'absolute',
        left: -5,
        bottom: 5,
        zIndex: 1,
    },
    name: {
        fontFamily: 'Manrope-Bold',
        fontSize: 30,
        paddingTop: 20,
        paddingBottom: 10,
    },
    cuisine: {
        fontFamily: 'Manrope-Bold',
        backgroundColor: colors.offBlack,
        color: colors.offWhite,
        width: 65,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 5,
    },
    infoWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 15,
        paddingTop: 10,
    },
    info: {
        backgroundColor: colors.asparagus,
        width: 130,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 5,
        marginTop: 10,
    },
    infoText: {
        fontFamily: 'Manrope-Regular',
        color: colors.offWhite,
    },
    heading: {
        fontFamily: 'Manrope-Bold',
        fontSize: 22,
        paddingTop: 20,
        paddingBottom: 10,
    },
    description: {
        fontFamily: 'Manrope-Regular',
        width: 300,
    },
    ingredient: {
        fontFamily: 'Manrope-Regular',
    },
    steps: {
        width: 330,
        rowGap: 15,
        paddingLeft: 15,
    },
    step: {
        fontFamily: 'Manrope-Regular',
    }
});

export default RecipeInfo;