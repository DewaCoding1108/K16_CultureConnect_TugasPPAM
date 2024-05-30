import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'
import BackButton from '../components/BackButton'
import PesananCard from '../components/PesananCard'
import { Ionicons } from '@expo/vector-icons'

const Brand = ({navigation,route}:any) => {
  return (
    <ScrollView contentContainerStyle={{
        flex: 1,
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingTop:50,
        paddingHorizontal:SPACING.space_20,
        backgroundColor:COLORS.primaryWhiteHex}}
      >
        <BackButton pressHandler={()=>{navigation.goBack()}}/>
        <Text style={[styles.TextHeader,{marginTop:16}]}>Your Brand</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={[styles.TextParagraph, {marginBottom:4}]}>Customize your brand creatively</Text>
            <Pressable style={{marginRight:12}}>
                <Ionicons name="add-circle" size={22} color="black" />
            </Pressable>
        </View>
        <View style={styles.line}/>
        <PesananCard screen='brand' buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
      </ScrollView>
  )
}

export default Brand

const styles = StyleSheet.create({
    TextHeader: {
        fontFamily: "Poppins-Medium",
        fontSize: FONTSIZE.size_26,
        color: COLORS.primaryBlackHex,
      },
    TextParagraph: {
        fontFamily: "Poppins-ExtraLight",
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryBlackHex,
    }, 
    line: {
        marginVertical:SPACING.space_8,
        borderColor: '#A19C9C',
        borderWidth: 0.3,
        width: '100%',
      }
})