import React from 'react';
import {StyleSheet, View,Dimensions, Image} from  'react-native';
import Typography from './Typography';
import {Colors} from '../Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { ParallaxImage } from 'react-native-snap-carousel';
import { ImgURl } from '../Config/Apis';
const {height,width} = Dimensions.get('window');
let opac='41'
//+(parseInt(opac)+index).toString()
export default function CategoriesItem(props){
    const {index,item} = props;
    console.warn(ImgURl+item.icon);
    const textStyle =
           index % 2 == 0
            ? { marginRight: 30, textAlign: "right",transform:[{translateY:-40}] }
            : { marginLeft: 30, textAlign: "left",transform:[{translateY:-40}] };
    return(
        <TouchableOpacity 
        activeOpacity={0.7}
        onPress={()=>props.navigation.navigate('CategoryProduct',{id:item.id,name:item.name})}
        hitSlop = { {top: 20, right: 20, left: 20, bottom: 20 }}
        style={[styles.container,{backgroundColor:index%2==0?
            Colors.appBlue
            :
            Colors.appRed,
            shadowColor:index%2==0?Colors.appBlue:Colors.appRed
        },   
            
             index % 2 == 0 && { alignItems: "flex-end" },
        index % 2 != 0 && { alignItems: "flex-start" }]}>
         
         <ParallaxImage
          source={{uri: ImgURl+item.icon}}
          containerStyle={styles.container}
          style={{
            ...StyleSheet.absoluteFillObject,
            resizeMode: 'cover',
          }}
          parallaxFactor={0.4}
          {...props.parallaxProps}
        />  
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
      shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 10,
      },
      shadowOpacity: 1.1,
      shadowRadius: 13.16,
      
      elevation: 10,
    }
})