import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather, Ionicons, Octicons } from '@expo/vector-icons'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'

interface ProfileCardProps{
  iconName:any;
  icon:string;
  text:string;
  textPaddingLeft?:number;
  pressHandler:any;
}

const ProfileCard:React.FC<ProfileCardProps> = ({iconName,icon,text,textPaddingLeft=10,pressHandler}) => {
  return (
    <TouchableOpacity onPress={pressHandler} style={{flexDirection:'row', paddingHorizontal:10, paddingVertical:5}} activeOpacity={0.3}>
      {
        icon == 'Octicons' ?
          <Octicons name= {iconName} size={30} color="black" />
          :
        icon == 'Feather' ?
          <Feather name={iconName} size={30} color="black" />
          :
          <></>
      }
      <Text style={[styles.TextProfile,{paddingLeft:textPaddingLeft, paddingTop:SPACING.space_4}]}>{text}</Text>
      <Ionicons style={{position:'absolute', right:0, paddingTop:SPACING.space_4}}name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  TextProfile: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  }
})