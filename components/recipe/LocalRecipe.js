import React, { useState } from 'react';
import { Box, Image, Text, View, TouchableOpacity } from "@gluestack-ui/themed";
import { StyleSheet } from 'react-native';
import { colors } from "../../theme";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function LocalRecipe({ img, name, ingredients, price }) {
    const number = Math.random();
    let height;

    if (number < 0.5) {
        height = 230;
    } else {
        height = 195;
    }

    const [isFavourite, setFavourite] = useState(false);

    const handleFavouritePress = () => {
        setFavourite(!isFavourite);
    };

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
            <Box style={styles.container}>
                <Image
                    style={styles.image}
                    source={img}
                    resizeMode="cover"
                    alt="image"
                />

                <View style={{ position: 'absolute', top: 10, right: 10 }}>

                    <FontAwesomeIcon
                        name={isFavourite ? 'heart' : 'heart-o'}
                        style={{
                            fontSize: 24,
                            color: 'white',
                        }}
                    />

                </View>



                <View style={styles.overlay}>
                    <View style={styles.textContainer}>
                        <Text style={styles.mealText}>{name}</Text>
                        <Text style={styles.ingredientsText}>{ingredients}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceText}>
                                {price}
                            </Text>
                        </View>
                    </View>

                </View>
            </Box>
        </Box>

    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        height: 191,
        width: 160,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 90,
        backgroundColor: colors.offWhite,
        display: 'flex',
        justifyContent: 'center',
    },
    textContainer: {
        marginLeft: '5%',
    },
    mealText: {
        color: colors.offBlack,
        marginLeft: 10,
        fontSize: 12,
        fontFamily: 'Manrope-Bold',
    },
    ingredientsText: {
        color: colors.offBlack,
        marginLeft: 10,
        fontSize: 10,
        fontFamily: 'Manrope-SemiBold',
    },
    priceContainer: {
        backgroundColor: colors.lightGrey,
        width: 80,
        height: 20,
        marginLeft: 10,
        borderRadius: 6,
        justifyContent: 'center'
    },
    priceText: {
        color: colors.offBlack,
        marginLeft: 10,
        fontSize: 10,
        borderRadius: 50,
        elevation: 5,
        fontFamily: 'Manrope-SemiBold',
    },
});
