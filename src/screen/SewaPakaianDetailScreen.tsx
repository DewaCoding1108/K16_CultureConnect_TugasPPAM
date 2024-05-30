import { Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme'
import ImageBackgroundInfo from '../components/ImageBackgroundInfo'
import ProductCard from '../components/ProductCard'
// import firestore from '@react-native-firebase/firestore'
import { firestore } from '../../firebaseConfig'
import { getDoc, getDocs, doc, query, collection, where } from 'firebase/firestore'
import AppButton from '../components/AppButton'
import AppLoader from '../components/AppLoader'
import { getTokoSewaWithDocID } from '../db/TokoSewaController'
import { getSewaPakaianWithTokoSewaID } from '../db/SewaPakaianController'

const CARD_WIDTH = Dimensions.get("window").width;

const SewaPakaianDetailScreen = ({navigation,route}:any) => {
  const {id, name, price, detail, tipe, tokosewaID, imageURL, show} = route.params
  const [results, setResults] = useState<any>([]);
  const [providerResults, setProviderResults] = useState<any>([]);
  const [loading, setLoading] = useState(true); 

  const formatedPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, 
    }).format(price);
  };

  const providerTipe = "Toko Sewa";

  const handleProvider = async () => {
    try {
      setLoading(true);
      const providerDoc = await getTokoSewaWithDocID(tokosewaID);
      // const providerDoc = await getDoc(doc(firestore, providerTipe, sanggarID));
      if(providerDoc.exists()){
        setProviderResults(providerDoc.data())
      }
      else{
        console.log('tidak ditemukan');
      }
      setLoading(false);
    }
    catch(error){
      console.error('Error searching Firestore:', error);
      setLoading(false);
    }
  }


  const handleProduct = async () => {
    try {
      // const q = query(collection(firestore,tipe), where('sanggarID','==',sanggarID))
      // const querySnapshot = await getDocs(q)

      const querySnapshot = await getSewaPakaianWithTokoSewaID(tokosewaID);
      const searchResults = querySnapshot.docs
      .filter(doc => doc.data().name !== name)
      .map(doc => ({id:doc.id , data:doc.data()}));

      setResults(searchResults);
      console.log(results);

    } catch (error) {
      console.error('Error searching Firestore:', error);
    }
  }

  useEffect(()=>{
    handleProvider();
    handleProduct();
  },[])

  return (
    <>
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor='transparent'/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
      <ImageBackgroundInfo enablebackHandler={true} backHandler={()=>{navigation.goBack()}} imageStyle={{aspectRatio: 35 / 20}}imagelink_portrait={{uri:(imageURL)}}/>
      <View style={{paddingHorizontal:SPACING.space_15, paddingVertical:SPACING.space_10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.TextHeader2}>{formatedPrice(price)} / Hari</Text>
          <Text style={styles.TextParagraph}>{tipe}</Text>
        </View>
        <Text style={[styles.TextHeader,{width:'85%'}]}>{name}</Text>
        <Text style={styles.TextParagraph}>{detail}</Text>
        <View style={styles.line}/>
        {
          loading ?
          <Text>Loading</Text> 
          :
          <>
          <TouchableOpacity activeOpacity={0.7} onPress={()=>{navigation.push('TokoSewaDetail',
          {id:tokosewaID, 
          name:providerResults.name,
          address: providerResults.address, 
          description: providerResults.description, 
          tipe:providerResults.category, 
          phone:providerResults.phone,
          imageURL:providerResults.imageURL,
          })}} style={{flexDirection:'row',justifyContent:'flex-start', alignContent:'center', marginVertical:SPACING.space_4}}>
            <ImageBackground
              source={{uri:(providerResults.imageURL)}}
              style={[styles.CardImageBackground,{marginTop:10}]}
              borderRadius={BORDERRADIUS.radius_15}
            ></ImageBackground>
            <View style={{flexDirection:'column',width:'85%', marginLeft:6}}>
              <Text style={[styles.TextHeader2]}>{providerResults.name}</Text>
              <Text style={styles.TextParagraph}>{providerResults.city}</Text>
            </View>
          </TouchableOpacity>
          </>
        }
        
        <View style={styles.line}/>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.TextHeader2}>Another Product</Text>
          <Text style={styles.TextParagraph}>See All</Text>
        </View>
        { loading ? null :
          results.length === 0 ?
          <View style={{alignItems:'center', marginVertical:50}}>
              <Text>There is No Other Product in this {providerResults.category}</Text>
          </View> :
          <FlatList
            style={{marginBottom:SPACING.space_15}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ProductCard buttonPressHandler={()=>{
                navigation.push('SewaPakaianDetail',{
                  id:item.id,
                  name:item.data.name, 
                  price: item.data.price, 
                  detail: item.data.detail, 
                  tipe:item.data.category, 
                  tokosewaID:item.data.tokosewaID,
                  imageURL:item.data.imageURL
                  })
              }} name={item.data.name} description={item.data.detail} price={item.data.price} imagelink={{uri:(item.data.imageURL)}}/>
              )}
          />
          }
      </View>
      </ScrollView>
      <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', marginVertical:SPACING.space_10}}>
        {/* <AppButton buttonStyle={{width:'45%', marginLeft:SPACING.space_10, borderWidth:2, borderColor:COLORS.primaryRedHex}} title="+ Keranjang" backgroundColor={COLORS.primaryWhiteHex} textColor={COLORS.primaryRedHex} onPress={()=>{}}/> */}
        {show ? (<AppButton 
          buttonStyle={{width:'90%', marginHorizontal:SPACING.space_10}} 
          title="Booking" 
          backgroundColor={COLORS.primaryRedHex} 
          textColor={COLORS.primaryWhiteHex} 
          onPress={()=>{navigation.push('Booking Pakaian',{
            id:id,
            name:name,
            price: price, 
            detail: detail, 
            tipe:tipe, 
            tokosewaID:tokosewaID,
            imageURL:imageURL  
          })}}/>) : null}
      </View>
    </View>
    {loading ? <AppLoader/> : null}
    </>
  )
}

export default SewaPakaianDetailScreen

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryWhiteHex,
  },
  TextHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_24,
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
  CardImageBackground: {
    width: 45,
    height: 45,
    margin:SPACING.space_4,
  },
})