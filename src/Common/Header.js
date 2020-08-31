import React,{useState,useEffect} from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'native-base';
import { Image, View, TouchableOpacity, StyleSheet, Dimensions,StatusBar, Text } from 'react-native';
import {Colors} from '../Utils';
import { Images } from '../Assets';
import Animated,{ Easing, } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image'
export default function AppHeader(props){
    const [height,setHeight]=useState(Dimensions.get('window').height)
    const [tranformHieght,setTranformHieght] = useState(new Animated.Value(height));
    //Easing.bezier(.3,.51,.78,.49)
    useEffect(()=>{
        Animated.timing(tranformHieght, {
          toValue: height*0.14,
          duration: 400,
          easing: Easing.bezier(0, 1.19, 0.74, 1.2)
        }).start();
        //setHeight(Dimensions.get('window').height);
      },[]);
    return(
         <Animated.View style={[styles.header,{height:tranformHieght}]}>
         <StatusBar backgroundColor={Colors.white}/>       
         <Body style={styles.body}>
         <FastImage
           style={styles.headerlogo}
           source={
            Images.headerLogo
           }
           resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={{color:Colors.appBlue,fontSize:16,fontWeight:'bold'}}>{new Date().toDateString()}</Text>
          {/* <Image source={Images.headerLogo} style={styles.headerlogo}/> */}
        </Body>
        {height&&
         <Right>
          <TouchableOpacity activeOpacity={0.7}>
          <Icon name='ios-search' style={{ color: Colors.appRed }}/>
          </TouchableOpacity>      
        </Right>
        }
        </Animated.View>    
    )
}
const styles=StyleSheet.create({
    header:{ 
        backgroundColor: Colors.white,
        flexDirection:'row',
        padding:5,
        borderBottomLeftRadius:14,
        borderBottomWidth:10,
        borderColor:Colors.appRed,
        borderBottomRightRadius:14,
    },
    headerlogo:{
        width:150,
        height:48,
        resizeMode:"contain" 
    },
    body: {
        flex:1,
        paddingTop:35,
        justifyContent: 'center',
        alignItems: 'center'
    },   
})