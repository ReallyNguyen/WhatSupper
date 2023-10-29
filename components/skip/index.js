import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

function SkipButton() {
    const navigation = useNavigation();

    const handleButtonPress = () => {
        navigation.navigate('Home'); // Replace 'Home' with the name of your target screen
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleButtonPress}>
                <View style={[styles.customButton, { backgroundColor: 'white' }]}>
                    <ButtonText style={styles.buttonText}>Skip</ButtonText>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customButton: {
        borderRadius: 20,
        padding: 10,
    },
    buttonText: {
        fontSize: 13,
        lineHeight: 15,
        letterSpacing: 0.25,
        color: '#629560', // Change to the previous button color
    },
});

export default SkipButton;
