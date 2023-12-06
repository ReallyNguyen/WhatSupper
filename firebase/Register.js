import { StyleSheet, Text, View, Button, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { db, auth } from './firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { colors } from '../theme';

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
            <View style={styles.required}>
                <Text style={styles.label}>Full Name*</Text>
                <Text style={styles.label}>* required fields</Text>
            </View>
            <TextInput style={styles.input} placeholder='Full name' onChangeText={(txt) => setFN(txt)} />
            <Text style={styles.label}>Email*</Text>
            <TextInput style={styles.input} placeholder='Email address' onChangeText={(txt) => setEmail(txt)} />
            <Text style={styles.label}>Password*</Text>
            <TextInput style={styles.input} placeholder='min 8 characters' onChangeText={(txt) => setPS(txt)} />
            <Pressable style={styles.btn} onPress={() => AddUser()}>
                <Text style={styles.register}>Sign Up</Text>
            </Pressable>
            <View style={styles.question}>
               <Text style={styles.account}>Have an account? </Text>
                <Pressable onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.login}>Sign in</Text>
                </Pressable>
            </View>
            <Text style={{textAlign: 'center'}}>OR</Text>
            <Pressable style={styles.google} onPress={() => SignIn()}>
                <Text style={styles.continue}>Continue with Google</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
    },
    input: {
        width: 250,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    required: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        fontFamily: 'Manrope-Regular',
        paddingVertical: 5,
        fontSize: 13
    },
    btn: {
        backgroundColor: colors.asparagus,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    },
    register: {
        color: colors.offWhite,
        fontFamily: 'Manrope-Bold',
        paddingVertical: 7,
    },
    question: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 5
    },
    account: {
        fontFamily: 'Manrope-Regular',
        fontSize: 12
    },
    login: {
        fontFamily: 'Manrope-Regular',
        fontSize: 12,
        color: colors.asparagus
    },
    google: {
        borderWidth: 1,
        borderColor: colors.offBlack,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    },
    continue: {
        fontFamily: 'Manrope-Regular',
        paddingVertical: 7,
    }
});