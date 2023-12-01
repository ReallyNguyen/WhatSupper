import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import VerticalRecipe from '../components/recipe/VerticalRecipe';
import { recipe } from '../data/recipe';
import Back from '../components/button/Back';
import { useTheme } from '../ThemeContext'
import { colors } from '../theme';

export default function RecipeCategory({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.header}>
                <Back navigation={navigation} destination="Home" />
            </View>
            <Text style={[styles.name, isDarkMode && styles.darkText]}>Asian</Text>
            <View style={styles.tabPanels}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {recipe.map((item) => (
                        <TouchableOpacity onPress={() => navigation.navigate('RecipeInfo')} key={item.id}>
                            <VerticalRecipe
                                img={item.img}
                                name={item.name}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        marginLeft: '7%',
        marginTop: '7%',
    },
    img: {
        width: 100,
        height: 100,
    },
    name: {
        fontFamily: "Manrope-Bold",
        fontSize: 19,
        marginTop: 50,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: -20,
        paddingBottom: 50,
        height: 1000,
    },
    darkContainer: {
        backgroundColor: colors.offBlack
    },
    tabPanels: {
        marginTop: '5%'
    },
    darkText: {
        color: colors.offWhite
    }
});