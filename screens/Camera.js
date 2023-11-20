import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { ImageManipulator } from 'expo-image-crop';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme';
import axios from 'axios';

async function ocrSpace(input, options = {}) {
    try {
        if (!input || typeof input !== 'string') {
            throw Error('Param input is required and must be of type string');
        }

        const {
            apiKey,
            ocrUrl,
            language,
            isOverlayRequired,
            filetype,
            detectOrientation,
            isCreateSearchablePdf,
            isSearchablePdfHideTextLayer,
            scale,
            isTable,
            OCREngine,
        } = options;

        const formData = new FormData();
        formData.append('base64Image', `data:image/png;base64,${input}`);
        formData.append('language', String(language || 'eng'));
        formData.append('isOverlayRequired', String(isOverlayRequired || 'false'));
        if (filetype) {
            formData.append('filetype', String(filetype));
        }
        formData.append('detectOrientation', String(detectOrientation || 'false'));
        formData.append('isCreateSearchablePdf', String(isCreateSearchablePdf || 'false'));
        formData.append('isSearchablePdfHideTextLayer', String(isSearchablePdfHideTextLayer || 'false'));
        formData.append('scale', String(scale || 'false'));
        formData.append('isTable', String(isTable || 'false'));
        formData.append('OCREngine', String(OCREngine || '1'));

        const response = await axios.post(ocrUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'apikey': apiKey,
            },
        });

        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export default function CameraAndCrop({ navigation }) {
    const [isVisible, setIsVisible] = useState(false);
    const [uri, setURI] = useState(null);
    const [pre, setPre] = useState(null);
    const [ocrResponse, setOcrResponse] = useState(null);
    const [aiResponse, setAiResponse] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const cameraRef = useRef();

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setURI(photo.uri);
            setIsVisible(true);
            navigation.navigate('Picture', { imageUri: photo.uri, width, height });
        }
    };

    const handleOCR = async (base64) => {
        try {
            if (!base64) {
                throw new Error('base64 is missing or invalid');
            }

            const options = {
                apiKey: 'K86472302488957',
                ocrUrl: 'https://api.ocr.space/parse/image',
            };

            const response = await ocrSpace(base64, options);
            console.log(response);
            setOcrResponse(response.ParsedResults[0].ParsedText);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ingResponse = await axios.post(
                    'https://lsswwzyavgt7egwvij52d2qkai0rseod.lambda-url.ca-central-1.on.aws/',
                    {
                        question: `Create an array of ingredients using the extracted ${ocrResponse} variable. Only include the names of food ingredients from the OCR response.`,
                    }
                );

                const ingredients = ingResponse.data.choices[0].message.content;
                console.log("the ingredients", ingredients);

                const response = await axios.post(
                    'https://lsswwzyavgt7egwvij52d2qkai0rseod.lambda-url.ca-central-1.on.aws/',
                    {
                        question: `Create a JSON format with an array of 2 meals using ${ingredients}. Each meal should have an "id", "name", "cuisine", "description", "mins", "cals", "ingredients," and "instructions."
                        `,
                        img: true
                    }
                );

                const recipes = response.data.choices[0].message.content;
                console.log("The recipes", recipes);
                setAiResponse(recipes);

                //store recipes to async storage
                //navigate to the recipe page
                //retrieve from async storage in the recipe page

            } catch (error) {
                console.error(error);
            }
        };

        if (ocrResponse !== null) {
            fetchData();
        }

    }, [ocrResponse]);

    useEffect(() => {
        const navigateToRecipe = async () => {
            if (aiResponse !== null) {
                navigation.navigate('Recipe', { aiResponse: aiResponse });
            }
        };

        navigateToRecipe();
    }, [aiResponse]);

    return (
        <View style={{ flex: 1 }}>
            {isVisible ? (
                <ImageManipulator
                    photo={{ uri }}
                    saveOptions={{ "base64": true }}
                    isVisible={isVisible}
                    onPictureChoosed={async ({ uri: uriM, base64 }) => {
                        setPre(uriM);
                        setIsVisible(false);
                        //console.log(base64);
                        setCroppedImage(base64);
                        await handleOCR(base64);
                    }}
                    onToggleModal={() => setIsVisible(!isVisible)}
                />
            ) : (
                <Camera
                    style={{ flex: 1 }}
                    type={Camera.Constants.Type.back}
                    ref={cameraRef}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -120 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Manrope-Bold' }}>Scan a Flier</Text>
                        <Pressable onPress={() => navigation.goBack()} style={styles.exit}>
                            <FontAwesome5
                                name={'times'}
                                size={20}
                                color={colors.offBlack}
                            />
                        </Pressable>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            marginBottom: 70,
                        }}
                    >
                        <Pressable onPress={takePicture} style={styles.capture}>
                            <FontAwesome5
                                name={'magic'}
                                size={25}
                                color={colors.offBlack}
                            />
                        </Pressable>
                    </View>
                </Camera>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 500,
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    capture: {
        backgroundColor: colors.offWhite,
        borderColor: colors.lightGrey,
        borderWidth: 5,
        borderRadius: 50,
        padding: 15,
    },
    exit: {
        backgroundColor: colors.offWhite,
        borderColor: colors.offBlack,
        borderWidth: 2,
        borderRadius: 50,
        paddingVertical: 7,
        paddingHorizontal: 10,
        position: 'absolute',
        right: 30,
    }
});