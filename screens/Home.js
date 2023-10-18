import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { colors } from '../theme';

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Welcome!</Text>
            <StatusBar style="auto" />
            <Button 
                title="Go to about page"
                onPress={() => navigation.push('About')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.offWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
