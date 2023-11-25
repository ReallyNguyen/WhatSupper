import React from 'react';
import { View, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../ThemeContext';
import { colors } from '../../theme';

export default function Back({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const backColor = isDarkMode ? colors.offBlack : colors.white;
    const iconColor = isDarkMode ? colors.offWhite : colors.black;

    return (
        <View style={{ flex: 1, marginTop: 8 }}>
            <Pressable onPress={() => {
                navigation.setParams({
                    autoGen: false
                })
                navigation.goBack()
            }}>
                <FontAwesome5
                    name={'angle-left'}
                    size={35}
                    color={iconColor}
                    style={{ backgroundColor: backColor, padding: 10, borderRadius: 10 }}
                />
            </Pressable>
        </View>
    );
}
