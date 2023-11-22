import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading() {
    const animation = useRef(null);
    useEffect(() => {
        animation.current?.play();
    }, []);

    return (
        <View style={styles.animationContainerContainer}>
            <Text style={{ fontFamily: 'Manrope-SemiBold', fontSize: 26, marginHorizontal: '10%' }}>Hold on, we are working our AI recipe magic! ✨</Text>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 300,
                    height: 300,
                }}
                source={require('../../assets/loading/Loading.json')}

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
