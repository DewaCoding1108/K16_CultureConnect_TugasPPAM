import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import HeaderBar from '../components/HeaderBar'
import PesananCard from '../components/PesananCard'
import { StatusBar } from "expo-status-bar";
import ChartButton from '../components/ChartButton';
import { COLORS } from '../theme/theme';
import { Firestore, doc, collection, getDocs, query, where } from 'firebase/firestore';
import {auth,firestore} from '../../firebaseConfig';



const ChartScreen = ({navigation,route}:any) => {
  type ChartData = { data: any; };
  const [Chart, fetchChart] = useState<ChartData[]>([]); 
  const [TotalPrice,setTotalPrice] = useState(0);
  const {uid} = auth.currentUser;
  
  const handlerChart = async ()=>{
    const q = query(collection(firestore, "Users"));
    const querySnapshot = await getDocs(q);
    const search = querySnapshot.docs
    .map(doc => ({id:doc.id , data:doc.data()}));
    const searchResults = search.filter(doc => doc.id=== uid);
    console.log(searchResults);
    const userDocRef = doc(firestore, "Users", searchResults[0].id);

  // Misalnya subkoleksi bernama "Orders"
  const subCollectionRef = collection(userDocRef, "Chart");
  const subCollectionSnapshot = await getDocs(subCollectionRef);
  const subCollectionData = subCollectionSnapshot.docs.map(doc => ({data: doc.data()}));

  let a =0;
  subCollectionData.forEach(arr =>{
    a += arr.data.price;
  })
  fetchChart(subCollectionData);
  setTotalPrice(a);
  }
  useEffect(()=>{
    handlerChart();
  },[])
  const renderBottomHeight = () => {
    if (Chart.length > 3) {
      return <View style={styles.Bottomheigt}></View>;
    } else if (Chart.length == 0) {
      return <Text>Chart kosong</Text>
    }
    return null;
  }

  return (
    <View style={styles.ScreenContainer}>
      <HeaderBar title="Pesanan" description="Pesan sekarang untuk pengalaman yang tak terlupakan terhadap karya seni" />
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <View>
          {Chart.map((item) =>
              <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name={item.data.name} location= {item.data.city} price={item.data.price} type= {item.data.category} imageURL= {item.data.imageURL}></PesananCard>
          )}
        </View>
        {renderBottomHeight()}        
      </ScrollView>
      <View style={styles.ButtonAlignment}>
        <ChartButton 
          price={TotalPrice} 
          onPress={() => {
          navigation.push('PaymentDetails', { Chart: Chart, TotalPrice: TotalPrice });
            }}></ChartButton>      
        </View>
    </View>
  )
}


export default ChartScreen

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryWhiteHex,
  },
  ScrollViewFlex:{
    flexGrow:1,
    alignItems: "center",
  },
  Bottomheigt:{
    height:300,
  },
  ButtonAlignment: {
    alignSelf: "center",
    position:"absolute",
    top: 700,
  }
})
