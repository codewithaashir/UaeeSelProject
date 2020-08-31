import React,{useState, useContext, useEffect}  from 'react';
import { ScrollView, TouchableOpacity, } from 'react-native-gesture-handler';
import { StyleSheet,View,Text,Linking,Image} from 'react-native';
import { Languages,AppConstant, Colors, AuthContext } from '../../Utils';
import {Typography,CustomModel} from '../../Common';
import { Icon,Avatar } from 'react-native-elements';
import { Images } from '../../Assets';
import { useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-community/google-signin';
import Contact from './Contact';
import { LoginManager } from 'react-native-fbsdk'
import Language from './Language';



export default function Account(props){
    const User = useSelector(state=>state.User);
    const { signOut,log } = useContext(AuthContext);
    const [visibleContactModel,setvisibleContactModel]=useState(false); 
    const [visibleLanguageModel,setvisibleLanguageModel]=useState(false); 
    const [listITem,setList]=useState(User&&User.email ?AppConstant.profileLoggedItems(User,props.navigation,setvisibleContactModel,setvisibleLanguageModel,LogOut):AppConstant.profileLoginItems(User,props.navigation,setvisibleContactModel,setvisibleLanguageModel))
    useEffect(()=>{
        console.warn(User)
        GoogleSignin.configure({
            webClientId:
              "568875059269-d26i6vtn17qaff4ekrmff5dkiqiv14e8.apps.googleusercontent.com",
            offlineAccess: false
          });
    },[]);
    useEffect(()=>{
        setList(User&&User.email ?AppConstant.profileLoggedItems(User,props.navigation,setvisibleContactModel,setvisibleLanguageModel,LogOut):AppConstant.profileLoginItems(User,props.navigation,setvisibleContactModel,setvisibleLanguageModel,log))
    },[User||visibleLanguageModel])
    const LogOut = async ()=>{
        try { 
        if(User.account_type=='Google'){
        await  GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        }
        else if(User.account_type=='Facebook'){
            LoginManager.logOut()
        }
        signOut()
    } catch (error) {
        console.error(error)
    }
}
    const privacy=[
        {
            name:Languages.termCondition,
            onPress:()=>props.navigation.navigate('AppPages',{name:'term',title:Languages.termCondition})
        },
        {
            name:Languages.Privacy,
            onPress:()=>props.navigation.navigate('AppPages',{name:'privacy',title:Languages.Privacy})
        }]
    const social=[{name:'fb',onPress:()=>console.warn('ee')},{name:'insta',onPress:()=>console.warn('he')}]

    return(
        <ScrollView contentContainerStyle={{ padding:10}} scrollEventThrottle={1} showsVerticalScrollIndicator={false}>
         
         <View style={styles.accountInfo}>    
         <Typography variant="bold" style={{color:Colors.appRed,fontFamily:'Lato-Regular'}}>{Languages.AccountInformations}</Typography>
         <View  style={{width:40,backgroundColor:Colors.appBlue,height:4,marginTop:5,marginBottom:20}}/>
         <Avatar 
           //ImageComponent={()=>(<Image source={Images.categories}/>)}
           containerStyle={{borderRadius:50,backgroundColor:Colors.lightGreen,height:90,width:90,justifyContent:'center',alignItems:'center',padding:User&&User.profile_pic?0:20}}
           activeOpacity={0.7}
           source={User&&User.profile_pic?{uri:User.profile_pic}:Images.account}
           avatarStyle={{width:User&&User.profile_pic?90:40,height:User&&User.profile_pic?90:40,alignSelf:'center',alignItems:'center',justifyContent:'center'}}
           size={60}
           ///Component={()=>(<Image source={Images.categories}/>)}
         />
         {User && User.email?
         <>
         <TouchableOpacity style={[styles.listbtn,{justifyContent:'space-between'}]} activeOpacity={0.7} >   
         <Typography variant="bold" style={{color:Colors.appRed}}>{Languages.Name}</Typography>
         <Typography variant="bold" style={{color:Colors.appRed}}>{User.f_name +' '+User.l_name}</Typography>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.listbtn,{justifyContent:'space-between'}]} activeOpacity={0.7} >   
         <Typography variant="bold" style={{color:Colors.appRed}}>{Languages.Email}</Typography>
         <Typography variant="bold" style={{color:Colors.appRed}}>{User.email}</Typography>
         </TouchableOpacity>
         </>:
         <TouchableOpacity style={[styles.listbtn,{justifyContent:'space-between'}]} activeOpacity={0.7} >   
         <Typography variant="bold" style={{color:Colors.appRed}}>{Languages.Guest}</Typography>
         </TouchableOpacity>
         }
         
         </View>
         <View style={styles.reachedToUs}>
         <Typography variant="bold" style={{color:Colors.appRed,fontFamily:'Lato-Regular'}}>{Languages.ReachedOuttoUs}</Typography>
         <View  style={{width:40,backgroundColor:Colors.appBlue,height:4,marginTop:5}}/>
         {listITem.map((item)=>(
         <TouchableOpacity style={styles.listbtn} activeOpacity={0.7} onPress={item.title!=Languages.Logout?item.onPress:LogOut}>
             {item.icon}    
         <Typography variant="bold" style={{color:Colors.appRed,marginStart:20}}>{item.title}</Typography>
         <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}>
         {item.title!=Languages.Logout&&
         <Icon
           type="antdesign"
           name="right"
           color={Colors.appRed}
         />}
         </View>
         </TouchableOpacity>
          )
         )}
         </View> 
         <View style={styles.footer}>
             <View style={styles.socialSection}>
               {
                   social.map((item)=>(
                    <TouchableOpacity style={{marginHorizontal:15}} activeOpacity={0.7} onPress={item.onPress}>
                   <Icon type="font-awesome" name={item.name=='fb'?"facebook":"instagram"} color={Colors.appRed}/>
                   </TouchableOpacity>
                   ))
               }
             </View>
             <View style={styles.privacySection}>
                 {privacy.map((item)=>(
                <TouchableOpacity style={{marginHorizontal:5}} activeOpacity={0.7} onPress={item.onPress}>
                 <Text style={styles.name}>{item.name}</Text>
                 </TouchableOpacity> 
                 ))
                }   
             </View>
             <View style={styles.versionSection}>
             <Text style={styles.name}>{Languages.Version+' v1'}</Text>
             <TouchableOpacity style={{marginVertical:10}} activeOpacity={0.7} onPress={()=>Linking.openURL('https://uaesell.ae')} >
             <Text style={styles.name}>{'\u00A9'+'2020 uaesale.ae '+Languages.AllRights}</Text>
             </TouchableOpacity>
             </View>
         </View>  
         <CustomModel 
          visible={visibleContactModel}
          setVisible={()=>setvisibleContactModel(!visibleContactModel)}
         > 
            <Contact setVisible={()=>setvisibleContactModel(!visibleContactModel)} />
         </CustomModel>
         <CustomModel 
          visible={visibleLanguageModel}
          color={Colors.white}
          setVisible={()=>setvisibleLanguageModel(!visibleLanguageModel)}
         > 
         <Language setVisible={()=>setvisibleLanguageModel(!visibleLanguageModel)} />
         </CustomModel>           
        </ScrollView>    
    )
}  
const styles= StyleSheet.create({
    accountInfo:{
        flex:1,
       
    },
    LanguageContainer:{
     flexDirection:'column',
     justifyContent:'space-between'
    },
    reachedToUs:{
        flex:1,
        marginTop:20
    },
    listbtn:{
        flex:1,
        flexDirection:'row',
        borderBottomColor:Colors.disabled,
        borderBottomWidth:0.5,
        padding:15,
        //justifyContent:'space-between'
    },
    footer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center'
    },
    socialSection:{
       flex:1,
       flexDirection:'row',
       padding:10,
       flexWrap:'wrap'
    },
    privacySection:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    versionSection:{
        flex:1,
        justifyContent:'center',
        marginVertical:10,
        alignItems:'center',
        flexDirection:'column',
        flexWrap:'wrap'
    },
    name:{
        fontFamily:'Lato-Regular',
        fontSize:15,
        color:Colors.appRed+'50'
    }
    
})