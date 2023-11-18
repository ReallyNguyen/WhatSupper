import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import CouponCard from '../components/coupon/CouponCard';
import { coupon } from '../data/coupon';
import { category } from '../data/category';
import Bento from '../components/recipe/Bento';
import CouponSearchBar from '../components/search/CouponSearchBar';
import RecipeSearchBar from '../components/search/RecipeSearchBar';
import Back from '../components/button/Back';
import { useTheme } from '../ThemeContext'
import { colors } from '../theme';

export default function Saved({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('tab1');
    const [couponSearch, setCouponSearch] = useState('');
    const [recipeSearch, setRecipeSearch] = useState('');

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.header}>
                <Back navigation={navigation} destination="Home" />
            </View>
            <Image style={styles.img} source={require('../assets/profile.png')} />
            <Text style={[styles.name, isDarkMode && styles.darkText]}>Henry Leung</Text>

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
                        isDarkMode && styles.darkText
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
                        isDarkMode && styles.darkText
                    ]}>Recipes</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabPanels}>
                {
                    activeTab === 'tab1' &&
                    <View style={styles.search}>
                        <CouponSearchBar setCouponSearch={setCouponSearch} />
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            {coupon
                                .filter(item => item.name.toLowerCase().includes(couponSearch.toLowerCase()))
                                .map((item) => (
                                    <TouchableOpacity onPress={() => navigation.navigate('CouponInfo')} key={item.id}>
                                        <CouponCard
                                            style={styles.latest}
                                            name={item.name}
                                            brand={item.brand}
                                            background={item.background}
                                            discount={item.discount}
                                            product={item.product}
                                            expiration={item.expiration}
                                        />
                                    </TouchableOpacity>
                                ))}
                        </ScrollView>
                    </View>
                }
                {
                    activeTab === 'tab2' &&
                    <View style={styles.search}>
                        <RecipeSearchBar setRecipeSearch={setRecipeSearch} />
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            {category
                                .filter(item => item.cuisine.toLowerCase().includes(recipeSearch.toLowerCase()))
                                .map((item) => (
                                    <Bento
                                        key={item.id}
                                        cuisine={item.cuisine}
                                        img1={item.img1}
                                        img2={item.img2}
                                        img3={item.img3}
                                        navigation={navigation}
                                        destination1="RecipeCategory"
                                        destination2="RecipeCategory"
                                        destination3="RecipeCategory"
                                    />
                                ))}
                        </ScrollView>
                    </View>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        marginLeft: '7%',
    },
    darkContainer: {
        backgroundColor: colors.offBlack,
        color: colors.offWhite
    },
    darkText: {
        color: colors.offWhite
    },
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
        height: 1100,
    },
    search: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    }
});