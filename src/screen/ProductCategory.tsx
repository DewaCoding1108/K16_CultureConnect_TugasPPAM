import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'
import BackButton from '../components/BackButton'
import PesananCard from '../components/PesananCard'
import { Ionicons } from '@expo/vector-icons'
import CategoryBrandCard from '../components/CategoryBrandCard'
import { DocumentData, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { auth, firestore } from '../../firebaseConfig'
import { useAuth } from '../auth/AuthProvider'
import AppLoader from '../components/AppLoader'

const ProductCategory = ({navigation,route}:any) => {
    const [queryData, setQueryData] =  useState<Array<{ id: string, data: any }>>([]);
    const [isLoading, setIsLoading] = useState(true);

    let wherePara = ""
    let titlePara = ""
    const deleteProduct = async (id : any) => {
        try {
            // const q = query(collection(firestore, route.params.title), where(wherePara,'==',route.params.refID));
            // const querySnapshot = await getDocs(q);
            // const matchingDoc = querySnapshot.docs[0];
            // if (matchingDoc) {
                const docRef = doc(firestore, route.params.title, id);
                await deleteDoc(docRef);
                navigation.navigate('Brand');
            // }
        } catch (error) {
            alert("Error!")
        }
            } 
    async function loadData() {
        try {
            
            if (route.params.title ===  "Seni") {
                wherePara = "sanggarID";
                titlePara = "Sanggar";
            } else if (route.params.title ===  "Jasa Seni") {
                wherePara = "senimanID";
                titlePara = "Seniman";
            } else if (route.params.title ===  "Sewa Pakaian") {
                wherePara = "tokosewaID";
                titlePara = "Toko Sewa";
            } else if (route.params.title ===  "Karya Seni") {
                wherePara = "tokokaryaID";
                titlePara = "Toko Karya";
            }
            const q = query(collection(firestore, route.params.title), where(wherePara,'==',route.params.refID))
            const querySnapshot = await getDocs(q);
            const searchResults = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
            setQueryData(searchResults);
            setIsLoading(false);
    
            // const docRef = querySnapshot.docs[0].ref;
            // await updateDoc(docRef, { name: name, nomor: nomor });
          } catch (error) {
            console.log("Nothing");
          }
      }
      useEffect(()=>{
        loadData();
      },[])
  return (
    <View style={{
        flex: 1,
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingTop:50,
        paddingHorizontal:SPACING.space_20,
        backgroundColor:COLORS.primaryWhiteHex}}
      >
        <BackButton pressHandler={()=>{navigation.goBack()}}/>
        <Text style={[styles.TextHeader,{marginTop:16}]}>{route.params.title}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={[styles.TextParagraph, {marginBottom:4}]}>Manage grow your brand creatively</Text>
            
            <Pressable style={{marginRight:12}} onPress={() => {navigation.push("EditProduct", {type:"Create", category: route.params.title, refID: route.params.refID, refName: route.params.refName})}}>
                <Ionicons name="add-circle" size={22} color="black" />
            </Pressable>
        </View>
        <View style={styles.line}/>
            {isLoading ? <AppLoader /> :
            queryData.map((item) => (
                <PesananCard key={item.id} screen='product' buttonPressHandler={()=>{}} name={item.data.name} price={item.data.price} location= "" type= {item.data.category} imagelink= {item.data.imageURL} handleSecButton={() => deleteProduct(item.id)} handleSecButton2={() =>navigation.push("EditProduct", {type:"Update", category: route.params.title, refID: route.params.refID, refName: route.params.refName, refProductName: item.data.name})}></PesananCard>
                ))
            }
        </View>
  )
}

export default ProductCategory

const styles = StyleSheet.create({
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
    TextAlert: {
        fontFamily: "Poppins-Regular",
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryBlackHex,
    },
    line: {
        marginVertical:SPACING.space_8,
        borderColor: '#A19C9C',
        borderWidth: 0.3,
        width: '100%',
      }
})