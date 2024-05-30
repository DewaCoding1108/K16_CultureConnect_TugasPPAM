import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'
import BackButton from '../components/BackButton'
import CategoryBrandCard from '../components/CategoryBrandCard'

const Brand = ({navigation,route}:any) => {
  return (
    <View style={{
        flex: 1,
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingTop:50,
        paddingHorizontal:SPACING.space_20,
        backgroundColor:COLORS.primaryWhiteHex}}
      >
        <BackButton pressHandler={()=>{navigation.goBack()}}/>
        <Text style={[styles.TextHeader,{marginTop:16}]}>Brand Category</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={[styles.TextParagraph, {marginBottom:4}]}>Show your creativity in culture category</Text>
            
            {/* <Pressable style={{marginRight:12}}>
                <Ionicons name="add-circle" size={22} color="black" />
            </Pressable> */}
        </View>
        <View style={styles.line}/>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexDirection:"column", gap:20, justifyContent:"center", marginTop:8, paddingBottom:26}}>
          <CategoryBrandCard title="Sanggar" image={require("../assets/app_images/Home_SanggarSeni.png")} handlePress={() => {navigation.push('BrandCategory', {title:"Sanggar"})}} />
          <CategoryBrandCard title="Seniman" image={require("../assets/app_images/Home_BeliKaryaSeni.png")} handlePress={() => {navigation.push('BrandCategory', {title:"Seniman"})}} />
          <CategoryBrandCard title="Toko Sewa" image={require("../assets/app_images/Home_SewaPakaian.png")} handlePress={() => {navigation.push('BrandCategory', {title:"Toko Sewa"})}} />
          <CategoryBrandCard title="Toko Sewa" image={require("../assets/app_images/Home_JasaTampil.png")} handlePress={() => {navigation.push('BrandCategory', {title:"Toko Karya"})}} />
        </ScrollView>
        
      </View>
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