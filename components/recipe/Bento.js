import { StyleSheet, Text, View } from 'react-native';
import { Box, Image } from "@gluestack-ui/themed";
import { colors } from "../../theme";

export default function Bento() {
    return(
        <View>
            <View style={styles.text}>
                <Text style={styles.category}>Asian</Text>
                <Text style={styles.see}>See all</Text>
            </View>
            <View style={styles.container}>
                <Image style={styles.large} source={require('../../assets/recipes/kfchicken.jpeg')} alt="image"/>
                <View style={styles.column}>
                    <Image style={styles.small} source={require('../../assets/recipes/friedrice.jpeg')} alt="image"/>
                    <Box style={{ position: 'relative' }}>
                        <Image
                            style={styles.small}
                            source={require('../../assets/recipes/hotpot.jpg')}
                            resizeMode="cover"
                            alt="image"
                        />
                        <View style={styles.box}>
                            <Text style={styles.more}>15+ recipes</Text>
                        </View>
                    </Box>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
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
    see:{
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
    box:{
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
    }
});