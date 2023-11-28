import React from 'react';
import { Box, Image } from "@gluestack-ui/themed";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HorizontalRecipe({ navigation, title, imageUrl, mins, cuisine, description, info, }) {
    return (
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
                    h={140}
                    w={310}
                    source={{
                        uri: imageUrl
                    }}
                    resizeMode="cover"
                    alt="image"
                />
                <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ display: 'flex', flexDirection: 'column', height: '90%' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: "bold", width: '60%' }}>{title}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 5, marginRight: 5 }}>
                                    <Text style={{ color: 'white', fontSize: 10 }}>{mins} mins</Text>
                                </View>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 5, marginRight: 5 }}>
                                    <Text style={{ color: 'white', fontSize: 10 }}>{cuisine}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{ color: 'white', fontSize: 10, paddingHorizontal: 10, marginTop: 10 }}>
                            {description}
                        </Text>
                    </View>
                </View>
            </Box>
        </Box>
    );
}
