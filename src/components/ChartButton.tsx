import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import React from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";

interface ChartButtonProps {
    onPress?: any,
    price: number,
}

const BUTTON_WIDTH = Dimensions.get("window").width;

const ChartButton: React.FC<ChartButtonProps> = ({onPress, price})=> (
    <TouchableOpacity style={styles.ButtonContainer}>
        <Text style={styles.Text}>Pembayaran</Text>
        <Text style={styles.PriceText}>{formatedPrice(price)}</Text>
    </TouchableOpacity>
);

export default ChartButton;

const formatedPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, 
    }).format(price);
};

const styles = StyleSheet.create({
    ButtonContainer:{
        width:0.65 * BUTTON_WIDTH,
        backgroundColor: "#AE1E1E",
        borderRadius: 30,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    Text:{
        marginHorizontal: SPACING.space_12,
        marginVertical: SPACING.space_16,
        fontFamily: "Poppins-Medium",
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },
    PriceText:{
        marginHorizontal: SPACING.space_12,
        marginVertical: SPACING.space_16,
        fontFamily: "Poppins-Regular",
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
        alignContent: "flex-end"
      },
});