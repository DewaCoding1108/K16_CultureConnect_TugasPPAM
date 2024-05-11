import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface BackButtonProps{
  pressHandler:any,
}

const BackButton:React.FC<BackButtonProps> = ({pressHandler}) => {
  return (
    <View>
      <TouchableOpacity onPress={pressHandler}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default BackButton

const styles = StyleSheet.create({})