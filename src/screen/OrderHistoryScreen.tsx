import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import HeaderBar from '../components/HeaderBar'
import PesananCard from '../components/PesananCard'
import { StatusBar } from "expo-status-bar";
import ChartButton from '../components/ChartButton';
import { COLORS } from '../theme/theme';
import { Firestore, doc, collection, getDocs, query, deleteDoc, where } from 'firebase/firestore';
import {auth,firestore} from '../../firebaseConfig';
import { useAuth } from '../auth/AuthProvider';



const HistoryScreen = ({navigation,route}:any) => {
  const {profile} = useAuth();
  type ChartData = { data: any; };
  const [Chart, fetchChart] = useState<ChartData[]>([]); 
  const [TotalPrice,setTotalPrice] = useState(0);
  const uid = profile.id;
  
  const handlerChart = async ()=>{
    const q = query(collection(firestore, "Users"));
    const querySnapshot = await getDocs(q);
    const search = querySnapshot.docs
    .map(doc => ({id:doc.id , data:doc.data()}));
    const searchResults = search.filter(doc => doc.id=== uid);
    const userDocRef = doc(firestore, "Users", searchResults[0].id);

  const subCollectionRef = collection(userDocRef, "History");
  const subCollectionSnapshot = await getDocs(subCollectionRef);
  const subCollectionData = subCollectionSnapshot.docs.map(doc => ({data: doc.data()}));

  let a = 0;
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
      return <Text>Belum ada transaksi, Ayoo Belanja sekarang!!</Text>
    }
    return null;
  }

  const handlerDelete = async (chartName: string) => {
    const userDocRef = doc(firestore, "Users", uid);
    const subCollectionRef = collection(userDocRef, "Chart");
    const q = query(subCollectionRef, where("name", "==", chartName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id; 
      const chartDocRef = doc(subCollectionRef, docId);
      await deleteDoc(chartDocRef);
      fetchChart(Chart.filter(chart => chart.data.name !== chartName));
    }
  };

  return (
    <View style={styles.ScreenContainer}>
      <HeaderBar title="History" description="Riwayat pesanan" />
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <View>
          {Chart.map((item,index=0) =>
              <PesananCard key={index+1} Chart={false} buttonPressHandler={()=>{navigation.push('Detail')}} name={item.data.name} detail= {item.data.detail} price={item.data.price} type= {item.data.category} imageURL= {item.data.imageURL} handlerDelete={() => handlerDelete(item.data.name)}></PesananCard>
          )}
        </View>
        {renderBottomHeight()}        
      </ScrollView>
    </View>
  )
}


export default HistoryScreen;

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
    bottom: 90,
  }
})
