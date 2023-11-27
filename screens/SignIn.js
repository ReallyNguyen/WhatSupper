import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { colors } from '../theme';
import Skip from '../components/skip';
import Login from '../firebase/Login';
import Register from '../firebase/Register';

export default function SignIn({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/background/background3.png')} />
            <View style={styles.introduction}>
                <View style={styles.intro}>
                    <Text style={{ color: colors.offWhite, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>Sign In</Text>
                </View>
                <View style={styles.inputs}>
                    <Login navigation={navigation}/>
                    <Register />
                </View>
                <View style={styles.skipButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Skip />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    introduction: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    intro: {
        justifyContent: 'center',
    },
    skipButtonContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
});
