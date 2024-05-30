import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import CategoryCard from '../components/CategoryCard';
import { firestore } from '../../firebaseConfig';
import { collection, getDocs, getDoc, query, where, doc } from 'firebase/firestore';
import BackButton from '../components/BackButton';
import { FlashList } from '@shopify/flash-list';
import AppLoader from '../components/AppLoader';

const CategoryScreen = ({navigation,route}:any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>([]);
  const inputRef = useRef<TextInput>(null);
  const {category} = route.params;
  
  const categoryContent = (x:any) => {
    if(x == 'All'){
      return ["Sanggar", "Jasa Seni", "Sewa Pakaian", "Karya Seni", "Event"];
    }
    else if (x == 'Sanggar'){
      return ["Sanggar", "Seni"];
    }
    else if(x=='Jasa Seni'){
      return ["Jasa Seni", "Seniman"];
    }
    else if(x=='Sewa Pakaian'){
      return ["Sewa Pakaian", "Toko Sewa"];
    }
    else if(x=="Karya Seni"){
      return ['Karya Seni','Toko Seni'];
    }
    else if(x=='Event'){
      return ['Event','Lomba'];
    }
    else{
      return [];
    }
  }

  const categories = categoryContent(category);
  const [categoryIndex,setCategoryIndex] = useState({
    index:0,
    category:categories[0]
  })

  useEffect(()=>{
    handleSearch();
  },[categoryIndex])

  const handleCategories = (index:number) => {
    setCategoryIndex({index:index,category:categories[index]});
  }

  const handleSearch = async () => {
    setLoading(true)
    if (searchQuery.trim() === '') {
        setLoading(false)
        return;
    }

    try {
      const docRef = collection(firestore,categoryIndex.category);
      const docSnap = await getDocs(docRef)
      const searchResults = docSnap.docs
        .map(doc => ({id:doc.id , data:doc.data()}))
        .filter(doc => doc.data.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setResults(searchResults);
        console.log(results);
        console.log(searchQuery);
    } catch (error) {
        console.error('Error searching Firestore:', error);
    }
    setLoading(false)
};


  return (    
    <View style={styles.container}>
      <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:45,
        paddingLeft:SPACING.space_10,
        paddingRight:SPACING.space_10}}
      >
        <BackButton pressHandler={()=>{navigation.goBack()}}/>
        <Text style={[styles.TextHeader,{marginTop:SPACING.space_4}]}>Pencarian</Text>
      </View>

      <View style={{
        alignItems:'center',
        justifyContent:'flex-start',
        // marginTop:SPACING.space_30,
        paddingLeft:SPACING.space_10,
        paddingRight:SPACING.space_10
        }}
      >
      <SearchBar 
          clickHandler={()=>{}} 
          value={searchQuery} 
          onChangeText={(text:string) => setSearchQuery(text)}
          inputRef={inputRef}
          submitHandler={handleSearch} 
        />
      </View>
      <View>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.CategoryScrollViewStyle}>
              {categories.map((data,index) => (
                <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
                  <TouchableOpacity 
                    style={styles.CategoryScrollViewItem}
                    onPress={() =>{
                      setCategoryIndex({index:index,category:categories[index]});
                    }}>
                    <Text style={[styles.CategoryText, categoryIndex.index == index ? {color:COLORS.primaryRedHex} : {}]}>
                      {data}
                    </Text>
                    {categoryIndex.index == index ? <View style={styles.ActiveCategory}></View> : <View style={styles.NonActiveCategory}></View>}
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
        </View>
        {
          loading ?
          <AppLoader/>
          : results.length === 0 ?
            <View style={{marginTop:'60%', alignItems:'center'}}>
              <Text>Search Not Found </Text>
            </View> :
          <FlashList
          showsVerticalScrollIndicator={false}
          data={results}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={100}
          renderItem={({ item }:any) => (
            <CategoryCard 
              buttonPressHandler={item.data.category == "Sanggar" || 
              item.data.category == "Toko Sewa" ||
              item.data.category == "Toko Seni" || 
              item.data.category == "Seniman" ? ()=>{
                navigation.push('Detail',
                {id:item.id, 
                  name:item.data.name, 
                  location:item.data.city, 
                  address: item.data.address, 
                  description: item.data.description, 
                  tipe:item.data.category, 
                  phone:item.data.phone,
                  imageURL:item.data.imageURL
                })} : ()=>{
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
              tipe={item.data.category} 
              location={item.data.city} 
              name={item.data.name} 
              description= {item.data.description} 
              imagelink={{uri:(item.data.imageURL)}}
              />
            )}
          />
        }
        
    </View>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.primaryWhiteHex,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  CategoryScrollViewStyle:{
    flexGrow:1,
    justifyContent:'space-around',
    paddingTop:SPACING.space_20,
    paddingBottom:SPACING.space_20,
  },
  CategoryScrollViewContainer:{
    paddingHorizontal:SPACING.space_10,

  },
  CategoryScrollViewItem:{
    alignItems:'center',
  },
  CategoryText:{
    fontFamily:'Poppins-Light',
    fontSize:13,
    marginBottom:SPACING.space_4,
  },
  ActiveCategory:{
    height:6,
    width:6,
    borderRadius:BORDERRADIUS.radius_20,
    backgroundColor:COLORS.primaryRedHex,
  },
  NonActiveCategory:{
    height:6,
    width:6,
  },
  ScrollViewFlex:{
    flexGrow:1,
  },
  resultItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  TextHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackHex,
  },
})