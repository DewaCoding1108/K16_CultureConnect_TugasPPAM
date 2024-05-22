import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'
import ImageBackgroundInfo from '../components/ImageBackgroundInfo'
import ProductCard from '../components/ProductCard'
import firestore from '@react-native-firebase/firestore'
import AppButton from '../components/AppButton'


const DetailScreen = ({navigation,route}:any) => {
  const {id, name, location, address, description, tipe, phone, imageURL} = route.params
  const [results, setResults] = useState<any>([]); 

  const productCategory = (tipe:any) => {
    if(tipe == "Sanggar"){
      return "Seni";
    }
    else if(tipe == "Seniman"){
      return "Jasa Seni";
    }
    else if(tipe == "Toko Sewa"){
      return "Sewa Pakaian";
    }
    else if(tipe == "Toko Seni"){
      return "Karya Seni"
    }
    else{
      return '';
    }
  }

  const productTipe = productCategory(tipe.toString());

  const handleProduct = async () => {
    try {
      const querySnapshot = await firestore()
          .collection(productTipe)
          .where('sanggarID','==',id)
          .get();

      const searchResults = querySnapshot.docs
      .map(doc => ({id:doc.id , data:doc.data()}))

      setResults(searchResults);
      console.log(results);

    } catch (error) {
      console.error('Error searching Firestore:', error);
    }
  }

  useEffect(()=>{
    handleProduct();
  },[])

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor='transparent'/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
      <ImageBackgroundInfo enablebackHandler={true} backHandler={()=>{navigation.goBack()}} imageStyle={{aspectRatio: 35 / 20}}imagelink_portrait={{uri:(imageURL)}}/>
      <View style={{paddingHorizontal:SPACING.space_15, paddingVertical:SPACING.space_10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.TextParagraph}>{location}</Text>
          <Text style={styles.TextParagraph}>{tipe}</Text>
        </View>
        <Text style={[styles.TextHeader,{width:'85%'}]}>{name}</Text>
        <Text style={styles.TextParagraph}>{description}</Text>
        <View style={styles.line}/>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.TextHeader2}>Featured Product</Text>
          <Text style={styles.TextParagraph}>See All</Text>
        </View>
        <FlatList
          style={{marginBottom:SPACING.space_15}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ProductCard buttonPressHandler={()=>{
              navigation.push('Detail2',{
                id:item.id,
                name:item.data.name, 
                location:item.data.city, 
                price: item.data.price, 
                detail: item.data.detail, 
                tipe:item.data.category, 
                sanggarID:item.data.sanggarID,
                imageURL:item.data.imageURL
                })
              }} 
              name={item.data.name} 
              description={item.data.detail} 
              price={item.data.price} 
              imagelink={{uri:(item.data.imageURL)}}
            />
            )}
        />
        <Text style={styles.TextHeader2}>Where the {tipe} will be</Text>
        <Text style={styles.TextParagraph}>{address}</Text>
        <Text style={[styles.TextHeader2, {marginTop:SPACING.space_15}]}>Contact Us</Text>
        <Text style={styles.TextParagraph}>{phone}</Text>
      </View>
      </ScrollView>
      <View>
      </View>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryWhiteHex,
  },
  TextHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_26,
    color: COLORS.primaryBlackHex,
  },
  TextHeader2: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryBlackHex,
  },
  TextParagraph: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
  line: {
    marginVertical:SPACING.space_12,
    borderColor: '#A19C9C',
    borderWidth: 0.3,
    width: '100%',
  },
  ScrollViewFlex:{
    flexGrow:1,
  },
})