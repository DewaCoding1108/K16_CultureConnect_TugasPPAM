import {
    Dimensions,
    ImageBackground,
    ImageProps,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import Icon from 'react-native-vector-icons/FontAwesome';
 
const CARD_WIDTH = Dimensions.get("window").width;

interface PaymentTableProps {
    name: String;
    price: number;
  }
  const PesananCard: React.FC<PaymentTableProps> = ({
    name,
    price
}) => {
    return(
        <View>
            
        </View>
    );};
