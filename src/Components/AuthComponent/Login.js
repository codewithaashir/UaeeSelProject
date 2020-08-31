/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useContext, useEffect, Children } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, StatusBar, YellowBox, Dimensions, LogBox } from 'react-native';
import { adduserdata } from '../../Redux/Reducer/User';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { InputComponent,CustomDesign,TextButton, AnimatedView, ErrorHandler, Modal, Checkbox } from '../../Common';
import { useDispatch } from 'react-redux';
import { OnBoardSubSlide } from '../Onboarding/OnboardSliderItem';
import {Languages,NavService,Colors,AuthContext} from '../../Utils';
import { Icon } from 'react-native-elements';
import { GoogleSignin, statusCodes } from "@react-native-community/google-signin";
import auth, { firebase } from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager
  } from "react-native-fbsdk";
  import {} from "@react-native-firebase/app";
import { Toast } from 'native-base';
import { Service } from '../../Config/Services';

  function Login(props) {
    LogBox.ignoreLogs(['Warning: ...']);
    const { signIn } = useContext(AuthContext);
    const dispatch = useDispatch();
    const adduserData = data => dispatch(adduserdata(data));
    const [rememberMe, setRememberMe] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [allFilled] = useState(false);
    var param = new FormData();
   const InfoCallback = async (error: ?Object, result: ?Object) => {
      if (!error) {
        // console.warn(error);
        // } else {
        // Toast.show({
        //   text: "Welcome " + result.name,
        //   type: "success"
        // });
        var token = await firebase.messaging().getToken()
          if (token) {
            param.append("f_name", result.name.split(' ')[0]);
            param.append("l_name", result.name.split(' ')[1]);
            param.append("email", result.email);
            param.append("profile_pic", result.picture.data.url);
            param.append("account_type", "Facebook");
            param.append("device_id", token);
            await signIn(param,'socialLogin', rememberMe, adduserData, setLoading, setResponseError, setModalVisible,props.navigation);    
        }
        else {
          console.warn('error')
        }
      }
    };
   const  _signInWithFacebook = () => {
      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        result => {
          if (result.isCancelled) {
            // Toast.show({
            //   text: "Canceled",
            //   type: "warning"
            // });
          } else {
            const info = new GraphRequest(
              "/me",
              {
                parameters: {
                  fields: {
                    string: "id,email,name,picture.type(large)"
                  }
                }
              },
              InfoCallback
            );
            new GraphRequestManager().addRequest(info).start();
          }
        }
      );
    };
   const _signInWithGoogle = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        var token = await firebase.messaging().getToken();
        if (token) {
          param.append("f_name", userInfo.user.givenName);
          param.append("l_name", userInfo.user.familyName);
          param.append("email", userInfo.user.email);
          param.append("profile_pic", userInfo.user.photo);
          param.append("account_type", "Google");
          param.append("device_id", token);
          await signIn(param,'socialLogin', rememberMe, adduserData, setLoading, setResponseError, setModalVisible,props.navigation);    
        }
        else {
          Toast.show({
            text: "Error, Please try again later",
            type: "warning"
          });
        }
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // sign in was cancelled
          // Toast.show({
          //   text: "Canceled",
          //   type: "warning"
          // });
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation in progress already
          Toast.show({
            text: "In Progress",
            type: "success"
          });
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Toast.show({
            text: "Google Play Services out-dated",
            type: "warning"
          });
        } else {
          Toast.show({
            text: error.toString(),
            type: "warning"
          });
        }
      }
    };
    const Social=[{name:'facebook-f',onPress:()=>_signInWithFacebook()},{name:'google',onPress:()=>_signInWithGoogle()}]
    const [loginForm, updateLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                name: 'email',
                placeholder: Languages.Email,
                keyboardType: 'email-address',
                autoCapitalize: 'none',
            },
            value: '',
            validation: {
                required: true,
                lowerCase: true,
                email: true,
            },
            valid: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                name: 'password',
                placeholder: Languages.Password,
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
        },
    });

  


    // const filled = () => {
    //     if (email && password) toggleAllFilled(true)
    //     else toggleAllFilled(false)
    // }
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId:
              "568875059269-d26i6vtn17qaff4ekrmff5dkiqiv14e8.apps.googleusercontent.com",
            offlineAccess: false
          });
    },[])

    const handleLogin = async () => {
        if (formIsValid) {
            setModalVisible(true);
            const form = new FormData();
            for (let formElementID in loginForm) {
                form.append(loginForm[formElementID].elementConfig.name, loginForm[formElementID].value);
            }
            await signIn(form, rememberMe, adduserData, setLoading, setResponseError, setModalVisible,props.navigation);
        } else {
            setResponseError(Languages.InvalidEmail+' or '+ Languages.IncorrectPassword);
        }
    };

    const emailRE = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

    const checkValidity = (value, validation) => {
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.lowerCase) {
            value = value.toLowerCase();
            isValid = isNaN(value) && isValid;
        }
        if (validation.email) {
            isValid = emailRE.test(value) && isValid;
        }
        return isValid;
    };
    const inputChangeHandler = (inputID, value) => {
        setResponseError('');
        const updatedForm = {
            ...loginForm,
        };
        const updatedFormElement = {
            ...updatedForm[inputID],
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.touched = true;
        updatedForm[inputID] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifer in updatedForm) {
            formIsValid = updatedForm[inputIdentifer].valid && formIsValid;
        }
        updateLoginForm(updatedForm);
        setFormIsValid(formIsValid);
    };
  
    // if (loading) return <AppLoader />


    const formElementsArray = [];
    for (let key in loginForm) {
        formElementsArray.push({
            id: key,
            config: loginForm[key],
        });
    }
    let form = (
        formElementsArray.map(element => (
            <InputComponent
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                shouldValidate={element.config.validation}
                change={inputChangeHandler.bind(this, element.id)}
            />
        ))
    );

   const  Body=(
    <View style={styles.root}>
    <View style={{padding:20}}/>
    <OnBoardSubSlide subtitle={Languages.Welcome} description={Languages.WelcomeDescription} />
    <View style={styles.inputContainer}>
        {form}
    </View>
    <ErrorHandler errorMessage={responseError} />
    <View style={styles.rember_forget}>
        <Checkbox
            style={styles.rememberMe}
            title={Languages.RememberMe}
            status={rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
        />
        <TextButton
            light
            onPress={() => NavService.goTo('ForgetPassword',props.navigation)} 
        >
         {Languages.ForgotPassword}   
        </TextButton>
    </View>
    <TextButton
      onPress={handleLogin}
     >
         {Languages.Login}   
    </TextButton>
  
    <Modal
        visible={modalVisible}
        setVisible={setModalVisible}
        loading={loading}
        description={responseError} />
   </View>
   )

   const Footer=(
    <View style={[styles.footer,{flexDirection:'column',padding:0}]}>   
    <View style={styles.footer}>
       {Social.map(item=>(
        <View  style={styles.footerItem} onTouchEnd={item.onPress}>   
        <Icon
         underlayColor="transparent"
         name={item.name}
         type="font-awesome"
         color={item.name=='google'?Colors.appRed:Colors.appBlue}
         iconStyle={{ marginRight: 10 }}
         hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
         //onPress={() => setHide(!hide)}
        />
        </View>
       ))}
    </View>
    
            <TouchableOpacity
            style={{flexDirection:'row'}}
            onPress={() => NavService.goTo('Signup',props.navigation)} 
             >
              <Text
                style={{fontSize: 13, fontWeight: '800', color:Colors.white}}>
                {Languages.HaveAccountSignup}
              </Text>      
              <Text style={{fontSize: 14, color: Colors.lightGray}}> {Languages.signup} </Text>
            </TouchableOpacity>
    </View>   
    ) 
    return (
        <CustomDesign Body={Body} Footer={Footer}/>
    );
}



const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    footer:{
    flexDirection:'row',
    padding:20,
    justifyContent:'center',
    alignItems:'center'
    },
    socialText: {
        color: Colors.gray,
        marginLeft: 18,
        fontSize: 10,
        fontFamily: 'Lato-Regular',
    },
    rember_forget: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainer: {
        marginTop: 70,
        width: '100%',
    },
    rememberMe: {
        marginBottom: 20,
        alignSelf: 'flex-end',
    },
    footerItem:{
        height:50,
        width:50,
        marginStart:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.white,
        paddingLeft:10,
        borderRadius:25,
        shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    }
});

export default Login;
