import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTFAMILY, FONTSIZE, SPACING,COLORS } from "../theme/theme";

interface HeaderBarProps {
  title?: string;
  description?: string;
}
const HeaderBar: React.FC<HeaderBarProps> = ({ title,description}) => {
  return (
    <View>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>{title}</Text>
      </View>
      <View style={styles.DescriptionContainer}>
        <Text style={styles.descriptionText}> {description}</Text>
      </View>
      <View style={styles.horizontalLine} />  
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  HeaderContainer: {
    paddingTop: SPACING.space_30,
    paddingHorizontal: SPACING.space_30,
    marginTop: SPACING.space_8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  DescriptionContainer: {
    paddingHorizontal: SPACING.space_30,
    marginTop: SPACING.space_8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderText: {
    marginTop: 20,
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_28,
    color:COLORS.primaryBlackHex,
  },
  descriptionText: {
    marginTop: 10,
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_12,
    color:COLORS.primaryBlackHex,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black', 
    marginVertical: SPACING.space_10, 
    marginHorizontal: SPACING.space_30,
  },
});
