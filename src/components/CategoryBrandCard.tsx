import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'
import BackButton from '../components/BackButton'
import PesananCard from '../components/PesananCard'
import { Ionicons } from '@expo/vector-icons'


const CategoryBrandCard = ({title, handlePress, image}: any) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress} >
        <ImageBackground source={image} imageStyle={{borderRadius:30,}} style={{width:"100%", height:140}} >
            <View style={{flex: 1, alignItems:"center", backgroundColor: "rgba(0,0,0,0.6)", borderRadius:30}}>
                <Text style={styles.TextCategory}>{title}</Text>
            </View>
        </ImageBackground>
    </TouchableOpacity>
  )
}

export default CategoryBrandCard

const styles = StyleSheet.create({
    TextCategory: {
        fontFamily: "Poppins-SemiBold",
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
        margin: "auto",
        letterSpacing:4,
      },
})