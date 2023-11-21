import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { Box, Image } from "@gluestack-ui/themed";
import Back from '../components/button/Back';
import { colors } from '../theme';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Recipe({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true);
    const [aiResponse, setAiResponse] = useState(null);
    const [aiIngredients, setAiIngredients] = useState(route.params?.aiIngredients);

    useEffect(() => {
        const loading = async () => {
            if (aiResponse !== null) {
                setIsLoading(false);
            }
        };

        loading();
    }, [aiResponse]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.post(
                        'https://lsswwzyavgt7egwvij52d2qkai0rseod.lambda-url.ca-central-1.on.aws/',
                        {
                            question: `Create a JSON format with an array of 2 meals using ${aiIngredients}. Each meal should have an "id", "name", "cuisine", "description", "mins", "cals", "ingredients,", "numsIngredient", and "instructions in an array"
                            `,
                            img: true
                        }
                    );

                    const recipes = response.data.choices[0].message.content;
                    console.log("The recipes", recipes);
                    setAiResponse(recipes);

                } catch (error) {
                    console.error(error);
                }
            };

            if (aiIngredients !== null) {
                fetchData();
            }
        }, [aiIngredients])
    );

    if (!aiResponse) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>No AI response available.</Text>
            </View>
        );
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.post(
    //                 'https://lsswwzyavgt7egwvij52d2qkai0rseod.lambda-url.ca-central-1.on.aws/',
    //                 {
    //                     question: `Create a JSON format with an array of 2 meals using ${aiIngredients}. Each meal should have an "id", "name", "cuisine", "description", "mins", "cals", "ingredients,", "numsIngredient", and "instructions in an array"
    //                     `,
    //                     img: true
    //                 }
    //             );

    //             const recipes = response.data.choices[0].message.content;
    //             console.log("The recipes", recipes);
    //             setAiResponse(recipes);

    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     if (ocrResponse !== null) {
    //         fetchData();
    //     }

    // }, []);


    const parsedResponse = aiResponse;
    console.log(parsedResponse)

    return (
        <ScrollView>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={{ marginTop: 10 }}>Processing...</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.back}>
                        <Back navigation={navigation} />
                    </View>
                    <Text style={styles.heading}>Here are some recipes based on what you scanned 🪄</Text>
                    {parsedResponse.meals && Array.isArray(parsedResponse.meals) && parsedResponse.meals.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('RecipeInfo', { recipe: item })}>
                            <Box
                                key={index}
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
                                <Image
                                    h={120}
                                    w={310}
                                    source={{ uri: item.image_url }}
                                    resizeMode="cover"
                                    alt="image"
                                />
                                <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                    <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 5, marginRight: 5 }}>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>{item.mins} mins</Text>
                                                </View>
                                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 5, marginRight: 5 }}>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>{item.cuisine}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={{ color: 'white', fontSize: 10, paddingHorizontal: 10, marginTop: 10 }}>
                                            {item.description}
                                        </Text>
                                    </View>
                                </View>
                            </Box>
                        </TouchableOpacity>
                    ))}
                </View>)}
        </ScrollView>
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
        width: '80%',
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
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
    recipeName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    detailText: {
        color: 'white',
        fontSize: 10,
    },
});
