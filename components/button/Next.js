import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

export default function Next({ navigation, destination }) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.content}>
            </View>
            <Pressable
                style={styles.button}
                title="Next"
                onPress={() => navigation.navigate(destination)}
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
        marginBottom: 50
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
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
