import React, { useState, useRef } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { ImageManipulator } from 'expo-image-crop';

export default function CameraAndCrop() {
    const [isVisible, setIsVisible] = useState(false);
    const [uri, setURI] = useState(null);
    const [pre, setPre] = useState(null);
    const cameraRef = useRef();

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setURI(photo.uri);
            setIsVisible(true);
        }
    };

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
                        //do something with the base64 variable
                    }}
                    onToggleModal={() => setIsVisible(!isVisible)}
                />
            ) : (
                <Camera
                    style={{ flex: 1 }}
                    type={Camera.Constants.Type.back}
                    ref={cameraRef}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            marginBottom: 20,
                        }}
                    >
                        <Button title="Capture" onPress={takePicture} />
                    </View>
                </Camera>
            )}

            {pre && <Image source={{ uri: pre }} style={{ width: 200, height: 200, resizeMode: "contain" }} />}
        </View>
    );
}
