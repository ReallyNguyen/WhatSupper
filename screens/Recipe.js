import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Box, VStack, Link, Heading, Image } from "@gluestack-ui/themed";

export default function Recipe({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Here are some recipes based on what you scanned 🪄</Text>
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
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 16,
        width: 300
    },
});
