import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import { SPACING } from '../theme/theme';

const DetailScreen = ({navigation}:any) => {
  const [searchQuery, setSearchQuery] = useState('');
  // const {searchQuery} = route.params;
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(() => {
    // Focus the search bar input field when the detail screen is focused
    inputRef.current?.focus();
  });

  return (
    <View style={styles.container}>
      <View style={{
        marginTop:SPACING.space_30, 
        paddingLeft:SPACING.space_30, 
        paddingRight:SPACING.space_30}}
      >
        <SearchBar 
          clickHandler={()=>{}} 
          value={searchQuery} 
          onChangeText={(text:string) => setSearchQuery(text)}
          inputRef={inputRef} 
        />
      </View>
      
      {/* <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      /> */}
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
})