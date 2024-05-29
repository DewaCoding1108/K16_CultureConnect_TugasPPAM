import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from '../components/HeaderBar'
import PesananCard from '../components/PesananCard'
import { StatusBar } from "expo-status-bar";
import ChartButton from '../components/ChartButton';
import { COLORS, SPACING,FONTSIZE,FONTFAMILY } from '../theme/theme';


const PaymentDetailsScreen = ({navigation,route}:any) => {
    const { Chart=[], TotalPrice=0 } = route.params ||{};
    console.log(Chart);
    console.log(TotalPrice)
  return (
    <View style={styles.ScreenContainer}>
        <HeaderBar title="Payment Details" description="Bayar dengan mudah dan aman! Cek kembali detail pembayaran Anda"/>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.Border}>
            {Chart.map((doc, index) => (
                <>
                    <View style={styles.Container}>
                        <Text style={styles.Font1}>{doc.data.name}</Text>
                        <Text style={styles.Font2}>{doc.data.category}</Text>
                    </View>
                    <View style={styles.horizontalLine} /> 
                    <View style={styles.Container}>
                        <Text style={styles.Font3}>harga</Text>
                        <Text style={styles.Font3}>{formatedPrice(doc.data.price)}</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                </>
            ))}
            <View style={styles.Container}>
                <Text style={styles.Font4}>Total Harga</Text>
                <Text style={styles.Font3}>{TotalPrice}</Text>
            </View>
        </View>
    </View>
  )
}

export default PaymentDetailsScreen

const formatedPrice = (price: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0, 
        }).format(price);
    };
    const tableWidth =  Dimensions.get("window").width
const styles = StyleSheet.create({
    ScreenContainer:{
        flex:1,
        backgroundColor:COLORS.primaryWhiteHex,
      },
    Border:{
        width : 0.9 * tableWidth,
        borderRadius: 15,
        borderWidth:0.5,
        borderColor:"#A19C9C",
        alignSelf:"center",
        padding:SPACING.space_12,
    },
    horizontalLine: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#A19C9C", 
        marginVertical: SPACING.space_10, 
      },
    Container:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    Font1:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
    },
    Font2:{
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_18,
    },
    Font3:{
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_14,
    },
    Font4:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_18,
    },
    
})