import React from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'native-base';
import { Image, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {Colors} from '../Utils';
import { Images } from '../Assets';
const {height,width}=Dimensions.get('window');
import FastImage from 'react-native-fast-image'
export default function AppHeader(props){
    return(
        <Header
        style={styles.header}
        rounded={true}
        backgroundColor={Colors.white}
        androidStatusBarColor={Colors.white}
        noShadow={true}
        >
         <Body style={styles.body}>
         <FastImage
           style={styles.headerlogo}
           source={
            Images.headerLogo
           }
           resizeMode={FastImage.resizeMode.contain}
          />
          {/* <Image source={Images.headerLogo} style={styles.headerlogo}/> */}
        </Body>
        <Right>
          <TouchableOpacity activeOpacity={0.7}>
          <Icon name='ios-search' style={{ color: Colors.appRed }}/>
          </TouchableOpacity>      
        </Right>    
        </Header>   
    )
}
const styles=StyleSheet.create({
    header:{ 
        backgroundColor: Colors.white,
        height:height*0.09,
        borderBottomLeftRadius:14,
        borderBottomRightRadius:14,
    },
    headerlogo:{
        width:150,
        height:70,
        resizeMode:"contain" 
    },
    body: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },   
})