import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTFAMILY, FONTSIZE, SPACING,COLORS } from "../theme/theme";

interface HeaderBarProps {
  title?: string;
}
const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.HeaderText}>{title}</Text>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderText: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_30,
    color:COLORS.primaryBlackHex,
  },
});
