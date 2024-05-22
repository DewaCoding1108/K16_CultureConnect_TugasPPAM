import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';

interface SearchBarProps{
  clickHandler:any;
  value:string,
  onChangeText:any,
  editable?:boolean,
  inputRef?:any,
  submitHandler?:any;
}

const SearchBar:React.FC<SearchBarProps> = ({clickHandler, value, onChangeText, editable=true, inputRef, submitHandler=()=>{}}) => {
  return (
    <TouchableOpacity onPress={clickHandler} style={styles.InputContainerComponent} activeOpacity={0.7}>
          <Ionicons
            style={styles.InputIcon}
            name={"search-sharp"}
            size={25}
            color={COLORS.primaryBlackHex}
          />
          {/* <Text style={styles.TextInputContainer}>Search All You Need!</Text> */}
          <TextInput
            style={styles.TextInputContainer}
            placeholder="Search..."
            autoFocus={true}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            ref={inputRef}
            onSubmitEditing={submitHandler}
          />
    </TouchableOpacity>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  InputContainerComponent: {
    padding:5,
    width:'95%',
    marginTop: SPACING.space_16,
    borderWidth:1,
    borderColor:'#A19C9C',
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.primaryWhiteHex,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems:'center',
  },
  InputIcon: {
    marginTop:SPACING.space_2,
    marginLeft:SPACING.space_10,
    marginRight:SPACING.space_10,
  },
  TextInputContainer: {
    marginTop:SPACING.space_2,
    width:'100%',
    fontFamily:'Poppins-Medium',
    fontSize:FONTSIZE.size_12,
  },
})