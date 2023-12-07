import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme';
import Back from '../components/button/Back';
const screenWidth = Dimensions.get("window").width;
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../ThemeContext'

export default function RecipeHistory({ navigation }) {
    const [activeTab, setActiveTab] = useState('Recipe');
    const [isFavourite, setFavourite] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    const handleFavouritePress = () => {
        setFavourite(!isFavourite);
    };

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    return (
        <View>
            <View>
                <Image style={styles.img} source={require('../assets/recipes/hotpot.jpg')} />
            </View>
            <ScrollView>
                <View style={styles.back}>
                    <Back navigation={navigation} color="black" />
                </View>
                <View style={styles.container}>
                    <View style={styles.tabContainer}>
                        <Pressable
                            onPress={() => handleTabPress('Recipe')}
                            style={[
                                styles.tabs,
                                activeTab === 'Recipe' ? (isDarkMode ? styles.darkActiveTab : styles.activeTab) : styles.inactiveTab,
                            ]}
                        >
                            <Text style={activeTab === 'Recipe' ? styles.activeTabText : styles.tabText}>
                                Recipe
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => handleTabPress('Flier')}
                            style={[
                                styles.tabs,
                                activeTab === 'Flier' ? (isDarkMode ? styles.darkActiveTab : styles.activeTab) : styles.inactiveTab,
                            ]}
                        >
                            <Text style={activeTab === 'Flier' ? styles.activeTabText : styles.tabText}>
                                Flier
                            </Text>
                        </Pressable>
                    </View>

                    {
                        activeTab === 'Recipe' &&
                        <View style={styles.recipe}>

                            <View style={styles.icons}>
                                <FontAwesome5 name={'share-alt'} size={25} color={colors.asparagus} solid />
                                <TouchableOpacity onPress={handleFavouritePress}>
                                    <View>
                                        <FontAwesomeIcon
                                            name={isFavourite ? 'heart' : 'heart-o'}
                                            style={{
                                                fontSize: 27,
                                                color: colors.asparagus,
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
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
                    }
                    {
                        activeTab === 'Flier' &&
                        <View style={styles.flier}>
                            <Image style={styles.flierImg} source={require('../assets/flier.png')} />
                            <Text style={styles.itemScannedText}>Items Scanned:</Text>
                            <Text style={styles.scannedIngredients}>100 g Spicy Hot Pot Base</Text>
                            <Text style={styles.scannedIngredients}>20 g Ramen Noodles</Text>
                            <Text style={styles.scannedIngredients}>1/4 cup Lettuce</Text>
                            <Text style={styles.scannedIngredients}>20 g Spicy Hot Pot Base</Text>
                            <Text style={styles.scannedIngredients}>40 g Beef</Text>
                            <Text style={styles.scannedIngredients}>10 g Tofu</Text>
                        </View>
                    }
                </View>

            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    tabs: {
        height: 65,
        top: 250,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth / 2,
    },
    darkTabs: {
        backgroundColor: colors.offBlack
    },
    tabText: {
        textAlign: 'center',
        fontFamily: 'Manrope-Bold',
        color: colors.offWhite,
    },
    activeTab: {
        backgroundColor: colors.offWhite,
    },
    darkActiveTab: {
        backgroundColor: colors.offBlack,
    },
    activeTabText: {
        color: colors.asparagus,
    },
    tabContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    inactiveTab: {
        backgroundColor: colors.asparagus
    },
    img: {
        position: 'absolute',
        width: 420,
    },
    flierImg: {
        marginVertical: 40
    },
    itemScannedText: {
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
    },
    scannedIngredients: {
        fontSize: 14,
        fontFamily: 'Manrope-Regular',
        marginVertical: 12
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
        top: 250,
        backgroundColor: colors.offWhite,
        width: { screenWidth },
        height: 1200,
        border: 'solid',
        paddingLeft: 20,
    },
    flier: {
        position: 'relative',
        top: 250,
        backgroundColor: colors.offWhite,
        width: { screenWidth },
        height: 1200,
        border: 'solid',
        paddingLeft: 20,
    },
    icons: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 10
    },
    name: {
        fontFamily: 'Manrope-Bold',
        fontSize: 25,
        paddingTop: 20,
        paddingBottom: 10,
        width: "65%"
    },
    cuisine: {
        fontFamily: 'Manrope-Bold',
        backgroundColor: colors.offBlack,
        color: colors.offWhite,
        width: 85,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 8,
        elevation: 1,
        textAlign: 'center'
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