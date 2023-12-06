import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import Register from '../firebase/Register';
import Logo from '../assets/logo/logo';
import Back from '../components/button/Back';
import { useTheme } from '../ThemeContext';

export default function SignUp({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.back}>
                <Back navigation={navigation} color={colors.offBlack} />
            </View>
            <View style={[styles.register, isDarkMode && styles.darkBox]}>
                <View style={styles.header}>
                    <Logo />
                    <Text style={[styles.heading, isDarkMode && styles.darkText]}>Create Your Account</Text>
                </View>
                <View style={styles.inputs}>
                    <Register navigation={navigation}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    register: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20
    },
    header: {
        alignItems: 'center',
    },
    back: {
        position: 'absolute',
        top: 30,
        left: 35,
        zIndex: 1,
    },
    heading: {
        fontSize: 20, 
        fontFamily: "Manrope-Bold", 
        padding: 10
    },
    darkContainer: {
        backgroundColor: colors.offBlack,
        color: colors.offWhite
    },
    darkText: {
        color: colors.offWhite
    },
    darkBox: {
        backgroundColor: colors.davysGray
    },
});
