import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Back from "../components/button/Back";
import { colors } from "../theme";

export default function TutorialSecond({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Back navigation={navigation} />
            </View>
            <View style={styles.centeredText}>
                <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 26, textAlign: 'center' }}>and leave it to us to</Text>
                <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 26, textAlign: 'center' }}>generate your recipes. 🧑‍🍳</Text>
            </View>
            <Image
                style={{ height: 405, width: 184, marginVertical: '5%' }}
                source={require('../assets/iphone.png')}
                alt="image"
            />
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.button}
                    title="Return to App"
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={{ fontFamily: 'Manrope-SemiBold', fontSize: 16, color: colors.offWhite, textAlign: 'center', alignItems: 'center' }}>Return to App</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginLeft: '10%',
        marginTop: '5%'
    },
    centeredText: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 262,
        height: 54,
        borderRadius: 20,
        backgroundColor: colors.asparagus,
        justifyContent: 'center'
    },
});
