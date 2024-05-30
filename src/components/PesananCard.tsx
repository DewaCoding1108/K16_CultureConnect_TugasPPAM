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
import Icon from 'react-native-vector-icons/FontAwesome';

const CARD_WIDTH = Dimensions.get("window").width;

interface PesananCardProps {
  buttonPressHandler: any;
  name: string;
  detail: string;
  type: string;
  price: number;
  imageURL: string; 
  handlerDelete : (name: string) => void,
  Chart: boolean;
}

const PesananCard: React.FC<PesananCardProps> = ({
  buttonPressHandler,
  name,
  detail,
  type,
  price,
  imageURL,
  handlerDelete,
  Chart,
}) => {
  return (
    <TouchableOpacity style={styles.PesananCardContainer} >
      <View style={styles.Container}>
        <ImageBackground
          source={{ uri: imageURL }}
          style={styles.CardImageBackground}
          borderRadius={BORDERRADIUS.radius_15}
        />
        <View style={styles.Container2}>
          <Text style={[styles.OtherText, styles.MarginType]}>{type}</Text>
          <Text style={styles.TextHeader}>{name}</Text>
          <Text style={styles.OtherText}>{detail}</Text>
          <View style={styles.Container3}>
            <Text style={styles.PriceText}>{formatedPrice(price)}</Text>
            {Chart ? (
              <TouchableOpacity onPress={() => handlerDelete(name)}>
              <Icon name="trash" size={25} color="black" style={styles.MarginTrash} />
            </TouchableOpacity>): null
            }
            
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PesananCard;

const formatedPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    width: "100%",
  },
  PesananCardContainer: {
    width: CARD_WIDTH * 0.9,
    backgroundColor: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_12,
    marginTop: SPACING.space_12,
    marginLeft: SPACING.space_30,
    marginRight: SPACING.space_30,
    elevation: 5,
    shadowColor: COLORS.primaryBlackHex,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  CardImageBackground: {
    width: CARD_WIDTH * 0.3,
    height: CARD_WIDTH * 0.3,
    margin: SPACING.space_4,
  },
  TextHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryBlackHex,
  },
  OtherText: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryBlackHex,
  },
  PriceText: {
    marginTop: SPACING.space_8,
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryBlackHex,
  },
  MarginType: {
    marginTop: SPACING.space_10,
    alignSelf: "flex-end",
  },
  MarginTrash: {
    marginLeft: SPACING.space_36,
  },
  Container2: {
    width: CARD_WIDTH * 0.55,
  },
  Container3: {
    marginTop: SPACING.space_12,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
