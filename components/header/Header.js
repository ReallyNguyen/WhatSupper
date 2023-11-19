import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../../assets/logo/logo';
import { useTheme } from '../../ThemeContext'
import { colors } from '../../theme';

export default function Header() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (

        <View style={[styles.headerContainer, isDarkMode && styles.darkContainer]}>
            <View style={styles.textContainer}>
                <Text style={[styles.greetingText, isDarkMode && styles.darkGreetingText]}>👋 Hello, </Text>
                <Text style={[styles.boldText, isDarkMode && styles.darkBoldText]}>Henry!</Text>
            </View>
            <View style={styles.logoContainer}>
                <Logo style={styles.logo} />
            </View>
        </View >

    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '8%',
        marginTop: '20%'
    },
    darkContainer: {
        color: colors.offWhite
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    logoContainer: {
        justifyContent: 'flex-end'
    },
    greetingText: {
        fontSize: 20,
        fontFamily: 'Manrope-Regular',
    },
    darkGreetingText: {
        color: colors.offWhite,
    },
    boldText: {
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
    },
    darkBoldText: {
        color: colors.offWhite,
    },
});
