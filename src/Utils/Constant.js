import Languages from "./Languages";
import { Icon } from "react-native-elements";
import {Linking,Image} from 'react-native';
import { Colors } from ".";
import React from 'react';
import { Images } from "../Assets";
export const Constant = {
profileLoginItems : (User,navigation,setvisibleContactModel,setvisibleLanguageModel,log) => {
    return ([
    {
        title:'WhatsApp',
        icon:<Icon type="font-awesome" name="whatsapp" color={Colors.appRed}/>,
        onPress:()=>Linking.openURL(`whatsapp://send?phone=${'0343247691'}&text=${'from UaeSell App'}`)
    },
    {
        title:Languages.Language,
        icon:<Image source={Images.language} style={{width:25,height:25,tintColor:Colors.appRed,resizeMode:'contain'}} />,
        onPress:()=>setvisibleLanguageModel(true)    
    },
    {
        title:Languages.contactus,
        icon:<Icon type="material-community" name="email-outline" color={Colors.appRed}/>,
        onPress:()=>setvisibleContactModel(true)  
    },
    {
        title:Languages.About,
        icon:<Icon type="antdesign" name="exclamationcircleo" color={Colors.appRed}/>,
        onPress:()=>navigation.navigate('AppPages',{name:'about',title:Languages.About})
    },
    {
        title:Languages.Login,
        icon:<Icon type="material-community" name="login" color={Colors.appRed}/>,
        onPress:()=>log(navigation)
    },
])
},
profileLoggedItems : (User,navigation,setvisibleContactModel,setvisibleLanguageModel,signout) =>{
    return ([
        {
            title:'WhatsApp',
            icon:<Icon type="font-awesome" name="whatsapp" color={Colors.appRed}/>,
            onPress:()=>Linking.openURL(`whatsapp://send?phone=${'+923422439975'}&text=${'from UaeSell App'}`)
        },
        {
            title:Languages.MyOrder,
            icon:<Icon type="font-awesome"  name="shopping-bag" color={Colors.appRed}/>,
            onPress:()=>console.warn('heelo')
        },
        {
            title:Languages.Address,
            icon:<Icon type="material" name="pin-drop" color={Colors.appRed}/>,
            onPress:()=>console.warn('heelo')
        },
        {
            title:Languages.Language,
            icon:<Image source={Images.language} style={{width:25,height:25,tintColor:Colors.appRed,resizeMode:'contain'}} />,
            onPress:()=>setvisibleLanguageModel(true)        
        },
        {
            title:Languages.contactus,
            icon:<Icon type="material-community" name="email-outline" color={Colors.appRed}/>,
            onPress:()=>setvisibleContactModel(true)
        },
        {
            title:Languages.About,
            icon:<Icon type="antdesign" name="exclamationcircleo" color={Colors.appRed}/>,
            onPress:()=>navigation.navigate('AppPages',{name:'about',title:Languages.About})
        },
        {
            title:Languages.Logout,
            onPress:()=>signout(),
            icon:<Icon type="material-community" name="logout" color={Colors.appRed}/>,
        },

    ]) 
}
}