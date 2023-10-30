import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import CouponCard from '../components/coupon/CouponCard';
import { coupon } from '../data/coupon';

export default function Saved() {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    return(
        <View style={styles.container}>
            <Image style={styles.img} source={require('../assets/profile.png')} />
            <Text style={styles.name}>Henry Leung</Text>
            
            <View style={styles.tabList}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'tab1' && styles.activeTab,
                    ]}
                    onPress={() => handleTabPress('tab1')}
                >
                    <Text style={[
                        styles.tabTitle,
                        activeTab === 'tab1' && styles.activeTabText,
                    ]}>Coupons</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'tab2' && styles.activeTab,
                    ]}
                    onPress={() => handleTabPress('tab2')}
                >
                    <Text style={[
                        styles.tabTitle,
                        activeTab === 'tab2' && styles.activeTabText,
                    ]}>Recipes</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tabPanels}>
                {
                    activeTab === 'tab1' &&
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                    </ScrollView>
                }
                {
                    activeTab === 'tab2' &&
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                    </ScrollView>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
    },
    name: {
        fontFamily: "Manrope-Bold",
        fontSize: 19,
        marginTop: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 50
    },
    tabList: {
        flexDirection: 'row',
        width: 250,
        margin: 15,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabTitle: {
        fontFamily: "Manrope-Regular",
        fontSize: 14,
    },
    activeTabText: {
        fontFamily: "Manrope-Bold"
    },
    tabPanels: {
        alignItems: 'center'
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