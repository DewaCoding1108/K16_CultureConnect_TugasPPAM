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
    location: string;
    type: string;
    price: number;
    imagelink: ImageProps;
  }
  
  const PesananCard: React.FC<PesananCardProps> = ({
    buttonPressHandler,
    name,
    location,
    type,
    price,
    imagelink,
  }) => {
    return (
      <TouchableOpacity style={styles.PesananCardContainer} >
        <ImageBackground
        source={imagelink}
        style={styles.CardImageBackground}
        borderRadius={BORDERRADIUS.radius_15}
        />
        <View >
            <Text style={styles.TextHeader }>{name}</Text>
            <Text style={styles.OtherText}>{location}</Text>
            <Text style={styles.PriceText}>{formatedPrice(price)}</Text>
        </View>
        <View >
            <Text style={[styles.OtherText, styles.MarginType]}>{type}</Text>
            <Icon name="trash" size={25} color="black" style={styles.MarginTrash}/>
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
    PesananCardContainer:{
        width: CARD_WIDTH * 0.9,
        backgroundColor:COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_12,
        marginTop:SPACING.space_12,
        marginLeft:SPACING.space_30,
        marginRight:SPACING.space_30,
        elevation:5,
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
        marginTop: SPACING.space_30,
        fontFamily: "Poppins-Regular",
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryBlackHex,
      },
      OtherText: {
        fontFamily: "Poppins-Light",
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryBlackHex,
      },
      PriceText:{
        marginTop: SPACING.space_12,
        fontFamily: "Poppins-Regular",
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryBlackHex,
      },
      MarginType:{
        marginTop:SPACING.space_12,
        marginBottom:SPACING.space_30,
        marginRight: SPACING.space_8,
      },
      MarginTrash:{
        marginTop:SPACING.space_32,
        marginLeft:SPACING.space_36,
      },
  });
  