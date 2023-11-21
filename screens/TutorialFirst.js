import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme';
import Back from '../components/button/Back';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import Tap from '../assets/tutorial';

export default function TutorialFirst({ navigation }) {
    const [loading, setLoading] = useState(true);
    const progress = useSharedValue(0); // Starting opacity at 0
    const isAnimationTriggered = useRef(false);
    const translateY = useSharedValue(0);
    const textOpacity = useSharedValue(1); // Controls how see-through the animated element is
    const [text1, setText1] = useState('Take a picture');
    const [text2, setText2] = useState('of your flyer...');

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
        };
    }, []);

    const reanimatedUp = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        };
    }, []);

    const startAnimation = () => {
        if (!isAnimationTriggered.current) {
            isAnimationTriggered.current = true;
            textOpacity.value = withSpring(0); // Fade out text
            progress.value = withTiming(0.5, { duration: 1000 }); // Opacity to 50% over 1 second
            translateY.value = withTiming(-300, { duration: 1000 }); // Move the element up
            setTimeout(() => {
                setText1('Crop out the');
                setText2('ingredients you want...');
                textOpacity.value = withSpring(1); // Fade in updated text
            }, 1000); // Adjust the timing for smoother transition
        }
    };

    const resetAnimation = () => {
        isAnimationTriggered.current = false;
        textOpacity.value = withSpring(1); // Reset text opacity
        progress.value = withSpring(0); // Reset opacity
        translateY.value = withSpring(0); // Reset translateY
        setText1('Take a picture');
        setText2('of your flyer...');
        textOpacity.value = 0;
    };

    useEffect(() => {
        const hideLoading = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(hideLoading);
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.first}>
                    <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 26 }}>First time? That's okay,</Text>
                    <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 26 }}>we'll show you the ropes</Text>
                </View>
            ) : (
                <View style={styles.second}>
                    {isAnimationTriggered.current ? (
                        <TouchableOpacity onPress={resetAnimation} style={styles.header}>
                            <FontAwesome5
                                name={'angle-left'}
                                size={35}
                                color={colors.offBlack}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
                            <FontAwesome5
                                name={'angle-left'}
                                size={35}
                                color={colors.offBlack}
                            />
                        </TouchableOpacity>
                    )}
                    <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 26, marginTop: '30%' }}>
                        {text1}
                    </Text>
                    <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 26 }}>
                        {text2}
                    </Text>
                    <View style={styles.centeredContainer}>
                        <Image
                            style={{ width: 328, height: 380, position: 'relative', zIndex: -1, borderRadius: 15 }}
                            source={require('../assets/tutorial.png')}
                        />
                        <TouchableOpacity
                            // Ensure both progress and textOpacity are checked before navigating
                            onPress={() => {
                                if (progress.value === 0.5 && textOpacity.value === 1) {
                                    navigation.navigate('TutorialSecond');
                                }
                            }}
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -92.5 }, { translateY: -92.5 }] }
                            }>
                            <Animated.View style={[{ height: 185, width: 185, backgroundColor: colors.jasmineYellow, position: 'absolute', zIndex: 1 }, reanimatedStyle]} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={startAnimation}>
                            <View style={styles.capture}>
                                <FontAwesome5
                                    name={'magic'}
                                    size={25}
                                    color={colors.offBlack}
                                />
                            </View>
                            <View style={styles.overlappingTap}>
                                <Animated.View style={[styles.overlappingTap, reanimatedUp]}>
                                    <Tap />
                                </Animated.View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    first: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    second: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    capture: {
        backgroundColor: colors.offWhite,
        borderColor: colors.lightGrey,
        borderWidth: 5,
        borderRadius: 50,
        padding: 15,
        marginBottom: '10%'
    },
    header: {
        position: 'absolute',
        top: 50,
        left: 40,
        zIndex: 2,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    overlappingTap: {
        position: 'absolute',
        top: 0,
        left: -23,
        zIndex: 3,
        color: 'white'
    },
});
