import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const AppLoader = () => {
  return (
    <View style={[ StyleSheet.absoluteFillObject, styles.ScreenContainer]}>
      <LottieView source={require('../assets/animation/load_animation.json')} autoPlay loop style={styles.lottie}/>
    </View>
  )
}

export default AppLoader

const styles = StyleSheet.create({
  ScreenContainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex:1
  },
  lottie: {
    width: 100,
    height: 100,
  },
})