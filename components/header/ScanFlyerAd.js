import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ScanFlyerAd() {
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text style={{ color: colors.offWhite, fontFamily: 'Manrope-SemiBold', textAlign: 'left' }}>Scan a flyer</Text>
                <Text style={{ color: colors.offWhite, fontFamily: 'Manrope-SemiBold', textAlign: 'left' }}>get recipes</Text>
            </View>
            <View style={styles.learnMore}>
                <Text style={{ color: colors.offWhite, fontFamily: 'Manrope-SemiBold', textAlign: 'left' }}>Learn More</Text>
                <FontAwesome5
                    name={'arrow-right'}
                    size={15}
                    color={colors.offWhite}
                    style={{ marginLeft: 8 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 95,
        backgroundColor: colors.davysGray,
        overflow: 'hidden',
        borderRadius: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 30,
        flex: 1,
    },
    learnMore: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: '10%',
        marginTop: '10%'
    },
});
