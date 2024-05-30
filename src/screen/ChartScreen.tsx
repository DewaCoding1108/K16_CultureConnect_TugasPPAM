import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import HeaderBar from '../components/HeaderBar'
import PesananCard from '../components/PesananCard'
import { StatusBar } from "expo-status-bar";
import ChartButton from '../components/ChartButton';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { Firestore, doc, collection, getDocs, query, deleteDoc, where } from 'firebase/firestore';
import {auth,firestore} from '../../firebaseConfig';
import { useAuth } from '../auth/AuthProvider';



const ChartScreen = ({navigation,route}:any) => {
  const {profile} = useAuth();
  type ChartData = {
    id: string;
    data: any; 
};
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

  const subCollectionRef = collection(userDocRef, "Chart");
  const subCollectionSnapshot = await getDocs(subCollectionRef);
  const subCollectionData = subCollectionSnapshot.docs.map(doc => ({data: doc.data(),id:doc.id}));

  let a = 0;
  subCollectionData.forEach(arr =>{
    a += arr.data.price;
  });
  console.log(subCollectionData);
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
      return <Text style={{marginHorizontal:"auto"}}>Chart kosong</Text>
    }
    return null;
  }

  const renderButton=()=>{
    if (Chart.length > 0){
      return (
        <View style={styles.ButtonAlignment}>
          <ChartButton 
          price={TotalPrice} 
          onPress={() => {
          navigation.push('PaymentDetails', { Chart: Chart, TotalPrice: TotalPrice, fromChart: true});
          }}></ChartButton>      
    </View>)
    } 
    return null;
  }

  const handlerDelete = async (id: string) => {
    const userDocRef = doc(firestore, "Users", uid);
  const subCollectionRef = collection(userDocRef, "Chart");
  const chartDocRef = doc(subCollectionRef, id);

  try {
    await deleteDoc(chartDocRef);
    const updatedChart = Chart.filter(chart => chart.id !== id);
    fetchChart(updatedChart);
    const updatedTotalPrice = updatedChart.reduce((acc, item) => acc + item.data.price, 0);
    setTotalPrice(updatedTotalPrice);
    
  } catch (error) {
    console.error("Error removing document: ", error);
  }
  };

  const handlerNavigate = (item:any)=>{
    navigation.push("KaryaSeniDetail",{id: item.id, name: item.data.name, price: item.data.price, detail: item.data.detail, tipe: item.data.category, tokokaryaID:item.data.tokokaryaID, imageURL:item.data.imageURL, show:false});
  }

  return (
    <View style={styles.ScreenContainer}>
      <View style={{marginTop:50, paddingHorizontal:SPACING.space_20}}>
      <Text style={styles.TextHeader}>Pesanan</Text>
      <Text style={[styles.TextParagraph, {marginBottom:4}]}>Pesan sekarang untuk pengalaman yang tak terlupakan terhadap karya seni</Text>
      <View style={styles.line}/>
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:SPACING.space_20, flexGrow:1}}>
          {Chart.map((item,index) =>
              <PesananCard key={index+1} screen="chart" buttonPressHandler={()=>{navigation.push('Detail')}} name={item.data.name} location= {''} price={item.data.price} type= {item.data.category} imagelink= {item.data.imageURL} handleSecButton={() => {handlerDelete(item.id)}}></PesananCard>
          )}
        {renderBottomHeight()}        
      </ScrollView>
      {renderButton()}
    </View>
  )
}


export default ChartScreen

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    flexDirection:"column",
    backgroundColor:COLORS.primaryWhiteHex,
  },
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
  Bottomheigt:{
    height:80,
  },
  line: {
    marginVertical:SPACING.space_8,
    borderColor: '#A19C9C',
    borderWidth: 0.3,
    width: '100%',
  },
  ButtonAlignment: {
    alignSelf: "center",
    position:"absolute",
    bottom: 90,
  }
})