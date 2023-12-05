import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from '../theme';
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { db, auth } from '../firebase/firebase.config';
import { useTheme } from '../ThemeContext';
import Back from '../components/button/Back';

export default function Profile({navigation}) {
    const { isDarkMode, toggleTheme } = useTheme();
    const [fn, setFN] = useState("");

    const getUser = async () => {
        const myself = auth;
        if(!myself.currentUser){
            return;
        }

        const docRef = doc(db, "users", myself.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const user = docSnap.data();
            setFN(user.name);
        } else {
            console.log("No such document");
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    const logoutUser = async () => {
        await signOut(auth);
        console.log("User Logged Out");
        navigation.goBack();
    }

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.header}>
                <Back navigation={navigation} destination="Home" />
            </View>
            <View style={styles.user}>
                <Image style={styles.img} source={require('../assets/profile.png')} />
                <Text style={[styles.name, isDarkMode && styles.darkText]}>{fn}</Text>
                <Pressable style={styles.btn} onPress={() => logoutUser()}>
                    <Text style={styles.logout}>Log Out</Text>
                </Pressable>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    user: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 50,
        borderRadius: 20
    },
    header: {
        position: 'absolute',
        top: 10,
        left: 30,
        zIndex: 1,
    },
    darkContainer: {
        backgroundColor: colors.offBlack,
        color: colors.offWhite
    },
    darkText: {
        color: colors.offWhite
    },
    img: {
        width: 150,
        height: 150,
    },
    name: {
        fontFamily: "Manrope-Bold",
        fontSize: 19,
        marginTop: 20,
        color: colors.asparagus
    },
    btn: {
        backgroundColor: colors.asparagus,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 50,
        marginVertical: 10
    },
    logout: {
        color: colors.offWhite,
        fontFamily: 'Manrope-Bold',
        paddingVertical: 7,
    },
});
