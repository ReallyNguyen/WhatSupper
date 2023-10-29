import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Next from '../components/button/Next';
import { colors } from '../theme';

export default function SecondIntro({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/background/background2.png')} />
            <View style={styles.introduction}>
                <View style={styles.intro}>
                    <Text style={{ color: colors.offWhite, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>Scan</Text>
                    <Text style={{ color: colors.asparagus, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>Coupon Flyers</Text>
                    <Text style={{ color: colors.offWhite, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>From Local</Text>
                    <Text style={{ color: colors.offWhite, fontSize: 40, fontFamily: "Manrope-ExtraBold" }}>Grocery Stores</Text>



                </View>
            </View>
            <Next navigation={navigation} destination="Third" />
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

});
