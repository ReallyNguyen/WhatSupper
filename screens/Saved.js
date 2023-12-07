import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Box } from "@gluestack-ui/themed";
import { category } from '../data/category';
import Bento from '../components/recipe/Bento';
import CouponSearchBar from '../components/search/CouponSearchBar';
import RecipeSearchBar from '../components/search/RecipeSearchBar';
import Back from '../components/button/Back';
import { useTheme } from '../ThemeContext'
import { colors } from '../theme';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export default function Saved({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('recipes');
    const [couponSearch, setCouponSearch] = useState('');
    const [recipeSearch, setRecipeSearch] = useState('');
    const [fn, setFN] = useState("");
    const [scanData, setScanData] = useState([]);
    const [user, setUser] = useState(null);

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    const getUser = async () => {
        const myself = auth;
        if (!myself.currentUser) {
            setFN("");
            return;
        }

        const docRef = doc(db, "users", myself.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const user = docSnap.data();
            setFN(user.name);
        } else {
            console.log("No such document");
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    const fetchScanData = async () => {
        if (user) {
            const q = query(collection(db, 'scans'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => doc.data());
            setScanData(data);

        }
    };

    useEffect(() => {
        const stop = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => stop();
    }, []);

    useEffect(() => {
        fetchScanData();
    }, [user]);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.header}>
                <Back navigation={navigation} destination="Home" />
            </View>
            <View style={styles.user}>
                <Image style={styles.img} source={require('../assets/profile.png')} />
                <Text style={[styles.name, isDarkMode && styles.darkText]}>{fn}</Text>
            </View>


            <View style={styles.tabList}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'recipes' && styles.activeTab,
                    ]}
                    onPress={() => handleTabPress('recipes')}
                >
                    <Text style={[
                        styles.tabTitle,
                        activeTab === 'recipes' && styles.activeTabText,
                        isDarkMode && styles.darkText
                    ]}>Recipes</Text>
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
                    ]}>Scan History</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabPanels}>
                {
                    activeTab === 'recipes' &&
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
                {
                    activeTab === 'tab2' &&
                    <View style={styles.search}>
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            {scanData.map((scan, index) => (
                                <View key={index}>
                                    <Box style={{ position: 'relative' }}>
                                        <Image source={{ uri: scan.uri }} style={styles.scanImage} resizeMode="cover" />
                                        <View style={styles.box}>
                                            <Text style={styles.time}>{scan.timestamp}</Text>
                                        </View>
                                    </Box>
                                </View>
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
        marginTop: '8%'
    },
    user: {
        marginTop: '17%',
        alignItems: 'center'
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
        gap: 20,
        height: 1100,
    },
    search: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    scanImage: {
        width: 150,
        height: 220,
        borderRadius: 10,
    },
    box: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    time: {
        color: colors.offWhite,
        fontFamily: 'Manrope-Bold',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.offWhite,
        borderRadius: 5,
        padding: 5
    },
});