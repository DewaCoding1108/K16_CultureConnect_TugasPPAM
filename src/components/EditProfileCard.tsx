import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {  SimpleLineIcons, Entypo } from '@expo/vector-icons'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'

interface EditProfileCardProps{
  title:any,
  text:any,
  setText:(text: string) => void,
}

const EditProfileCard:React.FC<EditProfileCardProps> = ({title, text, setText}) => {
  const [isClick, setIsClick] = useState(false);

  return (
    <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:10, paddingVertical:5}} >
        <Text style={[styles.TextTitle,{paddingLeft:10}]}>{title}</Text>
        <Text> </Text>
        {isClick ? <TextInput value={text} style={[styles.TextProfile, {height:24}]} onChangeText={newText => setText(newText)} />:
          <Text style={[styles.TextProfile]}>{text}</Text>
        }
        <Pressable style={{marginLeft:"auto"}} onPress={() => {setIsClick(!isClick)}}>
          {isClick ? <Entypo name="check" size={24} color="black" /> :
          <SimpleLineIcons name="pencil" size={20} color="black" />
          }
        </Pressable>
    </View>
  )
}

export default EditProfileCard

const styles = StyleSheet.create({
  TextProfile: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
  TextTitle: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: 600,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  }
})