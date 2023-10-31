import { Box, VStack, Link, Heading, Image } from "@gluestack-ui/themed";
import { StyleSheet, Text, View } from 'react-native';
import { colors } from "../../theme";

export default function VerticalRecipe({ img, name }) {
    const number = Math.random();

    let height;
    if (number < 0.5) {
        height = 230;
    } else {
        height = 195;
    }

    return (
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
                    h={height}
                    w={160}
                    source={img}
                    resizeMode="cover"
                    alt="image"
                />
                <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 57, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ color: colors.offWhite, marginLeft: 10, fontSize: 15, fontFamily: "Manrope-Bold" }}>{name}</Text>
                </View>
            </Box>
        </Box>
    );
}