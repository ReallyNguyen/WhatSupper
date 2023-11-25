import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const animjson = require('../../assets/loading/Loading.json');
export default function Loading() {
    const animation = useRef(null);

    useEffect(() => {
        animation.current?.reset();
        setTimeout(() => {
            animation.current?.play();
        }, 100)

    }, []);

    return (
        <View style={styles.animationContainerContainer}>
            <Text style={{ fontFamily: 'Manrope-SemiBold', fontSize: 26, marginHorizontal: '10%', textAlign: 'center' }}>Hold on, we are working our AI recipe magic! ✨</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

});
