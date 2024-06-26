import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'
import BackButton from '../components/BackButton'
import PesananCard from '../components/PesananCard'

const LikedArt = ({navigation,route}:any) => {
  return (
    <ScrollView contentContainerStyle={{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingTop:50,
        paddingHorizontal:SPACING.space_20,
        backgroundColor:COLORS.primaryWhiteHex}}
      >
        <BackButton pressHandler={()=>{navigation.goBack()}}/>
        <Text style={[styles.TextHeader,{marginTop:16}]}>Liked Art</Text>
        <Text style={[styles.TextParagraph, {marginBottom:4}]}>Save your favorite art for later</Text>
        <View style={styles.line}/>
        <PesananCard screen='liked' buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= "https://firebasestorage.googleapis.com/v0/b/culture-connect-a7f81.appspot.com/o/Images%2FSanggar%2FSanggar-Tari-Melati-Bandung.png?alt=media&token=7076ff12-8406-445e-8e35-4c661127b55f"></PesananCard>
      </ScrollView>
  )
}

export default LikedArt

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