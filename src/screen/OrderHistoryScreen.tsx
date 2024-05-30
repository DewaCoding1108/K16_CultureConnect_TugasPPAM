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



const HistoryScreen = ({navigation,route}:any) => {
  const {profile} = useAuth();
  type ChartData = { data: any; id:string };
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
  const subCollectionData = subCollectionSnapshot.docs.map(doc => ({data: doc.data(),id:doc.id}));

  let a = 0;
  subCollectionData.forEach(arr =>{
    a += arr.data.price;
  })
  fetchChart(subCollectionData);
  setTotalPrice(a);
  }

  const handlerNavigate = (item: ChartData)=>{
    if(item.data.category === "Jasa Seni"){
      navigation.push("JasaSeniDetail",{id: item.id, name: item.data.name, price: item.data.price, detail: item.data.detail, tipe: item.data.category, senimanID:item.data.senimaID, imageURL:item.data.imageURL, show: false});
    } else if( item.data.category ==="Seni"){
      navigation.push("SeniDetail",{id: item.id, name: item.data.name, price: item.data.price, detail: item.data.detail, tipe: item.data.category, sanggarID:item.data.sanggarID, imageURL:item.data.imageURL, show:false});
    }else if( item.data.category === "Sewa Pakaian"){
      navigation.push("SewaPakaianDetail",{id: item.id, name: item.data.name, price: item.data.price, detail: item.data.detail, tipe: item.data.category, tokosewaID:item.data.tokosewaID, imageURL:item.data.imageURL, show:false});
    }
  }

  useEffect(()=>{
    handlerChart();
  },[])
  const renderBottomHeight = () => {
    if (Chart.length > 3) {
      return <View style={styles.Bottomheigt}></View>;
    } else if (Chart.length == 0) {
      return <Text style={{marginHorizontal:"auto"}}>You don't have order history yet!</Text>
    }
    return null;
  }

  return (
    <View style={styles.ScreenContainer}>
      <View style={{marginTop:50, paddingHorizontal:SPACING.space_20}}>
      <Text style={styles.TextHeader}>History</Text>
      <Text style={[styles.TextParagraph, {marginBottom:4}]}>Discover all your recent order</Text>
      <View style={styles.line}/>
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:SPACING.space_20, flexGrow:1}}>
        <View>
          {Chart.map((item,index=0) =>
              <PesananCard key={index+1} screen='history' buttonPressHandler={()=>{handlerNavigate(item)}} name={item.data.name} location= {item.data.detail} price={item.data.price} type= {item.data.category} imagelink= {item.data.imageURL} ></PesananCard>
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
    flexDirection:"column",
    backgroundColor:COLORS.primaryWhiteHex,
  },
  ScrollViewFlex:{
    flexGrow:1,
    alignItems: "center",
  },
  Bottomheigt:{
    height:80,
  },
  ButtonAlignment: {
    alignSelf: "center",
    position:"absolute",
    bottom: 90,
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
line: {
  marginVertical:SPACING.space_8,
  borderColor: '#A19C9C',
  borderWidth: 0.3,
  width: '100%',
},
})
