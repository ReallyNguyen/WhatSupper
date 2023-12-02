import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Box, Image } from "@gluestack-ui/themed";
import { colors } from "../../theme";
import { useTheme } from '../../ThemeContext'

export default function Bento({ navigation, destination1, destination2, destination3, cuisine, img1, img2, img3 }) {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <View>
            <View style={styles.text}>
                <Text style={[styles.category, isDarkMode && styles.darkText]}>{cuisine}</Text>
                <Text style={styles.see}>See all</Text>
            </View>
            <View style={styles.container}>
                <Pressable onPress={() => navigation.navigate(destination1)}>
                    <Image style={styles.large} source={img1} alt="image" />
                </Pressable>
                <View style={styles.column}>
                    <Pressable onPress={() => navigation.navigate(destination2)}>
                        <Image style={styles.small} source={img2} alt="image" />
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate(destination3)}>
                        <Box style={{ position: 'relative' }}>
                            <Image
                                style={styles.small}
                                source={img3}
                                resizeMode="cover"
                                alt="image"
                            />
                            <View style={styles.box}>
                                <Text style={styles.more}>15+ recipes</Text>
                            </View>
                        </Box>
                    </Pressable>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 50,
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    category: {
        fontFamily: "Manrope-Bold",
        fontSize: 18,
    },
    see: {
        color: colors.asparagus,
        fontFamily: "Manrope-Bold",
    },
    large: {
        width: 170,
        height: 170,
        borderRadius: 15,
    },
    column: {
        gap: 10,
    },
    small: {
        width: 130,
        height: 80,
        borderRadius: 15,
    },
    box: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        borderRadius: 15,
    },
    more: {
        color: colors.offWhite,
        marginLeft: 15,
        fontSize: 18,
        fontFamily: "Manrope-Bold"
    },
    darkText: {
        color: colors.offWhite
    }
});