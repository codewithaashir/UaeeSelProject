import React, { Component, useState } from 'react';
// import { Container, View, Left, Item, Input, Toast,Text,Content } from 'native-base';
import {Image,View,Text} from 'react-native';
import { NavBar, Modal, GradientBtn } from '../../Common';
import { Service } from '../../Config/Services';
import {Icon} from 'react-native-elements';
import {Colors,Languages} from '../../Utils';
import { ScrollView,TouchableOpacity } from 'react-native-gesture-handler';
import { Images } from '../../Assets';

export default function Language(props){
    const [active,setActive]=useState(Languages.English)
    const onChange = ()=>{
        Languages.setLanguage(active==Languages.English?'ar':'en')
        setActive(active==Languages.English?Languages.Arabic:Languages.English)
        props.setVisible()
    }
    return(
        <ScrollView 
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{backgroundColor:Colors.white,borderTopLeftRadius:20,borderTopRightRadius:20,borderTopColor:Colors.appRed,borderTopWidth:10}}
          >

          <View
            style={{justifyContent:'flex-end',alignItems:'flex-end',padding:10}}
            onTouchEnd={() => props.setVisible()}
            >
                <Icon name="closecircle" type="antdesign" color={Colors.appBlue}/>
            </View>
            <View style={{ flexDirection:'column',padding:10}}>

                  <View style={{flex:1,flexDirection:'row',backgroundColor:active==Languages.English?Colors.appRed:Colors.appRed+'43',borderRadius:20,height:50,padding:10}}
                  onTouchEnd={()=>{Languages.setLanguage('en');setActive(Languages.English);props.setVisible()}}
                  >
                  <Image source={Images.language} style={{width:25,height:25,tintColor:active==Languages.English?Colors.white:Colors.appRed,resizeMode:'contain'}} />
                  <Text style={{fontFamily:'Lato-Bold',fontSize:16,color:active==Languages.English?Colors.white:Colors.appRed,padding:5}}>{Languages.English}</Text>
                 </View>
                  <View style={{flex:1,flexDirection:'row',backgroundColor:active==Languages.Arabic?Colors.appRed:Colors.appRed+'43',borderRadius:20,height:50,padding:10,marginTop:10}}
                  onTouchEnd={()=>{Languages.setLanguage('ar');setActive(Languages.Arabic);props.setVisible()}}
                  > 
                  <Image source={Images.language} style={{width:25,height:25,tintColor:active==Languages.Arabic?Colors.white:Colors.appRed,resizeMode:'contain'}} />
                  <Text style={{fontFamily:'Lato-Bold',fontSize:16,color:active==Languages.Arabic?Colors.white:Colors.appRed,padding:5}}>{Languages.Arabic}</Text>
                 </View>
            </View>
            <View onTouchEnd={()=>setActive(active==Languages.English?Languages.Arabic:Languages.English)}>
            <GradientBtn
              title={Languages.SwitchLanguage}
              onPress={onChange}
            />
            </View>
            </ScrollView>
    )
}