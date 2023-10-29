import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Next from '../components/button/Next';
import { colors } from '../theme';
import Logo from '../assets/logo/logo';

export default function FirstIntro({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/background/background1.png')} />
            <View style={styles.introduction}>
                <View style={styles.intro}>
                    <Text style={{ color: colors.offWhite, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>Welcome to</Text>
                    <Text style={{ color: colors.offWhite, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>WhatSupper</Text>

                    <Image source={require('../assets/whatsupperlogo.png')} />

                </View>
            </View>

            <Next navigation={navigation} destination="Second" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    logo: {
        width: '150%',
        height: '150%',
    },
    introduction: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    intro: {
        justifyContent: 'flex-start'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});