import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Modal, TextInput } from 'react-native';
import Back from '../components/button/Back';
import { colors } from '../theme';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Ingredients({ navigation, route }) {
    const [aiIngredients, setAiIngredients] = useState(route.params?.aiIngredients);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [ingredientsList, setIngredientsList] = useState([]);

    let parsedIngredients = null;

    try {
        parsedIngredients = JSON.parse(aiIngredients);
    } catch (error) {
        console.error('Error parsing aiIngredients:', error);
    }

    console.log(parsedIngredients);
    console.log("aiIngredients from params:", aiIngredients);

    useEffect(() => {
        if (newIngredient.length > 0) {
            setShowNew(true);
        } else {
            setShowNew(false);
        }
    }, [newIngredient]);

    const addIngredient = () => {
        if (newIngredient.length > 0) {
            setIngredientsList(prevList => [...prevList, newIngredient]);
            setNewIngredient('');
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Back navigation={navigation} />
                    <Pressable style={styles.add} onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.addTxt}>Add +</Text>
                    </Pressable>
                </View>
                <Text style={styles.heading}>Here are the ingredients based on what you scanned</Text>
                <View style={styles.ingredientsContainer}>
                    {parsedIngredients.ingredients && Array.isArray(parsedIngredients.ingredients) && parsedIngredients.ingredients.map((ingredient, i) => (
                        <View style={styles.ingredientBox} key={i}>
                            <Pressable style={styles.delete}>
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
                <Pressable onPress={() => navigation.navigate('Recipe', { aiIngredients: aiIngredients })}>
                    <Text style={styles.generate}>Generate Recipes</Text>
                </Pressable>
                <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer}>
                        <Pressable onPress={() => setIsModalVisible(false)}>
                            <Text>_______________</Text>
                        </Pressable>
                        {showCustomize ? null : (
                            <View style={styles.optionContainer}>
                                <Text style={styles.modalHeading}>What would you like to add?</Text>
                                <View style={styles.options}>
                                    <View style={styles.option}>
                                        <Pressable style={styles.optionIcon} onPress={() => navigation.goBack()}>
                                            <FontAwesome5
                                                name={'magic'}
                                                size={25}
                                                color={colors.offBlack}
                                            />
                                        </Pressable>
                                        <Text style={styles.optionsTitle}>Scan More Flyers?</Text>
                                    </View>
                                    <View style={styles.option}>
                                        <Pressable style={styles.optionIcon} onPress={() => { setShowCustomize(true) }}>
                                            <FontAwesome5
                                                name={'plus'}
                                                size={25}
                                                color={colors.offBlack}
                                            />
                                        </Pressable>
                                        <Text style={styles.optionsTitle}>Add Ingredients</Text>
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
                                <Text style={styles.modalHeading}>Personalize Recipes to Your Taste ⏲️</Text>
                                <View style={styles.addInput}>
                                    <Text style={styles.addHeading}>Add Ingredient(s):</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Type in an ingredient.. Ex: Kimchi"
                                        onChangeText={text => setNewIngredient(text)}
                                        onSubmitEditing={addIngredient}
                                        value={newIngredient}
                                    />
                                </View>
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
                                <Pressable style={styles.next}>
                                    <Text style={{ color: colors.offWhite }}>Next</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    header: {
        flexDirection: 'row',
        width: '80%',
        marginBottom: 20,
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
    add: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.asparagus,
        paddingVertical: 7,
        paddingHorizontal: 5
    },
    addTxt: {
        color: colors.asparagus,
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
        elevation: 1
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
        width: '65%'
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
    next: {
        backgroundColor: colors.asparagus,
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: -80,
        right: 0,
    },
    generate: {
        marginTop: 50,
        fontFamily: 'Manrope-Regular',
    }
});
