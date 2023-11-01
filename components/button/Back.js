import React from 'react';
import { View, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Back({ navigation, color }) {
    const backColor = color === 'black' ? 'black' : 'white';
    const iconColor = color === 'black' ? 'white' : 'black';

    return (
        <View style={{ flex: 1 }}>
            <Pressable onPress={() => navigation.goBack()}>
                <FontAwesome5
                    name={'angle-left'}
                    size={35}
                    color={iconColor}
                />
            </Pressable>
        </View>
    );
}
