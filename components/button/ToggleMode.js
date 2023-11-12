import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Pressable } from 'react-native';
import Light from '../../assets/lightanddark/Light';

export default function ToggleMode() {
    return (
        <>
            <View style={styles.toggle}>
                <Text style={styles.text}>Light</Text>
                <Light />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    toggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 113,
        height: 30,
        backgroundColor: '#F1EFEF',
        borderRadius: 15,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});
