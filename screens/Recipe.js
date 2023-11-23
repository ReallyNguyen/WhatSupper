import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { Box, Image } from "@gluestack-ui/themed";
import Back from '../components/button/Back';
import { colors } from '../theme';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Loading from '../components/loading/Loading';

export default function Recipe({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true);
    const [aiResponse, setAiResponse] = useState(null);
    const [aiIngredients, setAiIngredients] = useState(route.params?.aiIngredients);
    const [newIngredient, setNewIngredient] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [ingredientsList, setIngredientsList] = useState([]);

    const animation = useRef(null);

    const selectedNumber = route.params?.selectedNumber || 2;

    const removeIngredient = (index) => {
        const updatedIngredients = [...parsedIngredients.ingredients];
        updatedIngredients.splice(index, 1);
        setAiIngredients(JSON.stringify({ ingredients: updatedIngredients }));
    };

    useEffect(() => {
        animation.current?.play();
    }, []);

    useEffect(() => {
        const loading = async () => {
            if (aiResponse !== null) {
                setIsLoading(false);
            }
        };

        loading();
    }, [aiResponse]);

    useEffect(() => {
        if (newIngredient.length > 0) {
            setShowNew(true);
        } else {
            setShowNew(false);
        }
    }, [newIngredient]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.post(
                        'https://lsswwzyavgt7egwvij52d2qkai0rseod.lambda-url.ca-central-1.on.aws/',
                        {
                            question: `Create a JSON format with an array of ${selectedNumber} meals using ${aiIngredients}. Each meal should have an "id", "name", "cuisine", "description", "mins", "cals", "ingredients,", "numsIngredient", and "instructions in an array"
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
        }, [aiIngredients, selectedNumber])
    );

    let parsedIngredients = null;

    try {
        parsedIngredients = JSON.parse(aiIngredients);
    } catch (error) {
        console.error('Error parsing aiIngredients:', error);
    }

    console.log(parsedIngredients);
    console.log("aiIngredients from params:", aiIngredients);


    const parsedResponse = aiResponse;
    console.log(parsedResponse)

    return (
        <ScrollView >
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Loading />
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.back}>
                        <Back navigation={navigation} />
                    </View>
                    <Text style={styles.heading}>Here are some recipes based on what you scanned 🪄</Text>

                    <View style={styles.ingredientsContainer}>
                        {parsedIngredients.ingredients && Array.isArray(parsedIngredients.ingredients) && parsedIngredients.ingredients.map((ingredient, i) => (
                            <View style={styles.ingredientBox} key={i}>
                                <Pressable onPress={() => removeIngredient(i)} style={styles.delete}>
                                    <FontAwesome5
                                        name={'times'}
                                        size={10}
                                        color={colors.offBlack}
                                    />
                                </Pressable>
                                <Text style={{ color: colors.offWhite, fontSize: 13 }}>{ingredient}</Text>
                            </View>
                        ))}
                        {ingredientsList.map((ingredient, i) => (
                            <View style={styles.ingredientBox} key={i}>
                                <Pressable style={styles.delete}>
                                    <FontAwesome5
                                        name={'times'}
                                        size={10}
                                        color={colors.offBlack}
                                    />
                                </Pressable>
                                <Text style={{ color: colors.offWhite }}>{ingredient}</Text>
                            </View>
                        ))}
                    </View>

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
    ingredientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        width: '80%',
        marginTop: 10,
    },
    ingredientBox: {
        backgroundColor: colors.asparagus,
        padding: 10,
        borderRadius: 5,
    },
    delete: {
        backgroundColor: colors.offWhite,
        borderWidth: 1,
        borderColor: colors.offBlack,
        paddingVertical: 3,
        paddingHorizontal: 4,
        borderRadius: 20,
        position: 'absolute',
        top: -5,
        left: -5,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%'
    },

});
