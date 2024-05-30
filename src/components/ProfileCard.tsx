import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather, Ionicons, Octicons, EvilIcons, Entypo } from '@expo/vector-icons'
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
    <TouchableOpacity onPress={pressHandler} style={{flexDirection:'row', alignItems:'center', paddingHorizontal:10, paddingVertical:5}} activeOpacity={0.3}>
      {
        icon == 'Octicons' ?
          <Octicons name= {iconName} size={22} color="black" />
          :
        icon == 'Feather' ?
          <Feather name={iconName} size={22} color="black" />
          :
        icon == 'EvilIcons' ?
          <EvilIcons name={iconName} size={22} color="black" />
          :
        icon == 'Ionicons' ?
          <Ionicons name={iconName} size={22} color="black" />
          :
        icon == 'Entypo' ?
          <Entypo name={iconName} size={22} color="black" />
          :
          <></>
      }
      <Text style={[styles.TextProfile,{paddingLeft:textPaddingLeft, paddingTop:SPACING.space_4}]}>{text}</Text>
      <Ionicons style={{marginLeft:"auto"}}name="chevron-forward" size={24} color="black" />
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