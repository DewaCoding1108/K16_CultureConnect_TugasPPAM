import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

interface TouchableTextProps{
  // onPress:any;
  title:string;
  textColor:string;
}

const TouchableText:React.FC<TouchableTextProps> = ({title,textColor}) => {
  return (
    <TouchableOpacity>
      <Text style={[styles.TextStyle,{color:textColor}]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default TouchableText

const styles = StyleSheet.create({
  TextStyle:{
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    marginTop:SPACING.space_30,
  }
})