import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import VerticalRecipe from '../components/recipe/VerticalRecipe';
import { recipe } from '../data/recipe';

export default function RecipeCategory({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.name}>Asian</Text>
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
    img: {
        width: 100,
        height: 100,
    },
    name: {
        fontFamily: "Manrope-Bold",
        fontSize: 19,
        marginTop: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 50
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: -20,
        paddingBottom: 50,
        height: 1000,
    }
});