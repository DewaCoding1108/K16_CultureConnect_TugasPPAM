import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import SeniCard from './SeniCard';

const CARD_WIDTH = Dimensions.get("window").width;

interface CategoryCardProps {
  productCard?:boolean;
  buttonPressHandler: any;
  location?:string;
  provider?:string;
  name: string;
  description: string;
  imagelink: any;
  tipe:string;
  loadImageHandler?:any;
  price?:any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  buttonPressHandler,
  productCard = false,
  location,
  name,
  provider,
  description,
  tipe,
  imagelink,
  price,
  loadImageHandler = ()=>{}}) => {
  return (
    <View style={styles.SeniCardContainer}>
      <TouchableOpacity onPress={buttonPressHandler} style={{flexDirection:'row'}}>
        <ImageBackground
          source={imagelink}
          style={styles.CardImageBackground}
          borderRadius={BORDERRADIUS.radius_15}
          onLoad={loadImageHandler}
        ></ImageBackground>
        <View style={styles.TextContainer}>
          <Text style={[styles.TextLocation,{alignSelf:'flex-end', marginTop:SPACING.space_2, marginBottom:SPACING.space_4}]}>{tipe}</Text>
          <Text style={styles.TextHeader}>{name}</Text>
          {
            !productCard && <Text style={styles.TextLocation}>{location}</Text>
          }
          
          {
            productCard && 
            <>
              <Text style={styles.TextLocation}>{provider}</Text>
              <Text style={[styles.TextLocation,{alignSelf:'flex-end', marginTop:SPACING.space_24, marginRight:SPACING.space_2}]}>{price}</Text>
            </>
          }
          
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
  CardImageBackground: {
    width: CARD_WIDTH * 0.36,
    height: CARD_WIDTH * 0.40,
    margin:SPACING.space_4,
  },
  SeniCardContainer:{
    width: CARD_WIDTH * 0.9,
    backgroundColor:COLORS.primaryWhiteHex,
    marginHorizontal:SPACING.space_18,
    marginVertical:SPACING.space_12,
    elevation:5,
    borderRadius:BORDERRADIUS.radius_20,
    shadowColor: COLORS.primaryBlackHex,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
  },
  TextHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
  },
  TextParagraph: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryBlackHex,
  },
  TextContainer:{
    flex:1,
    paddingVertical:SPACING.space_10,
    paddingLeft:SPACING.space_4,
    paddingRight:SPACING.space_10
  },
  TextLocation:{
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryBlackHex,
  }
})