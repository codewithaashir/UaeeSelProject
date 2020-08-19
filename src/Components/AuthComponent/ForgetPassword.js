/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useContext, useEffect, Children } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, StatusBar, YellowBox, Dimensions, LogBox } from 'react-native';
import { adduserdata } from '../../Redux/Reducer/User';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { InputComponent,CustomDesign,TextButton, AnimatedView, ErrorHandler, Modal } from '../../Common';
import { useDispatch } from 'react-redux';
import { OnBoardSubSlide } from '../Onboarding/OnboardSliderItem';
import {Languages,NavService,Colors,AuthContext} from '../../Utils';
import { Icon } from 'react-native-elements';
function ForgotPassword(props) {
    LogBox.ignoreLogs(['Warning: ...']);
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
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [allFilled] = useState(false);
    const { signIn } = useContext(AuthContext);

    // const filled = () => {
    //     if (email && password) toggleAllFilled(true)
    //     else toggleAllFilled(false)
    // }

    const handleForgot= async () => {
        if (formIsValid) {
            setModalVisible(true);
            const data = {};
            for (let formElementID in loginForm) {
                data[formElementID] = loginForm[formElementID].value;
            }
            await signIn(data, rememberMe, adduserData, setLoading, setResponseError, setModalVisible);
        } else {
            setResponseError('Invalid username or password');
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
    const dispatch = useDispatch();
    const adduserData = data => dispatch(adduserdata(data));
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
    <OnBoardSubSlide subtitle={Languages.ForgotPassword} description={Languages.ForgotPasswordDescription} />
    <View style={styles.inputContainer}>
        {form}
    </View>
    <ErrorHandler errorMessage={responseError} />
    <TextButton
      onPress={() => handleForgot}
     >
         {Languages.ResetPassword}   
    </TextButton>
    <Modal
        visible={modalVisible}
        setVisible={setModalVisible}
        loading={loading}
        description={responseError} />
   </View>
   )

   const Footer=(
    <View style={styles.footer}>
       <TouchableOpacity style={{ justifyContent: 'flex-end' }}
        activeOpacity={0.7}
        onPress={() => NavService.goBack(props.navigation)}>
        <Icon name="leftcircleo" type="antdesign" size={40} color={Colors.white} />
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
    padding:40,
    //borderRadius:50,
    //backgroundColor:Colors.white,
    justifyContent:'center',
    alignItems:'center'
    },
    inputContainer: {
        marginTop: 70,
        width: '100%',
    },
});

export default ForgotPassword;
