import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { COLORS, SPACING } from '../theme/theme';

interface CalendarInputProps {
  label?:string;
  date:Date | undefined;
  // setDate:any,
  dateString:string,
  // setDateString:any,
  changeHandler:any;
  pressHandler:any;
  show:boolean;
}


const CalendarInput:React.FC<CalendarInputProps> = ({label,date,dateString,changeHandler,pressHandler,show}) => {
  // const [date, setDate] = useState<Date | undefined>(new Date());
  // const [show, setShow] = useState(false);
  // const [dateString, setDateString] = useState<string>('');

  // const onChange = (event: any, selectedDate?: Date | undefined) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  //   setDateString(moment(currentDate).format('YYYY-MM-DD'));
  // };

  // const showDatePicker = () => {
  //   setShow(true);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <TouchableOpacity onPress={pressHandler} style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Select Date"
          value={dateString}
          editable={false}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={changeHandler}
          minimumDate={new Date()}
          style={{ backgroundColor: 'white' }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:SPACING.space_18
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 16,
  },
  labelText:{
    alignSelf:'flex-start', 
    fontFamily:'Poppins-Light',
    fontSize:14, 
    marginBottom:5,
    color:COLORS.primaryLightGreyHex,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal:12,
    width: '100%',
  },
  textInput: {
    fontFamily:'Poppins-Medium',
    fontSize: 12,
    color: '#000',
  },
});

export default CalendarInput;