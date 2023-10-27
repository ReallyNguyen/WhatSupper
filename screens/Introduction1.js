import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Next from '../components/button/Next';
import { colors } from '../theme';
import Logo from '../assets/logo/logo'
import Background1 from '../assets/background/background1';
import SuperStoreLogo from '../assets/brands/superstoreLogo';

export default function Introduction1({ navigation }) {
    return (
        <View style={styles.container}>
            <Background1 style={styles.background} />
            <Text>Hi</Text>
            <Logo />
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
        zIndex: -1, // Ensure the background is rendered below other elements
    },
});
