import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import CameraAndCrop from '../components/camera/CameraAndCrop';

export default function Camera({ navigation }) {
    return (
        <View style={styles.container}>
            <CameraAndCrop />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
