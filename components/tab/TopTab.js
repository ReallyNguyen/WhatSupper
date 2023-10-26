import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import CouponCard from '../coupon/CouponCard';
import { coupon } from '../../data/coupon';

export default function TopTab({ navigation }) {
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
                            <CouponCard
                                style={styles.latest}
                                key={item.id}
                                brand={item.brand}
                                background={item.background}
                                discount={item.discount}
                                product={item.product}
                                expiration={item.expiration}
                            />
                        ))}
                    </ScrollView>
                }
                {
                    activeTab === 'tab2' &&
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {coupon.map((item) => (
                            <CouponCard
                                style={styles.latest}
                                key={item.id}
                                brand={item.brand}
                                background={item.background}
                                discount={item.discount}
                                product={item.product}
                                expiration={item.expiration}
                            />
                        ))}
                    </ScrollView>
                }
                {
                    activeTab === 'tab3' &&
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {coupon.map((item) => (
                            <CouponCard
                                style={styles.latest}
                                key={item.id}
                                brand={item.brand}
                                background={item.background}
                                discount={item.discount}
                                product={item.product}
                                expiration={item.expiration}
                            />
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
    }
});