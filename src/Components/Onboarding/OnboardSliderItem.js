import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, Image } from 'react-native'
import Colors from '../../Utils/Colors';
const width = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;
import FastImage from 'react-native-fast-image'
export const Slider_Height= 0.61 * maxHeight;

export const OnBoardSubSlide = ({subtitle, description}) =>{
        return (
         
              <View style={[styles.subtitleContainer]}>  
              <Text style={styles.subtitle}>
               {subtitle}   
             </Text>  
             <Text style={styles.description}>
               {description}   
             </Text>  
             </View> 
        ); 
}
function OnboardSliderItem({title,right,image}) {
    const transform = [
        {translateY:(Slider_Height-100)/2},
        {translateX:right? (width / 2) - 50 : (-width / 2) + 50 },
        {rotate:right?"-90deg":"90deg"}
    ]
    return (
        <View style={styles.root}>
          {image&&
           <FastImage
           style={{...StyleSheet.absoluteFill,width:'auto',height:'auto',resizeMode:'contain'}}
           source={{
               uri: image,
               priority: FastImage.priority.high,
           }}
           resizeMode={FastImage.resizeMode.contain}
          />
        //    <Image
        //      source={{uri:'https://www.freeiconspng.com/thumbs/men-suit-png/men-suit-png-19.png'}}
        //      style={{...StyleSheet.absoluteFill,width:'auto',height:'auto',resizeMode:'contain'}}
        //    />
          }  
          <View style={[styles.titleContainer,{transform}]}>  
          <Text style={[styles.title,right?{borderBottomLeftRadius:40,borderTopRightRadius:50}:{borderBottomRightRadius:50,borderTopLeftRadius:50}]}>
           {title}   
         </Text>  
         </View>
        </View>    
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    title:{
        fontFamily:'Lato-Bold',
        color:Colors.white,
        backgroundColor:Colors.appBlue+'20',
        padding:10,
        fontSize:80,
    },
    subtitleContainer:{
        flex:1,
        flexDirection:'column',
        //paddingTop:30,
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    subtitle:{
        fontFamily:'Lato-Bold',
        textAlign:'center',
        color:Colors.mediumBlack,
        fontSize:24,
        lineHeight:30
    },
    description:{
        fontFamily:'Lato-Bold',
        textAlign:'center',
        color:Colors.magenta,
        lineHeight:24,
        fontSize:16,
    }
    
})

export default OnboardSliderItem;