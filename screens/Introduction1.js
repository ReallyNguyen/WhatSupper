import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Next from '../components/button/Next';
import { colors } from '../theme';
import Logo from '../assets/logo/logo'

export default function Introduction1({ navigation }) {
    return (
        <View style={styles.container}>
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
});
