import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native';
import { useTheme } from '../../ThemeContext';
import Light from '../../assets/lightanddark/Light';
import Dark from '../../assets/lightanddark/Dark';

const themes = [
    { id: 'Light', name: 'Light' },
    { id: 'Dark', name: 'Dark' },
];

export default function ToggleMode() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [theme, setTheme] = useState('Light');
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (value) => {
        setTheme(value);
        setIsOpen(false);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={[styles.container, styles.customDropdown]}>
                <TouchableOpacity style={[styles.selectedOption, styles.dropdownButton, isDarkMode && styles.darkModeButton]} onPress={() => setIsOpen(!isOpen)}>
                    <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>{theme}</Text>
                    {isDarkMode ? <Dark /> : <Light />}
                </TouchableOpacity>
                {isOpen && (
                    <View style={[styles.optionsContainer, styles.dropdownOptions, isDarkMode && styles.darkOptions]}>
                        <FlatList
                            data={themes}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { handleChange(item.id); toggleTheme(item.id); }} style={styles.option}>
                                    <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>{item.name}</Text>
                                </TouchableOpacity>

                            )}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
    },
    customDropdown: {
        position: 'relative',
    },
    selectedOption: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        cursor: 'pointer',
        justifyContent: 'space-between',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    dropdownButton: {
        width: 113,
        height: 35,
        borderRadius: 15,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#F1EFEF',
    },
    darkModeButton: {
        backgroundColor: 'black',
        color: 'white',
    },
    buttonText: {
        fontSize: 12,
        color: 'black',
    },
    darkButtonText: {
        color: 'white',
    },
    optionsContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#F1EFEF',
    },
    dropdownOptions: {
        width: 113,
    },
    darkOptions: {
        backgroundColor: 'black',
    },
    option: {
        padding: 8,
        cursor: 'pointer',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        color: 'black',
    },
    darkOptionText: {
        color: 'white',
    },
    text: {
        fontSize: 20,
    },
    darkText: {
        color: 'white',
    },
});


