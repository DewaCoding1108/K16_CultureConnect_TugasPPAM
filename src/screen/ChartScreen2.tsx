import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import HeaderBar from '../components/HeaderBar'
import PesananCard from '../components/PesananCard'
import { StatusBar } from "expo-status-bar";
import ChartButton from '../components/ChartButton';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { Firestore, doc, collection, getDocs, query, deleteDoc, where, getDoc } from 'firebase/firestore';
import {auth,firestore} from '../../firebaseConfig';
import { useAuth } from '../auth/AuthProvider';
import { FlashList } from '@shopify/flash-list';
import AppLoader from '../components/AppLoader';


const ChartScreen = ({navigation,route}:any) => {
  const {profile} = useAuth();
  type ChartData = { data: any; };
  const [Chart, fetchChart] = useState<ChartData[]>([]); 
  const [TotalPrice,setTotalPrice] = useState(0);
  const uid = profile.id;
  const [loading,setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  
  const handlerChart = async ()=>{
  //   const q = query(collection(firestore, "Users"));
  //   const querySnapshot = await getDocs(q);
  //   const search = querySnapshot.docs
  //   .map(doc => ({id:doc.id , data:doc.data()}));
  //   const searchResults = search.filter(doc => doc.id=== uid);
  //   const userDocRef = doc(firestore, "Users", searchResults[0].id);

  // // Misalnya subkoleksi bernama "Orders"
  // const subCollectionRef = collection(userDocRef, "Chart");
  // const subCollectionSnapshot = await getDocs(subCollectionRef);
  // const subCollectionData = subCollectionSnapshot.docs.map(doc => ({data: doc.data()}));

  // let a = 0;
  // subCollectionData.forEach(arr =>{
  //   a += arr.data.price;
  // })
    setLoading(true);
    const q = query(collection(firestore,"Chart"), where('userID','==',uid));
    const subCollectionSnapshot = await getDocs(q);
    const subCollectionData = subCollectionSnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));

    let a = 0;
    subCollectionData.forEach(arr =>{
      a += arr.data.price;
    })
    fetchChart(subCollectionData);
    setTotalPrice(a);
    setLoading(false);

  }
  useEffect(()=>{
    handlerChart();
  },[fetch])
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
          navigation.push('PaymentDetails', { Chart: Chart, TotalPrice: TotalPrice });
          }}></ChartButton>      
    </View>)
    } 
    return null;
  }

  const handlerDelete = async (chartID: string) => {
    try{
      const chartDocRef = doc(firestore,'Chart',chartID)
      await deleteDoc(chartDocRef);
      alert("Cart Berhasil dihapus"); 
      fetchChart(Chart.filter(chart => chart.data.name !== chartID));
      setFetch(!fetch);
    }
    catch(e:any){
      alert(e.message)
    }  
      
    // const userDocRef = doc(firestore, "Users", uid);
    // const subCollectionRef = collection(userDocRef, "Chart");
    // const q = query(subCollectionRef, where("name", "==", chartName));
    // const querySnapshot = await getDoc(chartDocRef);


    // if (!querySnapshot.empty) {
    //   const docId = querySnapshot.docs[0].id; 
    //   const chartDocRef = doc(subCollectionRef, docId);
    //   await deleteDoc(chartDocRef);
    //   fetchChart(Chart.filter(chart => chart.data.name !== chartName));
    // }
  };

  return (
    <>
    <View style={styles.ScreenContainer}>
      <View style={{marginTop:50, paddingHorizontal:SPACING.space_20}}>
      <Text style={styles.TextHeader}>Pesanan</Text>
      <Text style={[styles.TextParagraph, {marginBottom:4}]}>Pesan sekarang untuk pengalaman yang tak terlupakan terhadap karya seni</Text>
      <View style={styles.line}/>
      
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:SPACING.space_20, flex:1}}>
          {Chart.map((item) =>
              <PesananCard screen="chart" buttonPressHandler={()=>{navigation.push('Detail')}} name={item.data.name} location= {item.data.detail} price={item.data.price} type= {item.data.category} imagelink= {item.data.imageURL} handleSecButton={() => {handlerDelete(item.data.name)}}></PesananCard>
          )}
        {renderBottomHeight()}        
      </ScrollView> */}
      {
        loading ? <></> :
        Chart.length === 0 ?
        <View style={{marginTop:'60%', alignItems:'center'}}>
          <Text>Chart Kosong</Text>
        </View> :
        <FlashList
          contentContainerStyle={{paddingHorizontal:SPACING.space_20}}
          showsVerticalScrollIndicator={false}
          data={Chart}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={100}
          renderItem={({ item }:any) => (
            <PesananCard screen="chart" buttonPressHandler={()=>{navigation.push('Detail')}} name={item.data.name} location= {''} price={item.data.price} type= {item.data.category} imagelink= {item.data.imageURL} handleSecButton={() => {handlerDelete(item.id)}}></PesananCard>
          )}
        />
      }
      {renderButton()}
    </View>
    {
      loading ? <AppLoader/> : <></>
    }
    </>
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
    height:300,
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
