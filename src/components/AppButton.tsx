import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";

interface AppButtonProps{
  onPress:any;
  title:string;
  backgroundColor:string;
  textColor:string;
  buttonStyle?:any;
}

const AppButton:React.FC<AppButtonProps> = ({ title,backgroundColor,textColor,onPress, buttonStyle={}}) => (
  // <View>
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer,{backgroundColor:backgroundColor},buttonStyle]}>
      <Text style={[styles.appButtonText,{color:textColor}]}>{title}</Text>
    </TouchableOpacity>
  //</View>
);

export default AppButton

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    // backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: 20,
    marginBottom:SPACING.space_15,
    // paddingHorizontal: 10,
  },
  appButtonText: {
    fontSize: FONTSIZE.size_16,
    // paddingTop:2,
    fontFamily: "Poppins-Regular",
    // color: COLORS.primaryBlackHex,
    // fontWeight: "bold",
    alignSelf: "center",
  }
});