import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import Login from '../firebase/Login';
import Logo from '../assets/logo/logo';
import Back from '../components/button/Back';
import { useTheme } from '../ThemeContext';

export default function SignIn({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.back}>
                <Back navigation={navigation} color={colors.offBlack} />
            </View>
            <View style={[styles.login, isDarkMode && styles.darkBox]}>
                <View style={styles.header}>
                    <Logo />
                    <Text style={[styles.heading, isDarkMode && styles.darkText]}>Sign In</Text>
                </View>
                <View style={styles.inputs}>
                    <Login navigation={navigation}/>
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
    login: {
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
