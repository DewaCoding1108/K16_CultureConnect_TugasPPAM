import {
    Dimensions,
    ImageBackground,
    ImageProps,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
  } from "react-native";
  import React from "react";
  import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
  
  const CARD_WIDTH = Dimensions.get("window").width;
  
  interface PesananCardProps {
    buttonPressHandler: any;
    name: string;
    location: string;
    type: string;
    price: number;
    imagelink: string;
    screen: string;
    handleSecButton?: any;
  }
  
  const PesananCard: React.FC<PesananCardProps> = ({
    buttonPressHandler,
    name,
    location,
    type,
    price,
    imagelink,
    screen = "",
    handleSecButton,
  }) => {

    return (
      <TouchableOpacity style={styles.PesananCardContainer}>
        <ImageBackground
        source={{uri:imagelink}}
        style={styles.CardImageBackground}
        borderRadius={20}
        />
        <View style={styles.TextContainer} >
            <Text style={[styles.OtherText, styles.MarginType]}>{type}</Text>
            <Text style={styles.TextHeader }>{name}</Text>
            {screen != "brand" ?
            <Text style={styles.OtherText}>{location}</Text>
            :
            <></>
            }
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginVertical:14, marginRight:18}}>
              {screen == "brand" ?
              <Text style={styles.PriceText}>{location}</Text>
              :
              <Text style={styles.PriceText}>{formatedPrice(price)}</Text>
              }
              <View style={{flexDirection:"row", gap:24, alignItems:"center"}}>
              {screen == "brand" || screen == "product" ?
              <Pressable>
                <SimpleLineIcons name="pencil" size={20} color="black" />
              </Pressable>
              :
              <></>
              }
              <Pressable onPress={handleSecButton}>
              {screen == "liked" ? 
              <AntDesign name= "heart" size={25} color= {COLORS.primaryRedHex} /> :
              screen != "history" ?
              <Icon name="trash-o" size={25} color="black" />
              : <></>
              }
              </Pressable>
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
    Container:{
      flexDirection:"row",
      width:"100%",
    },
    PesananCardContainer:{
        backgroundColor:COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_12,
        marginTop:SPACING.space_12,
        elevation:12,
        shadowColor: COLORS.primaryBlackHex,
        shadowOpacity: 0.2,
        shadowRadius: 9,
        shadowOffset: {
          height: 2,
          width: 2
        },
        borderRadius: 20,
        flexDirection: "row",
      },
      CardImageBackground: {
        width: CARD_WIDTH * 0.3,
        minHeight: CARD_WIDTH * 0.3,
        margin: SPACING.space_4,
        marginRight: SPACING.space_8,
      },
      TextContainer: {
        flex:1,
        flexDirection: "column",
        justifyContent: "flex-start"
      },
      TextHeader: {
        fontFamily: "Poppins-Regular",
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryBlackHex,
      },
      OtherText: {
        fontFamily: "Poppins-ExtraLight",
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryBlackHex,
      },

      PriceText:{
        
        fontFamily: "Poppins-Regular",
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryBlackHex,
      },
      MarginType:{
        marginTop: 12,
        marginHorizontal: 18,
        marginLeft:"auto",
      },
      Container2:{
        width: CARD_WIDTH * 0.55,
      },
      Container3:{
        marginTop:SPACING.space_12 ,
        flexDirection:"row",  
        justifyContent:"space-between"
      }
  });
  
