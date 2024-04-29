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

interface ImageBackgroundInfoProps {
  EnablebackHandler?: boolean;
  imagelink_portrait: ImageProps;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnablebackHandler,
  imagelink_portrait,
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
        <View style={styles.InputContainerComponent}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            style={styles.InputIcon}
            name={"search-sharp"}
            size={25}
            color={COLORS.primaryBlackHex}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.TextInputContainer}
          placeholder="Search all you need!"
        />
      </View>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    marginTop: SPACING.space_24,
    marginRight: SPACING.space_18,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryWhiteHex,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // position: "absolute",
    // top: 210,
    // left: 0,
    // right: 0,
    // bottom: 25,
  },
  InputIcon: {
    marginHorizontal: SPACING.space_15,
  },
  TextInputContainer: {
    flex:1,
    fontFamily:'Poppins-Medium',
    fontSize:FONTSIZE.size_12,
  },
});
