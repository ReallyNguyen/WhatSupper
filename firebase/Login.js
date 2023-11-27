import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from './firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth'; 

export default function Login({navigation}) {
    const [em, setEmail] = useState("");
    const [ps, setPS] = useState("");

    const SignIn = async () => {
        const result = await signInWithEmailAndPassword(auth, em, ps);
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='email' onChangeText={(txt) => setEmail(txt)} />
            <TextInput style={styles.input} placeholder='password' onChangeText={(txt) => setPS(txt)} />
            <Button title='Login' onPress={() => SignIn()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    input: {
        width: 200,
        padding: 10
    }
});
