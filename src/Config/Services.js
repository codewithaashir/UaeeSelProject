import Axios from 'axios';
import { NavService } from '../Utils';
import { Apis, ImgURl, HeaderSend } from './Apis';
import AsyncStorage from '@react-native-community/async-storage';
export const Service = {
    Signup:async(state,navigation,loading,responseMessage)=>{
     loading(true);
     await Axios.post(Apis.Signup,state).then(res=>{
        if(res.data.status=="success"){ 
        loading(false);
        console.log(res);
        responseMessage(res.data.msg);
        NavService.goTo('Login',navigation);
        }
        else{
            loading(false);
            responseMessage(res.data.msg);
        }
     }).catch(err=>{
        loading(false);
        responseMessage(err.message);
     })   

    },
    SocialSignIn:async (state, rememberMe, adduserData, loading, setUserToken, message, modalVisible,navigation)=>{
        loading(true);
        await Axios.post(Apis.SociaLogin,state).then(res=>{         
            if(res.data.status=="success"){
                console.log(res);
                message(res.data.msg);
                if (rememberMe) {
                    AsyncStorage.setItem('@userToken', res.data.data.token);
                    AsyncStorage.setItem('@user', JSON.stringify(res.data.data.user));
                }
                setUserToken(res.data.data.token);
                loading(false);
                modalVisible(false);
                adduserData(res.data.data.user);
                global.User=res.data.data.user
                global.Token=res.data.data.token 
                NavService.goTo('Login',navigation);
              }
              else{
                loading(false);
                message(res.data.msg);
              } 
        }).catch(err=>{
           loading(false);
           message(err.message);
        })   
    },
    Login:async (state, rememberMe, adduserData, loading, setUserToken, message, modalVisible,navigation)=>{
        loading(true);
        await Axios.post(Apis.Login,state).then(res=>{         
            if(res.data.status=="success"){
                console.log(res);
                message(res.data.msg);
                if (rememberMe) {
                    AsyncStorage.setItem('@userToken', res.data.data.token);
                    AsyncStorage.setItem('@user', JSON.stringify(res.data.data.user));
                }
                setUserToken(res.data.data.token);
                loading(false);
                modalVisible(false);
                adduserData(res.data.data.user);
                global.User=res.data.data.user
                global.Token=res.data.data.token 
                NavService.goTo('Login',navigation);
              }
              else{
                loading(false);
                message(res.data.msg);
              } 
        }).catch(err=>{
           loading(false);
           message(err.message);
        })   
    },
    getCategories:async(setState,loading,responseMessage)=>{
        loading(true);
        await Axios.get(Apis.Categories).then(res=>{
           if(res.data.status=="success"){ 
           loading(false);
           setState(res.data.data);
           }
           else{
               loading(false);
               responseMessage(res.data.msg);
           }
        }).catch(err=>{
           loading(false);
           responseMessage(err.message);
        })   
   
       },
       getBanners:async(setState,loading,responseMessage)=>{
        //loading(true);
        await Axios.get(Apis.getBanners).then(res=>{
           if(res.data.status=="success"){ 
           //loading(false);
           setState(res.data.data);
           }
           else{
               //loading(false);
               //responseMessage(res.data.msg);
           }
        }).catch(err=>{
           //loading(false);
           //responseMessage(err.message);
        })   
   
       },
       getOnBoarding:async(setState,loading,responseMessage)=>{
        //loading(true);
        await Axios.get(Apis.getOnboarding).then(res=>{
           if(res.data.status=="success"){ 
           //loading(false);
           setState(res.data.data.data);
           }
           else{
               //loading(false);
               //responseMessage(res.data.msg);
           }
        }).catch(err=>{
           //loading(false);
           //responseMessage(err.message);
        })   
   
       }, 
       getPage:async(setState,loading,responseMessage)=>{
        loading(true);
        await Axios.get(Apis.getPage).then(res=>{
           if(res.data.status=="success"){ 
           loading(false);
           setState(res.data.data);
           }
           else{
               loading(false);
               //responseMessage(res.data.msg);
           }
        }).catch(err=>{
           loading(false);
           //responseMessage(err.message);
        })   
   
       }, 
     getFeaturedProduct:async(setState,loading,responseMessage)=>{
        loading(true);
        await Axios.get(Apis.featuredProducts).then(res=>{
           if(res.data.status=="success"){ 
           loading(false);
           setState(res.data.data);
           console.warn(res.data.data)
           }
           else{
               loading(false);
               responseMessage(res.data.msg);
           }
        }).catch(err=>{
           loading(false);
           responseMessage(err.message);
        })   
   
       },   
   };