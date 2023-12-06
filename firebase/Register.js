import { StyleSheet, Text, View, Button, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { db, auth } from './firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { colors } from '../theme';
import { useTheme } from '../ThemeContext';

export default function Register({navigation}) {
    const [fn, setFN] = useState("");
    const [em, setEmail] = useState("");
    const [ps, setPS] = useState("");
    const { isDarkMode, toggleTheme } = useTheme();

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
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.required}>
                <Text style={[styles.label, isDarkMode && styles.darkText]}>Full Name*</Text>
                <Text style={[styles.label, isDarkMode && styles.darkText]}>* required fields</Text>
            </View>
            <TextInput 
                style={[styles.input, isDarkMode && styles.darkBorder]} 
                placeholder='Full name' 
                placeholderTextColor={isDarkMode ? colors.offWhite : colors.offBlack}
                onChangeText={(txt) => setFN(txt)} 
            />
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Email*</Text>
            <TextInput 
                style={[styles.input, isDarkMode && styles.darkBorder]} 
                placeholder='Email address' 
                placeholderTextColor={isDarkMode ? colors.offWhite : colors.offBlack}
                onChangeText={(txt) => setEmail(txt)} 
            />
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Password*</Text>
            <TextInput 
                style={[styles.input, isDarkMode && styles.darkBorder]} 
                placeholder='min 8 characters' 
                placeholderTextColor={isDarkMode ? colors.offWhite : colors.offBlack}
                onChangeText={(txt) => setPS(txt)} 
            />
            <Pressable style={styles.btn} onPress={() => AddUser()}>
                <Text style={styles.register}>Sign Up</Text>
            </Pressable>
            <View style={styles.question}>
               <Text style={[styles.account, isDarkMode && styles.darkText]}>Have an account? </Text>
                <Pressable onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.login}>Sign in</Text>
                </Pressable>
            </View>
            <Text style={[styles.or, isDarkMode && styles.darkText]}>OR</Text>
            <Pressable style={[styles.google, isDarkMode && styles.darkBorder]} onPress={() => SignIn()}>
                <Text style={[styles.continue, isDarkMode && styles.darkText]}>Continue with Google</Text>
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
    },
    or: {
        textAlign: 'center'
    },
    darkContainer: {
        backgroundColor: colors.davysGray,
        color: colors.offWhite
    },
    darkText: {
        color: colors.offWhite
    },
    darkBorder: {
        borderColor: colors.offWhite,
        color: colors.offWhite
    }
});