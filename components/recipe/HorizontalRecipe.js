import { Box, VStack, Link, Heading, Image } from "@gluestack-ui/themed";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HorizontalRecipe({ navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Box
                maxWidth="$64"
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
                        w={333}
                        source={{
                            uri: "https://images.unsplash.com/photo-1549888834-3ec93abae044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
                        }}
                        resizeMode="cover"
                        alt="image"
                    />
                    <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 57, backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
                            <Text style={{ color: 'white', fontSize: 10, paddingHorizontal: 10 }}>
                                A thorough how-to guide to Chinese hot pot covering all aspects of preparing this iconic
                                meal at home....
                            </Text>
                        </View>
                    </View>
                </Box>
            </Box>
        </TouchableOpacity>

    );
}