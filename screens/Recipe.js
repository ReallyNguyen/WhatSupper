import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Modal,
    TextInput
} from 'react-native';
import { Box, Image } from "@gluestack-ui/themed";
import Back from '../components/button/Back';
import { colors } from '../theme';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import Loading from '../components/loading/Loading';
import Refresh from '../components/button/Refresh';
import HorizontalRecipe from '../components/recipe/HorizontalRecipe';
import { useTheme } from '../ThemeContext'

export default function Recipe({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true);
    const [aiResponse, setAiResponse] = useState(null);
    const [aiIngredients, setAiIngredients] = useState(route.params?.aiIngredients);
    const [newIngredient, setNewIngredient] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(route.params?.selectedNumber);
    const [pressedButton, setPressedButton] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const aiIngredientsRef = useRef(aiIngredients);
    const aiResponseRef = useRef(aiResponse);
    const { isDarkMode, toggleTheme } = useTheme();

    const addIngredient = () => {
        if (newIngredient.length > 0) {
            const updatedIngredientsList = [...ingredientsList, newIngredient];
            setIngredientsList(updatedIngredientsList);

            const updatedIngredients = [...parsedIngredients.ingredients, newIngredient];
            setAiIngredients(JSON.stringify({ ingredients: updatedIngredients }));

            setNewIngredient('');
        }
    };

    const generateRecipes = async () => {

        navigation.navigate('Recipe', { aiIngredients: aiIngredients, selectedNumber: selectedNumber });
        setIsModalVisible(false);

    };


    const removeIngredient = (index) => {
        const updatedIngredients = [...parsedIngredients.ingredients];
        updatedIngredients.splice(index, 1);
        setAiIngredients(JSON.stringify({ ingredients: updatedIngredients }));
    };

    const handleNumberPress = (number) => {
        setSelectedNumber(number);
        console.log(`Selected Number: ${number}`);
    };

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

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                'https://lsswwzyavgt7egwvij52d2qkai0rseod.lambda-url.ca-central-1.on.aws/',
                {
                    question: `Create a JSON format with an array of ${selectedNumber || 2} meals using ${aiIngredients} and name that array 'meals'. Each meal should have an "id", "name", "cuisine", "description", "mins", "cals", "ingredients", "numsIngredient", and "instructions in an array". Make instructions really detail as possible.`,
                    img: true,
                }
            );

            const recipes = response.data.choices[0].message.content;
            console.log("The recipes", recipes);
            console.log("how many recipe", selectedNumber)
            setAiResponse(recipes);
        } catch (error) {
            console.error(error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        aiIngredientsRef.current = aiIngredients;
        aiResponseRef.current = aiResponse;
    }, [aiIngredients, aiResponse]);

    useFocusEffect(
        React.useCallback(() => {
            if (aiIngredientsRef.current !== null && aiResponseRef.current === null) {
                fetchData();
            }
        }, [])
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
        <ScrollView style={isDarkMode && styles.darkContainer}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Loading />
                </View>
            ) : (
                <View style={[styles.container, isDarkMode && styles.darkContainer]}>
                    <View style={styles.header}>
                        <Back navigation={navigation} />
                        <Pressable style={styles.add} onPress={() => setIsModalVisible(true)}>
                            <Text style={styles.addTxt}>Add +</Text>
                        </Pressable>
                    </View>
                    <Text style={[styles.heading, isDarkMode && styles.darkText]}>Here are some recipes based on what you scanned 🪄</Text>
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
                    </View>
                    {parsedResponse.meals && Array.isArray(parsedResponse.meals) && parsedResponse.meals.map((item, index) => (
                        <View>
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('RecipeInfo', { recipe: item })}>
                                <HorizontalRecipe
                                    title={item.name}
                                    imageUrl={item.image_url}
                                    mins={item.mins}
                                    cuisine={item.cuisine}
                                    description={item.description}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}

                    <Refresh onPress={() => fetchData()} />


                </View>
            )}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={[styles.modalContainer, isDarkMode && styles.darkContainer]}>
                    <Pressable onPress={() => setIsModalVisible(false)}>
                        <View style={styles.rectangle} />
                    </Pressable>
                    {showCustomize ? null : (
                        <View style={styles.optionContainer}>
                            <Text style={[styles.modalHeading, isDarkMode && styles.darkText]}>What would you like to add?</Text>
                            <View style={styles.options}>
                                <View style={[styles.option, { alignItems: 'center' }]}>
                                    <Pressable style={styles.optionIcon} onPress={() => navigation.goBack()}>
                                        <FontAwesome5
                                            name={'magic'}
                                            size={25}
                                            color={colors.offBlack}
                                        />
                                    </Pressable>
                                    <Text style={[styles.optionsTitle, isDarkMode && styles.darkText]}>Scan More Flyers?</Text>
                                </View>
                                <View style={[styles.option, { alignItems: 'center' }]}>
                                    <Pressable style={styles.optionIcon} onPress={() => { setShowCustomize(true) }}>
                                        <FontAwesome5
                                            name={'plus'}
                                            size={25}
                                            color={colors.offBlack}
                                            style={styles.icon}
                                        />
                                    </Pressable>
                                    <Text style={[styles.optionsTitle, isDarkMode && styles.darkText]}>Add Ingredients</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    {showCustomize && (
                        <View style={styles.optionContainer}>
                            <Pressable onPress={() => { setShowCustomize(false) }} style={styles.back}>
                                <FontAwesome5
                                    name={'angle-left'}
                                    size={25}
                                    color={colors.offBlack}
                                />
                            </Pressable>
                            <ScrollView style={{ overflow: 'visible', flexGrow: 0, flexShrink: 0, height: 300 }}>
                                <Text style={[styles.modalHeading, isDarkMode && styles.darkText]}>Personalize Recipes to Your Taste ⏲️</Text>
                                <View style={styles.addInput}>
                                    <Text style={[styles.addHeading, isDarkMode && styles.darkText]}>Add Ingredient(s):</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Type in an ingredient.. Ex: Kimchi"
                                        onChangeText={text => setNewIngredient(text)}
                                        onSubmitEditing={addIngredient}
                                        value={newIngredient}
                                    />
                                </View>
                                <View style={styles.ingredientsList}>
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

                                <View style={styles.recipesContainer}>
                                    <Text style={[styles.recipeHeading, isDarkMode && styles.darkText]}>How many recipes would you like?</Text>
                                    <View style={styles.bottomContainer}>
                                        <Pressable onPress={() => handleNumberPress(1)} style={[styles.recipeAdd, pressedButton === 1 && styles.filledButton]}>
                                            <Text style={[styles.buttonText, pressedButton === 1 && styles.filledButtonText]}>1</Text>
                                        </Pressable>
                                        <Pressable onPress={() => handleNumberPress(2)} style={[styles.recipeAdd, pressedButton === 2 && styles.filledButton]}>
                                            <Text style={[styles.buttonText, pressedButton === 2 && styles.filledButtonText]}>2</Text>
                                        </Pressable>
                                        <Pressable onPress={() => handleNumberPress(3)} style={[styles.recipeAdd, pressedButton === 3 && styles.filledButton]}>
                                            <Text style={[styles.buttonText, pressedButton === 3 && styles.filledButtonText]}>3</Text>
                                        </Pressable>
                                        <Pressable onPress={() => handleNumberPress(4)} style={[styles.recipeAdd, pressedButton === 4 && styles.filledButton]}>
                                            <Text style={[styles.buttonText, pressedButton === 4 && styles.filledButtonText]}>4</Text>
                                        </Pressable>

                                        <Pressable onPress={() => generateRecipes()} style={styles.next}>
                                            <Text style={styles.buttonTextNext}>Next</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </ScrollView>

                        </View>
                    )}
                </View>
            </Modal>
        </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        padding: 16,
        height: 1050
    },
    darkContainer: {
        backgroundColor: colors.offBlack
    },
    darkText: {
        color: colors.offWhite
    },
    heading: {
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 16,
        width: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
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
    add: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.asparagus,
        width: 54,
        height: 30,
        alignContent: 'center',
        justifyContent: 'center'
    },
    addTxt: {
        color: colors.asparagus,
        textAlign: 'center'
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
    rectangle: {
        marginTop: '5%',
        width: 200,
        height: 10,
        backgroundColor: 'black',
        borderRadius: 5
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
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: '65%',
        backgroundColor: colors.offWhite,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: colors.offBlack,
        elevation: 1,
    },
    modalHeading: {
        fontFamily: "Manrope-Bold",
        fontSize: 25,
        textAlign: 'center',
        marginTop: 100,
    },
    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '69%',
    },
    options: {
        flexDirection: 'row',
        columnGap: 50,
        marginTop: 50,
    },
    optionsTitle: {
        fontFamily: 'Manrope-Bold',
        fontSize: 18,
        textAlign: 'center',
    },
    option: {
        flexDirection: 'column',
        rowGap: 20,
    },
    optionIcon: {
        justifyContent: 'center',
        backgroundColor: colors.offWhite,
        borderColor: colors.offBlack,
        borderWidth: 5,
        borderRadius: 100,
        padding: 15,
        margin: 25,
    },
    loadingOverlay: {
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 600
    },
    back: {
        position: 'absolute',
        top: 30,
        left: -30,
    },
    addHeading: {
        fontFamily: "Manrope-Bold",
        fontSize: 16,
        marginTop: 60,
    },
    addInput: {
        width: '100%',
    },
    input: {
        height: 35,
        borderColor: colors.davysGray,
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 10,
        marginVertical: 15,
    },
    generate: {
        marginTop: 50,
        fontFamily: 'Manrope-Regular',
    },
    recipesContainer: {
        flexDirection: 'column',
    },
    recipeHeading: {
        fontFamily: "Manrope-Bold",
        fontSize: 16,
        marginVertical: '5%',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    numberButtonRow: {
        flexDirection: 'row',
    },
    recipeAdd: {
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.offWhite,
        borderColor: colors.asparagus,
        borderWidth: 1,
    },
    buttonText: {
        textAlign: 'center',
        color: colors.asparagus,
    },
    buttonTextNext: {
        color: colors.offWhite,
        textAlign: 'center',
    },
    next: {
        marginHorizontal: 5,
        width: '30%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.asparagus,
        borderColor: colors.asparagus,
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    filledButton: {
        backgroundColor: colors.asparagus,
    },
    filledButtonText: {
        color: colors.offWhite,
        textAlign: 'center',
        backgroundColor: colors.asparagus,
    },
    ingredientsList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        width: '90%',
        marginLeft: '5%'
    },
});
