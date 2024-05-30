import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from '../components/HeaderBar'
import PesananCard from '../components/PesananCard'
import { StatusBar } from "expo-status-bar";
import ChartButton from '../components/ChartButton';
import { COLORS, SPACING,FONTSIZE,FONTFAMILY } from '../theme/theme';
import BackButton from '../components/BackButton';
import AppButton from '../components/AppButton';


const PaymentDetailsScreen = ({navigation,route}:any) => {
    const { Chart=[], TotalPrice=0,fromChart=false} = route.params ||{};
    console.log(Chart);
    console.log(TotalPrice)
  return (
    <View style={styles.ScreenContainer}>
        <HeaderBar title="Payment Details" description="Bayar dengan mudah dan aman! Cek kembali detail pembayaran Anda"/>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.Border}>
            {Chart.map((doc:any, index=0) => (
                <View key={index+1}>
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
                </View>
            ))}
            <View style={styles.Container}>
                <Text style={styles.Font4}>Biaya administrasi</Text>
                <Text style={styles.Font3}>{formatedPrice(0.1*TotalPrice)}</Text>
            </View>
            <View style={styles.Container}>
                <Text style={styles.Font4}>Total Harga</Text>
                <Text style={styles.Font3}>{formatedPrice(1.1*TotalPrice)}</Text>
            </View>
        </View>
        <View style={styles.ButtonContainer}>
            <AppButton title="Bayar" backgroundColor={COLORS.primaryRedHex} textColor={COLORS.primaryWhiteHex} onPress={()=>{navigation.push('Paymentmethod',{Chart:Chart ,fromChart:fromChart, TotalPrice: TotalPrice})}} buttonStyle={{marginTop:20, borderRadius:30, width:0.9*tableWidth}}/>
            <Text style={styles.Text}>Pastikan data di atas sudah benar dan sesuai</Text>
            <View style={styles.Box}/>
        </View>
    </View>
  )
}

export default PaymentDetailsScreen;

const formatedPrice = (price: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0, 
        }).format(price);
    };
    const tableWidth =  Dimensions.get("window").width;

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
        fontSize: FONTSIZE.size_16,
    },
    Font2:{
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_14,
    },
    Font3:{
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_12,
    },
    Font4:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
    },
    ButtonContainer: {
        width: tableWidth,
        bottom: 0,
        position:"absolute",
        backgroundColor: COLORS.primaryWhiteHex,
        elevation: 5,
        shadowColor: COLORS.primaryBlackHex,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1
        },
        borderRadius: 15,
        alignItems:"center",
    },    
    Text:{
        alignSelf:"center",
        fontSize:FONTSIZE.size_12,
        fontFamily: FONTFAMILY.poppins_light,
    },
    Box:{
        height:40,
    }
})