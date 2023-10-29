import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Next from '../components/button/Next';
import { colors } from '../theme';
import Skip from '../components/skip';


export default function SecondIntro({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/background/background3.png')} />
            <View style={styles.introduction}>
                <View style={styles.intro}>
                    <Text style={{ color: colors.offWhite, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>Create Meals at an</Text>
                    <Text style={{ color: colors.asparagus, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>Affordable Cost</Text>
                </View>
                <View style={styles.skipButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Skip />
                </TouchableOpacity>
            </View>
            </View>
            <Next navigation={navigation} destination="Home" />
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
        justifyContent: 'flex-start'
    },
    skipButtonContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },

});
