import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../../assets/logo/logo';

export default function Header() {
    return (

        <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
                <Text style={{ fontSize: 20, fontFamily: 'Manrope-Regular' }}>👋 Hello, </Text>
                <Text style={{ fontSize: 20, fontFamily: 'Manrope-Bold' }}>Henry!</Text>
            </View>
            <View style={styles.logoContainer}>
                <Logo style={styles.logo} />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '8%',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    logoContainer: {
        justifyContent: 'flex-end'
    }
});
