import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Header from '../components/header/Header';
import ScanFlyerAd from '../components/header/ScanFlyerAd';
import { local } from '../data/local';
import { popular } from '../data/popular';
import ToggleMode from '../components/button/ToggleMode';
import { useTheme } from '../ThemeContext'
import { colors } from '../theme';
import LocalRecipe from '../components/recipe/LocalRecipe';

export default function Home({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();

    const [activeTab, setActiveTab] = useState('tab1');
    const slideValue = useRef(new Animated.Value(0)).current;
    const backgroundSlideValue = useRef(new Animated.Value(0)).current;

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        Animated.parallel([
            Animated.spring(slideValue, {
                toValue: tab === 'tab1' ? 0 : tab === 'tab2' ? 1 : 2,
                useNativeDriver: false,
                friction: 4,
            }),
            Animated.spring(backgroundSlideValue, {
                toValue: tab === 'tab1' ? 0 : tab === 'tab2' ? 1 : 2,
                useNativeDriver: false,
                friction: 8,
            }),
        ]).start();
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Header navigation={navigation} />
            <TouchableOpacity onPress={() => navigation.navigate('TutorialFirst')} style={styles.scanFlyerAdContainer}>
                <ScanFlyerAd />
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '10%' }}>
                <View style={[styles.tabList, isDarkMode && styles.darkTabList]}>
                    <Animated.View style={[
                        styles.tabBackground,
                        {
                            transform: [
                                {
                                    translateX: backgroundSlideValue.interpolate({
                                        inputRange: [0, 1, 2],
                                        outputRange: [0, 91, 232],
                                    }),
                                },
                            ],
                        },
                    ]} />
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            activeTab === 'tab1' && styles.activeTab,
                        ]}
                        onPress={() => handleTabPress('tab1')}
                        activeOpacity={0.1}
                    >
                        <Text style={[
                            styles.tabTitle, isDarkMode && styles.darkTabTitle,
                            activeTab === 'tab1' && styles.activeTabText,
                            activeTab === 'tab1' && styles.boldText,
                        ]}>Local</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            activeTab === 'tab2' && styles.activeTab,
                        ]}
                        onPress={() => handleTabPress('tab2')}
                        activeOpacity={0.1}
                    >
                        <Text style={[
                            styles.tabTitle, isDarkMode && styles.darkTabTitle,
                            activeTab === 'tab2' && styles.activeTabText,
                            activeTab === 'tab2' && styles.boldText,
                        ]}>Popular</Text>
                    </TouchableOpacity>
                </View>
                <ToggleMode />
            </View>
            <View style={styles.tabPanels}>
                {
                    activeTab === 'tab1' &&
                    <ScrollView contentContainerStyle={[styles.contentContainer]}>
                        {local.map((item) => (
                            <TouchableOpacity onPress={() => navigation.navigate('RecipeHistory')} key={item.id}>
                                <LocalRecipe
                                    style={styles.latest}
                                    img={item.img}
                                    name={item.name}
                                    ingredients={item.ingredients}
                                    price={item.price}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                }
                {
                    activeTab === 'tab2' &&
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {popular.map((item) => (
                            <TouchableOpacity onPress={() => navigation.navigate('RecipeHistory')} key={item.id}>
                                <LocalRecipe
                                    style={styles.latest}
                                    img={item.img}
                                    name={item.name}
                                    ingredients={item.ingredients}
                                    price={item.price}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    darkContainer: {
        backgroundColor: colors.offBlack,
        color: colors.offWhite
    },
    darkHistory: {
        backgroundColor: colors.davysGray
    },
    scanFlyerAdContainer: {
        alignSelf: 'center',
    },
    tabList: {
        display: 'flex',
        flexDirection: 'row',
        width: 182,
        height: 35,
        backgroundColor: colors.offWhite,
        borderRadius: 15,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'flex-start',
        marginRight: '14%'
    },
    darkTabList: {
        backgroundColor: colors.davysGray,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabTitle: {
        fontSize: 12,
        paddingVertical: 5
    },
    darkTabTitle: {
        color: colors.offWhite
    },
    activeTabText: {
        color: colors.offWhite
    },
    boldText: {
        fontWeight: 'bold'
    },
    tabPanels: {
        alignItems: 'center',
        zIndex: -5
    },
    tabBackground: {
        position: 'absolute',
        width: '50%',
        backgroundColor: '#629560',
        borderRadius: 15,
        height: '100%'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: -20,
        height: '130%'
    },
    scanFlyerAdContainer: {
        width: 350,
        height: 95,
        marginVertical: '8%'
    }
});