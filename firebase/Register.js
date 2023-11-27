import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { useState } from 'react';
import { db, auth } from './firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";

export default function Register({navigation}) {
    const [fn, setFN] = useState("");
    const [em, setEmail] = useState("");
    const [ps, setPS] = useState("");

    const AddUser = async () => {
        if(fn && em && ps){
            try {
                const result = await createUserWithEmailAndPassword(auth, em, ps);
                console.log(result.user);

                const usersRef = doc(db, 'users', result.user.uid);
                await setDoc(
                    usersRef,
                    { name: fn },
                    { merge: true }
                );
            } catch (error) {
                console.log(error);
                alert('Error: ' + error.message);
            }
        } else {
            alert('fill in all text fields');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='name' onChangeText={(txt) => setFN(txt)} />
            <TextInput style={styles.input} placeholder='email' onChangeText={(txt) => setEmail(txt)} />
            <TextInput style={styles.input} placeholder='password' onChangeText={(txt) => setPS(txt)} />
            <Button title='register' onPress={() => AddUser()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical: 20
    },
    input: {
        width: 200,
        padding: 10
    }
});