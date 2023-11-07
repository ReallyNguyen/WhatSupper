import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Header from '../components/header/Header';
import ScanFlyerAd from '../components/header/ScanFlyerAd';
import CouponCard from '../components/coupon/CouponCard';
import { coupon } from '../data/coupon';

export default function Home({ navigation }) {
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
        <View style={styles.container}>
            <Header />
            <TouchableOpacity onPress={() => navigation.navigate('TutorialFirst')} style={styles.scanFlyerAdContainer}>
                <ScanFlyerAd />
            </TouchableOpacity>
            <View style={styles.tabList}>
                <Animated.View style={[
                    styles.tabBackground,
                    {
                        transform: [
                            {
                                translateX: backgroundSlideValue.interpolate({
                                    inputRange: [0, 1, 2],
                                    outputRange: [0, 116, 232],
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
                    ]}>Latest</Text>
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
                    ]}>Trending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'tab3' && styles.activeTab,
                    ]}
                    onPress={() => handleTabPress('tab3')}
                    activeOpacity={0.1}
                >
                    <Text style={[
                        styles.tabTitle,
                        activeTab === 'tab3' && styles.activeTabText,
                        activeTab === 'tab3' && styles.boldText,
                    ]}>Popular</Text>
                </TouchableOpacity>
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
                {
                    activeTab === 'tab3' &&
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
        marginTop: 50
    },
    tabList: {
        flexDirection: 'row',
        width: 350,
        height: 30,
        backgroundColor: '#F1EFEF',
        borderRadius: 15,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative'
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
        alignItems: 'center'
    },
    tabBackground: {
        position: 'absolute',
        width: '33.33%',
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
    },
    scanFlyerAdContainer: {
        width: 350,
        height: 95,
        marginVertical: '8%'
    }
});
