import React, { useState, useRef } from 'react';
import { View, Text, Button, Image, Pressable, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import { ImageManipulator } from 'expo-image-crop';
import Recipe from '../screens/Recipe'
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme';

export default function CameraAndCrop({ navigation }) {
    const [isVisible, setIsVisible] = useState(false);
    const [uri, setURI] = useState(null);
    const [pre, setPre] = useState(null);
    const cameraRef = useRef();

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setURI(photo.uri);
            setIsVisible(true);
            navigation.navigate('Picture', { imageUri: photo.uri, width, height });
        }
    };

    // Define a state variable to track whether the image is cropped
    const [imageCropped, setImageCropped] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            {isVisible ? (
                <ImageManipulator
                    photo={{ uri }}
                    saveOptions={{ "base64": true }}
                    isVisible={isVisible}
                    onPictureChoosed={({ uri: uriM, base64 }) => {
                        setPre(uriM);
                        setIsVisible(false);
                        console.log(base64);
                        // Set imageCropped to true when the image is cropped
                        setImageCropped(true);
                        // Do something with the base64 variable
                        setModalVisible(true);
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </Pressable>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RecipeInfo')}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Recipe />
                    </TouchableOpacity>


                </View>
            </Modal>
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