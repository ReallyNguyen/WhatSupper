import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

export default function Next({ navigation }) {

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Pressable
                style={styles.button}
                title="Next"
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.text}>Next</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 65,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#4F4F4F',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    }
});
