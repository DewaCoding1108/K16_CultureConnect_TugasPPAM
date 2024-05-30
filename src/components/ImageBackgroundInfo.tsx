import {
  StyleSheet,
  Text,
  View,
  ImageProps,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

interface ImageBackgroundInfoProps {
  enablebackHandler?: boolean;
  backHandler?:any;
  enableSearch?:boolean;
  enableText?:boolean;
  imagelink_portrait: any;
  clickHandler?:any,
  value?:string,
  onChangeText?:any,
  editable?:boolean,
  imageStyle?:any,
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  enablebackHandler = false,
  backHandler = () => {},
  enableSearch = false,
  enableText = false,
  imagelink_portrait,
  clickHandler,
  value,
  onChangeText,
  editable = true,
  imageStyle = {},
}) => {
  return (
    <ImageBackground
      source={imagelink_portrait}
      style={[styles.ItemBackgroundImage,imageStyle]}
    >
        {
          enablebackHandler ?
          <>
            <TouchableOpacity onPress={backHandler}style={styles.BackButtonContainer} activeOpacity={0.7}>
              <Ionicons style={{marginVertical:SPACING.space_10,marginHorizontal:SPACING.space_10}}name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          </>
          :
          <></>
        }
      <View style={styles.TextContainer}>
        {
          enableText ?
          <> 
            <Text style={styles.TextHeader}>Tempat Inspirasi Tanpa Batas</Text>
            <Text style={styles.TextParagraph}>
              Berkontribusi terhadap budaya indonesia!
            </Text>
          </>
          : <></>
        }
        {
          enableSearch ? <SearchBar clickHandler={clickHandler} onChangeText={onChangeText} value={value || ''} editable={editable}/>
          : <></>
        }
      </View>
    </ImageBackground>
  );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  ItemBackgroundImage: {
    width: "100%",
    aspectRatio: 35 / 25,
    justifyContent: "space-between",
    shadowColor: COLORS.primaryWhiteHex,
    // marginBottom:4,
  },
  TextContainer: {
    flex:1,
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: SPACING.space_18,
  },
  TextHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_30,
    color: COLORS.primaryWhiteHex,
  },
  TextParagraph: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  InputContainerComponent: {
    padding:5,
    width:'95%',
    marginTop: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.primaryWhiteHex,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems:'center',
  },
  InputIcon: {
    marginTop:SPACING.space_2,
    marginLeft:SPACING.space_10,
    marginRight:SPACING.space_10,
  },
  TextInputContainer: {
    width:'100%',
    fontFamily:'Poppins-Medium',
    fontSize:FONTSIZE.size_12,
  },
  BackButtonContainer:{
    height:45,
    width:45,
    marginHorizontal:SPACING.space_16,
    marginVertical:SPACING.space_24,
    borderRadius:BORDERRADIUS.radius_20,
    backgroundColor:COLORS.primaryWhiteHex,
  },
});
