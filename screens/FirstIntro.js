import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Next from '../components/button/Next';
import { colors } from '../theme';
import Logo from '../assets/logo/logo';
import Skip from '../components/skip';

export default function FirstIntro({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/background/background1.png')} />
            <View style={styles.introduction}>
                <View style={styles.intro}>
                    <Text style={{ color: colors.offWhite, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>Welcome to</Text>
                    <View style={styles.flexRow}>
                        <Text style={{ color: colors.offWhite, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>WhatSupper</Text>
                        <Logo style={styles.logo} />
                    </View>
                </View>
            </View>
            <View style={styles.skipButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Skip />
                </TouchableOpacity>
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
        width: '15%',
        aspectRatio: 2.6 / 2.3,
        marginLeft: 10,
    },
    introduction: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15%'
    },
    intro: {
        justifyContent: 'flex-start'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    skipButtonContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
});
