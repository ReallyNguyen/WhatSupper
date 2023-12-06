import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Modal, TextInput, Image, TouchableOpacity } from 'react-native';
import Back from '../components/button/Back';
import { colors } from '../theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useTheme } from '../ThemeContext'

export default function Confirmation({ navigation, route }) {
    const [aiIngredients, setAiIngredients] = useState(route.params?.aiIngredients);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [pressedButton, setPressedButton] = useState(null);
    const [uri, setUri] = useState(route.params?.uri);
    const [user, setUser] = useState(null);
    const { isDarkMode, toggleTheme } = useTheme();
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

    let parsedIngredients = null;

    try {
        parsedIngredients = JSON.parse(aiIngredients);
    } catch (error) {
        console.error('Error parsing aiIngredients:', error);
    }

    console.log(parsedIngredients);
    console.log("aiIngredients from params:", aiIngredients);
    console.log("image", uri)
    useEffect(() => {
        if (newIngredient.length > 0) {
            setShowNew(true);
        } else {
            setShowNew(false);
        }
    }, [newIngredient]);

    const addIngredient = () => {
        if (newIngredient.length > 0) {
            const updatedIngredientsList = [...ingredientsList, newIngredient];
            setIngredientsList(updatedIngredientsList);

            const updatedIngredients = [...parsedIngredients.ingredients, newIngredient];
            setAiIngredients(JSON.stringify({ ingredients: updatedIngredients }));

            setNewIngredient('');
        }
    };

    const generateRecipes = () => {
        navigation.navigate('Recipe', { aiIngredients: aiIngredients, selectedNumber: selectedNumber || 2 });
        setIsModalVisible(false);

    };

    const removeIngredient = (index) => {
        const updatedIngredients = [...parsedIngredients.ingredients];
        updatedIngredients.splice(index, 1);
        setAiIngredients(JSON.stringify({ ingredients: updatedIngredients }));
    };

    const handleNumberPress = (number) => {
        setSelectedNumber(number);
        setPressedButton(number);
        console.log(`Selected Number: ${number}`);
    };

    useEffect(() => {
        const stop = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => stop();
    }, []);

    useEffect(() => {
        const saveUri = async () => {
            try {
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const docRef = await addDoc(collection(db, 'scans'), {
                            uri: uri,
                            userId: user.uid,
                            timestamp: new Date().toLocaleTimeString()
                        });
                        console.log('Document ID:', docRef.id);
                    }
                }
            } catch (error) {
                console.error('Error adding document:', error);
            }
        };

        saveUri();

    }, [user, uri]);

    return (
        <ScrollView style={isDarkMode && styles.darkContainer}>
            <View style={[styles.container, isDarkMode && styles.darkContainer]}>
                <Text style={[styles.heading, isDarkMode && styles.darkText]}>Confirm your Scan 👀</Text>
                <View>
                    {uri && (
                        <View style={styles.imageContainer}>
                            <Text style={[{ fontSize: 18, fontFamily: 'Manrope-SemiBold' }, isDarkMode && styles.darkText]}>Flyer Scanned</Text>
                            <Text style={[{ width: '70%', fontSize: 14, fontFamily: 'Manrope-Medium' }, isDarkMode && styles.darkText]}>Click on the photo to see if you scanned your flyer clearly:</Text>
                            <TouchableOpacity onPress={() => setIsPhotoModalVisible(true)}>
                                <Image
                                    source={{ uri: uri }}
                                    style={styles.image}
                                    h={120}
                                    w={310}
                                    resizeMode="cover"
                                    alt="image"
                                />
                            </TouchableOpacity>

                        </View>
                    )}

                    <View style={styles.ingredientsContainer}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '70%', marginRight: '12%' }}>
                                <Text style={[{ fontSize: 18, fontFamily: 'Manrope-SemiBold' }, isDarkMode && styles.darkText]}>Ingredients</Text>
                                <Text style={[{ fontSize: 14, fontFamily: 'Manrope-Medium', marginBottom: '5%' }, isDarkMode && styles.darkText]}>Check the boxes to indicate which ingredients you want:</Text>
                            </View>
                            <Pressable style={styles.add} onPress={() => setIsModalVisible(true)}>
                                <Text style={styles.addTxt}>Add +</Text>
                            </Pressable>
                        </View>

                        {parsedIngredients !== null && parsedIngredients.ingredients && Array.isArray(parsedIngredients.ingredients) && parsedIngredients.ingredients.map((ingredient, i) => (
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
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50%', marginTop: '9%' }}>
                    <Pressable style={styles.rescanButton} onPress={() => navigation.navigate('Camera')}>
                        <Text style={[styles.rescan, isDarkMode && styles.darkText]}>← Rescan</Text>
                    </Pressable>
                    <Pressable style={styles.generateButton} onPress={() => navigation.navigate('Recipe', { aiIngredients: aiIngredients, autoGen: true })}>
                        <Text style={styles.generate}>Generate →</Text>
                    </Pressable>
                </View>

                <Modal
                    visible={isPhotoModalVisible}
                    transparent={true}
                >
                    <TouchableOpacity
                        style={styles.overlay}
                        activeOpacity={1}
                        onPress={() => setIsPhotoModalVisible(false)}
                    >
                        <Image
                            source={{ uri: uri }}
                            style={styles.enlargedPhoto}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </Modal>



                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={[styles.modalContainer, isDarkMode && styles.darkContainer]}>
                        <Pressable onPress={() => setIsModalVisible(false)}>
                            <Text style={[{ fontSize: 60 }, isDarkMode && styles.darkText]}>X</Text>
                        </Pressable>
                        {showCustomize ? null : (
                            <View style={styles.optionContainer}>
                                <Text style={[styles.modalHeading, isDarkMode && styles.darkText]}>What would you like to add?</Text>
                                <View style={styles.options}>
                                    <View style={styles.option}>
                                        <Pressable style={styles.optionIcon} onPress={() => navigation.goBack()}>
                                            <FontAwesome5
                                                name={'magic'}
                                                size={25}
                                                color={colors.offBlack}
                                            />
                                        </Pressable>
                                        <Text style={[styles.optionsTitle, isDarkMode && styles.darkText]}>Scan More Flyers?</Text>
                                    </View>
                                    <View style={styles.option}>
                                        <Pressable style={styles.optionIcon} onPress={() => { setShowCustomize(true) }}>
                                            <FontAwesome5
                                                name={'plus'}
                                                size={25}
                                                color={colors.offBlack}
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
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50,
        padding: 16,

    },
    darkText: {
        color: colors.offWhite
    },
    darkContainer: {
        backgroundColor: colors.offBlack
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 150,
        height: 230,
        borderRadius: 10,
        marginTop: 10,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'Manrope-Bold',
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 25,
        width: '80%',
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 20,
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
        width: 338,
        marginTop: 20,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.davysGray,
        padding: '5%',
    },
    imageContainer: {
        flexDirection: 'column',
        gap: 10,
        width: 338,
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.davysGray,
        padding: '5%',
    },
    ingredientsList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        width: '90%',
    },
    ingredientBox: {
        backgroundColor: colors.asparagus,
        padding: 10,
        borderRadius: 5,
    },
    generateButton: {
        backgroundColor: colors.olivine,
        height: 40,
        width: 107,
        borderRadius: 8,
        justifyContent: 'center'
    },
    rescanButton: {
        borderWidth: 1,
        alignContent: 'center',
        borderColor: colors.offBlack,
        height: 40,
        width: 107,
        borderRadius: 8,
        justifyContent: 'center'
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
        width: 54,
        height: 30,
        alignContent: 'center',
        justifyContent: 'center'
    },
    addTxt: {
        color: colors.asparagus,
        textAlign: 'center'
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
        flex: 1
    },
    modalHeading: {
        fontFamily: "Manrope-Bold",
        fontSize: 25,
        textAlign: 'center',
        marginTop: 65,
    },
    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '69%',
        heigth: '200%'
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
    generate: {
        fontFamily: 'Manrope-Regular',
        textAlign: 'center',
        color: colors.offWhite
    },
    rescan: {
        fontFamily: 'Manrope-Regular',
        textAlign: 'center'
    },
    recipesContainer: {
        flexDirection: 'column',
    },
    recipeHeading: {
        fontFamily: "Manrope-Bold",
        fontSize: 16,
        marginVertical: '5%'
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        borderWidth: 1
    },
    buttonText: {
        textAlign: 'center',
        color: colors.asparagus
    },
    buttonTextNext: {
        color: colors.offWhite,
        textAlign: 'center'
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
        backgroundColor: colors.asparagus
    },
    filledButtonText: {
        color: colors.offWhite,
        textAlign: 'center',
        backgroundColor: colors.asparagus
    },
    photoModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '80%',
    },
    enlargedPhoto: {
        width: '80%',
        height: '80%',
        borderRadius: 10,
    },
    closeModalButton: {
        fontSize: 30,
        color: 'white',
        marginBottom: 20,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black overlay
        justifyContent: 'center',
        alignItems: 'center',
    },


});