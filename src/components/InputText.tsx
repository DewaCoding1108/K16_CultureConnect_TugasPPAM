import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme'

interface InputTextProps{
  label:string,
  value:string,
  changeHandler:any,
  placeholder:string,
  secureTextEntry?:boolean,
}

const InputText:React.FC<InputTextProps> = ({label,value,changeHandler,placeholder,secureTextEntry=false}) => {
  return (
    <View style={styles.TextInputComponent}>
          <Text style={styles.TextLabel}>{label}</Text>
          <TextInput
            style={[styles.TextInputContainer,{borderColor:COLORS.primaryLightGreyHex}]}
            onChangeText={changeHandler}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
    </View>
  )
}

export default InputText

const styles = StyleSheet.create({
  TextInputContainer: {
    borderColor:COLORS.primaryBlackHex,
    // backgroundColor:COLORS.primaryDarkGreyHex,
    fontFamily:'Poppins-Medium',
    borderWidth:1,
    fontSize:FONTSIZE.size_12,
    borderRadius:BORDERRADIUS.radius_4,
    paddingTop:SPACING.space_10,
    paddingBottom:SPACING.space_10,
    paddingLeft:SPACING.space_12,
  },
  TextInputComponent:{
    marginBottom:SPACING.space_18,
  },
  TextLabel:{
    fontFamily:'Poppins-Light',
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryLightGreyHex,
    marginBottom:5,
  }
})