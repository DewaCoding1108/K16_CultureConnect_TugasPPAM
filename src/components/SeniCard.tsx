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

interface SeniCardProps {
  buttonPressHandler: any;
  name: string;
  description: string;
  imagelink: any;
}

const SeniCard: React.FC<SeniCardProps> = ({
  buttonPressHandler,
  name,
  description,
  imagelink,
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
        <Text style={styles.TextParagraph}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SeniCard;

const styles = StyleSheet.create({
  CardImageBackground: {
    width: CARD_WIDTH * 0.9,
    height: CARD_WIDTH * 0.36,
  },
  SeniCardContainer:{
    width: CARD_WIDTH * 0.9,
    backgroundColor:COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_12,
    marginTop:SPACING.space_12,
    marginLeft:SPACING.space_18,
    marginRight:SPACING.space_18,
    elevation:12,
    shadowColor: COLORS.primaryBlackHex,
    shadowOpacity: 0.2,
    shadowRadius: 9,
    shadowOffset: {
      height: 2,
      width: 2
    },
    borderRadius:BORDERRADIUS.radius_15,
  },
  TextHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_20,
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
