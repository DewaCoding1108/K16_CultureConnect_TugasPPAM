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
  EnablebackHandler?: boolean;
  imagelink_portrait: ImageProps;
  clickHandler:any,
  value:string,
  onChangeText:any,
  editable?:boolean,
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnablebackHandler,
  imagelink_portrait,
  clickHandler,
  value,
  onChangeText,
  editable = true,
}) => {
  return (
    <ImageBackground
      source={imagelink_portrait}
      style={styles.ItemBackgroundImage}
    >
      <View style={styles.TextContainer}>
        <Text style={styles.TextHeader}>Tempat Inspirasi Tanpa Batas</Text>
        <Text style={styles.TextParagraph}>
          Berkontribusi terhadap budaya indonesia!
        </Text>
        <SearchBar clickHandler={clickHandler} onChangeText={onChangeText} value={value} editable={editable}/>
        {/* <TouchableOpacity onPress={() => {}} style={styles.InputContainerComponent}>
          <Ionicons
            style={styles.InputIcon}
            name={"search-sharp"}
            size={25}
            color={COLORS.primaryBlackHex}
          />
          <TextInput
          style={styles.TextInputContainer}
          placeholder="Search all you need!"
          />
        </TouchableOpacity> */}
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
    marginBottom:4,
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
});
