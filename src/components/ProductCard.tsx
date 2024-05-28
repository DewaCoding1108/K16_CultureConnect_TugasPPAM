import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";

const CARD_WIDTH = Dimensions.get("window").width;

interface ProductCardProps {
  buttonPressHandler: any;
  name: string;
  description: string;
  price:number;
  imagelink: any;
}

const formatedPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, 
  }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({
  buttonPressHandler,
  name,
  description,
  imagelink,
  price,
}) => {
  return (
    <TouchableOpacity onPress={buttonPressHandler} style={styles.SeniCardContainer}>
      <ImageBackground
        source={imagelink}
        style={styles.CardImageBackground}
        borderTopLeftRadius={BORDERRADIUS.radius_15}
        borderTopRightRadius={BORDERRADIUS.radius_15}
      ></ImageBackground>
      <View style={styles.TextContainer}>
        <Text style={styles.TextHeader}>{name}</Text>
        <Text style={styles.TextParagraph}>{formatedPrice(price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  CardImageBackground: {
    width: CARD_WIDTH * 0.36,
    height: CARD_WIDTH * 0.2,
  },
  SeniCardContainer:{
    width: CARD_WIDTH * 0.36,
    height: CARD_WIDTH * 0.36,
    backgroundColor:COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_12,
    marginTop:SPACING.space_12,
    // marginLeft:SPACING.space_15,
    marginRight:SPACING.space_15,
    elevation:5,
    borderRadius:BORDERRADIUS.radius_15,
    shadowColor: COLORS.primaryBlackHex,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
    
  },
  TextHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
  TextParagraph: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryBlackHex,
  },
  TextContainer:{
    paddingTop:SPACING.space_10,
    paddingLeft:SPACING.space_10,
    paddingBottom:SPACING.space_10,
    paddingRight:SPACING.space_10,
  }
});