import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import Back from '../components/button/Back';
import { colors } from '../theme';
import { useTheme } from '../ThemeContext'

export default function CouponInfo({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.header}>
                <Back navigation={navigation} destination="Home" />
            </View>
            <Image style={styles.logo} source={require('../assets/coupon/walmartlight.png')} />
            <Text style={styles.discount}>30% off</Text>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={[styles.brand, isDarkMode && styles.darkText]}>Walmart</Text>
                    <Text style={[styles.exp, isDarkMode && styles.darkText]}>Valid Oct 24-31, 2023</Text>
                    <Text style={[styles.desc, isDarkMode && styles.darkText]}>On all select Great Value brands. While supplies last. </Text>
                </View>
                <Image style={styles.qr} source={require('../assets/coupon/qrcode.png')} />
            </View>
            <Text style={styles.code}>VR6SY7W</Text>
            <Image style={styles.bar} source={require('../assets/coupon/barcode.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    darkContainer: {
        backgroundColor: colors.offBlack,

    },
    darkText: {
        color: colors.offWhite
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        marginLeft: '10%',
        marginTop: '15%'
    },
    logo: {
        width: 300,
        height: 100,
        marginTop: '40%',
        tintColor: colors.offWhite
    },
    discount: {
        fontSize: 30,
        fontFamily: 'Manrope-Bold',
        color: colors.discount,
    },
    infoContainer: {
        flexDirection: 'row',
        marginVertical: 50,
    },
    brand: {
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
    },
    exp: {
        fontFamily: 'Manrope-Bold',
        paddingVertical: 10,
    },
    desc: {
        fontFamily: 'Manrope-Regular',
        width: 200,
    },
    qr: {
        width: 75,
        height: 75,
    },
    code: {
        color: colors.offWhite,
        backgroundColor: colors.olivine,
        fontSize: 24,
        paddingVertical: 10,
        paddingHorizontal: 80,
        marginBottom: 20,
        borderRadius: 20,
        elevation: 2,
        overflow: 'hidden'
    },
    bar: {
        width: 300,
        height: 75,
        marginTop: "20%"
    }
});
