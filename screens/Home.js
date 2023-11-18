import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Header from '../components/header/Header';
import ScanFlyerAd from '../components/header/ScanFlyerAd';
import CouponCard from '../components/coupon/CouponCard';
import { coupon } from '../data/coupon';
import ToggleMode from '../components/button/ToggleMode';
import { useTheme } from '../ThemeContext'
import { colors } from '../theme';

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
            <Header />
            <TouchableOpacity onPress={() => navigation.navigate('TutorialFirst')} style={styles.scanFlyerAdContainer}>
                <ScanFlyerAd />
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '10%' }}>
                <View style={styles.tabList}>
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
                            styles.tabTitle,
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
                            styles.tabTitle,
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
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {coupon.map((item) => (
                            <TouchableOpacity onPress={() => navigation.navigate('CouponInfo')} key={item.id}>
                                <CouponCard
                                    style={styles.latest}
                                    brand={item.brand}
                                    background={item.background}
                                    discount={item.discount}
                                    product={item.product}
                                    expiration={item.expiration}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                }
                {
                    activeTab === 'tab2' &&
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {coupon.map((item) => (
                            <TouchableOpacity onPress={() => navigation.navigate('CouponInfo')} key={item.id}>
                                <CouponCard
                                    style={styles.latest}
                                    brand={item.brand}
                                    background={item.background}
                                    discount={item.discount}
                                    product={item.product}
                                    expiration={item.expiration}
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
    scanFlyerAdContainer: {
        alignSelf: 'center',
    },
    tabList: {
        display: 'flex',
        flexDirection: 'row',
        width: 182,
        height: 35,
        backgroundColor: '#F1EFEF',
        borderRadius: 15,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'flex-start',
        marginRight: '14%'
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
    activeTabText: {
        color: '#F1EFEF'
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
        paddingBottom: 50,
        height: "200%"
    },
    scanFlyerAdContainer: {
        width: 350,
        height: 95,
        marginVertical: '8%'
    }
});