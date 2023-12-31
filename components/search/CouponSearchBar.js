import { StyleSheet, TextInput, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../theme';
import { useTheme } from '../../ThemeContext'

export default function CouponSearchBar({ setCouponSearch }) {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <View style={styles.search}>
            <FontAwesomeIcon
                name={'search'}
                style={styles.searchIcon}
                size={20}
                color={colors.davysGray}
            />
            <TextInput
                style={styles.input}
                placeholder="Find a Coupon.."
                onChangeText={setCouponSearch}
                placeholderTextColor={isDarkMode && colors.offWhite}
            />
            <FontAwesomeIcon
                name={'sliders'}
                style={styles.sliders}
                size={20}
                color={colors.davysGray}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    input: {
        height: 35,
        width: "74%",
        borderColor: colors.davysGray,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 50,
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
    },
    sliders: {
        borderColor: colors.davysGray,
        borderWidth: 1,
        borderRadius: 10,
        padding: 6,
    }
})