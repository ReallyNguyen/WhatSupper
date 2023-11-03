import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box, VStack, Link, Heading, Image } from "@gluestack-ui/themed";
import Back from '../components/button/Back';

export default function Recipe({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <View style={styles.loading}>
            <Text style={styles.loadingText}>Hold on, we are working our AI recipe magic! ✨</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <View style={styles.back}>
                <Back navigation={navigation} />
            </View>
            <Text style={styles.heading}>Here are some recipes based on what you scanned 🪄</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RecipeInfo')}>
                <Box
                    maxWidth="$72"
                    borderColor="$borderLight200"
                    borderRadius="$lg"
                    borderWidth="$1"
                    my="$4"
                    overflow="hidden"
                    sx={{
                        "@base": {
                            mx: "$5",
                        },
                        "@lg": {
                            my: "0",
                        },
                        _dark: {
                            bg: "$backgroundDark900",
                            borderColor: "$borderDark800",
                        },
                    }}
                >
                    <Box style={{ position: 'relative' }}>
                        <Image
                            h={120}
                            w={310}
                            source={require('../assets/recipes/hotpot.jpg')}
                            resizeMode="cover"
                            alt="image"
                        />
                        <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: "bold" }}>Hot Pot</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 5, marginRight: 5 }}>
                                            <Text style={{ color: 'white', fontSize: 10 }}>40 mins</Text>
                                        </View>
                                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 5, marginRight: 5 }}>
                                            <Text style={{ color: 'white', fontSize: 10 }}>560 kcals</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={{ color: 'white', fontSize: 10, paddingHorizontal: 10, marginTop: 10 }}>
                                    A thorough how-to guide to Chinese hot pot covering all aspects of preparing this iconic
                                    meal at home....
                                </Text>
                            </View>
                        </View>
                    </Box>
                </Box>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        padding: 16,
    },
    heading: {
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 16,
        width: '80%'
    },
    back: {
        position: 'absolute',
        top: 10,
        left: 30,
        zIndex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontFamily: 'Manrope-Bold',
        fontSize: 28,
        textAlign: 'center',
        paddingHorizontal: 20,
    }
});