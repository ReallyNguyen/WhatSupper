import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View, Text, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { colors } from '../../theme';
import { useTheme } from '../../ThemeContext';

const screenHeight = Dimensions.get('window').height;
const animjson = require('../../assets/loading/Loading.json');

export default function Loading() {
    const { isDarkMode, toggleTheme } = useTheme();
    const animation = useRef(null);

    useEffect(() => {
        animation.current?.reset();
        setTimeout(() => {
            animation.current?.play();
        }, 100)

    }, []);

    return (
        <View style={[styles.animationContainer, isDarkMode && styles.darkContainer
        ]}>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Hold on, we are working our AI recipe magic! ✨</Text>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 300,
                    height: 300,
                }}
                source={animjson}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: colors.offWhite,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: screenHeight
    },
    text: {
        fontFamily: 'Manrope-SemiBold',
        fontSize: 26,
        marginHorizontal: '10%',
        textAlign: 'center'
    },
    darkText: {
        color: colors.offWhite,
        fontFamily: 'Manrope-SemiBold',
        fontSize: 26,
        marginHorizontal: '10%',
        textAlign: 'center'
    },
    darkContainer: {
        backgroundColor: colors.offBlack,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: screenHeight
    },
});
