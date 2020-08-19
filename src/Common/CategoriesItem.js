import React from 'react';
import {StyleSheet, View,Dimensions} from  'react-native';
import Typography from './Typography';
import {Colors} from '../Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
const {height,width} = Dimensions.get('window');
let opac='41'
export default function CategoriesItem(props){
    const {index,item} = props;
    const textStyle =
           index % 2 == 0
            ? { marginRight: 30, textAlign: "right" }
            : { marginLeft: 30, textAlign: "left" };
    return(
        <TouchableOpacity 
        activeOpacity={0.7}
        hitSlop = { {top: 20, right: 20, left: 20, bottom: 20 }}
        style={[styles.container,{backgroundColor:index%2==0?
            Colors.appBlue+(parseInt(opac)+index).toString()
            :
            Colors.appRed+(parseInt(opac)+index).toString()
        },
             index % 2 == 0 && { alignItems: "flex-end" },
        index % 2 != 0 && { alignItems: "flex-start" }]}>
         <Typography variant="category" numberOfLines={2} style={textStyle}>{item.name?item.name:''}</Typography>   
        </TouchableOpacity>    
    )
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:10,
      height:height*0.17,
      borderRadius:20,
      
    }
})