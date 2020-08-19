/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useContext, useEffect, Children } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, StatusBar, YellowBox, Dimensions, LogBox } from 'react-native';
import { addsignupdata } from '../../Redux/Reducer/SignUp';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { InputComponent,CustomDesign,TextButton, AnimatedView, ErrorHandler, Modal, Checkbox } from '../../Common';
import { useDispatch ,useSelector} from 'react-redux';
import { OnBoardSubSlide } from '../Onboarding/OnboardSliderItem';
import {Languages,NavService,Colors,AuthContext} from '../../Utils';
import { Icon } from 'react-native-elements';
function Signup(props) {
    LogBox.ignoreLogs(['Warning: ...']);
    YellowBox.ignoreWarnings(['FlatList: Calling `getNode()`']);

    props.navigation.setOptions({ headerMode: 'none' });

    const signUpData = useSelector(state => state.SignUp);
    const dispatch = useDispatch();
    const addSignupData = data => dispatch(addsignupdata(data));

    const [signUpForm, updateSignUpForm] = useState({
        firstName: {
            elementType: 'input',
            elementConfig: {
                name: 'f_name',
                placeholder: Languages.FirstName,
                keyboardType: 'default',
                autoCapitalize: 'words',
            },
            value: signUpData.name,
            validation: {
                required: true,
                isNaN: true,
            },
            showError: false,
            errorMessage: 'Name cannot contain a number',
            valid: false,
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                name: 'l_name',
                placeholder: Languages.LastName,
                keyboardType: 'default',
                autoCapitalize: 'words',
            },
            value: signUpData.name,
            validation: {
                required: true,
                isNaN: true,
            },
            showError: false,
            errorMessage: 'Name cannot contain a number',
            valid: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                name: 'email',
                placeholder: Languages.EnterYourEmail,
                autoCapitalize: 'none',
                keyboardType: 'email-address',
            },
            value: signUpData.email,
            validation: {
                required: true,
                lowerCase: true,
                email: true,
            },
            showError: false,
            errorMessage: Languages.InvalidEmail,
            valid: false,
        },

        phone: {
            elementType: 'input',
            elementConfig: {
                name: 'phone_no',
                placeholder:Languages.EnterYourPhone,
                keyboardType: 'phone-pad',
            },
            value: signUpData.phone,
            validation: {
                required: true,
                number: true,
                maxLength: 15,
            },
            showError: false,
            errorMessage: 'Please enter a valid phone number',
            valid: false,
        },
        gender: {
            elementType: 'radio',
            elementConfig: {
                name: 'gender',
                radio: [
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                ],

            },
            value: signUpData.gender,
            validation: {
                required: true,
            },
            showError: false,
            errorMessage:Languages.SelectAGender,
            valid: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                name: 'password',
                placeholder: Languages.Password,
            },
            value: signUpData.password,
            validation: {
                required: true,
                minLength: 6,
            },
            showError: false,
            errorMessage: Languages.IncorrectPassword,
            valid: false,
        },
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [formFilled, setFormFilled] = useState(false);
    const { signUp } = useContext(AuthContext);
    const filled = () => {
        if (signUpData.name && signUpData.email &&
            signUpData.password && signUpData.mobile 
            && signUpData.gender) {
            setFormFilled(true);
        }
        else setFormFilled(false);
    };
    const handleSignUp= async () => {
        if (formIsValid) {
            setModalVisible(true);
            const form = new FormData();
            for (let formElementID in signUpForm) {
                form.append(signUpForm[formElementID].elementConfig.name, signUpForm[formElementID].value);
            }
            await signUp(form,props.navigation,setLoading,setResponseError);
        } else {
            setResponseError(Languages.InvalidFieldsEntered);
        }
    };
   
    useEffect(() => {
        filled();
        for (let formElementIdentifier in signUpForm) {
            let value = signUpForm[formElementIdentifier].value;
            let validation = signUpForm[formElementIdentifier].validation;
            signUpForm[formElementIdentifier].valid = checkValidity(value, validation);
        }
        let validity = true;
        for (let inputIdentifer in signUpForm) {
            validity = signUpForm[inputIdentifer].valid && validity;
        }
        setFormIsValid(validity);
        // console.log('data', signUpForm)
        // console.log('validity', formIsValid)
    }, []);

    const emailRE = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

    const checkValidity = (value, validation) => {
        let isValid = true;
        if (validation.required) {
            isValid = value !== '' && isValid;
        }
        if (validation.isNaN) {
            isValid = isNaN(value) && isValid;
        }
        if (validation.lowerCase) {
            value = value.toLowerCase();
            isValid = isNaN(value) && isValid;
        }
        if (validation.number) {
            isValid = isNaN(value) == false && isValid;
        }
        if (validation.maxLength) {
            isValid = value && value.length <= validation.maxLength && isValid;
        }
        if (validation.minLength) {
            isValid = value && value.length >= validation.minLength && isValid;
        }
        if (validation.email) {
            value = value.trim();
            isValid = emailRE.test(value) && isValid;
        }

        return isValid;
    };

    const inputChangeHandler = (inputID, value) => {
        setResponseError('');
        const updatedForm = {
            ...signUpForm,
        };
        const updatedFormElement = {
            ...updatedForm[inputID],
        };
        updatedFormElement.showError = false;
        updatedFormElement.value = value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        if (!updatedFormElement.valid) {
            updatedFormElement.showError = true;
        }
        // updatedFormElement.touched = true;
        updatedForm[inputID] = updatedFormElement;
        if (updatedForm[inputID].elementConfig.name !== 'location') {
            let obj = {
                name: updatedForm[inputID].elementConfig.name,
                value: updatedForm[inputID].value,
            };
            addSignupData(obj);
        }

        let formIsValid = true;
        for (let inputIdentifer in updatedForm) {
            formIsValid = updatedForm[inputIdentifer].valid && formIsValid;
        }
        filled();
        updateSignUpForm(updatedForm);
        setFormIsValid(formIsValid);
    };

    const formElementsArray = [];
    for (let key in signUpForm) {
        formElementsArray.push({
            id: key,
            config: signUpForm[key],
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
    <ScrollView contentContainerStyle={styles.root}>
    <View style={{padding:20}}/>
    <OnBoardSubSlide subtitle={Languages.CreateAccount} description={Languages.CreateAccountDescription} />
    <View style={styles.inputContainer}>
        {form}
    </View>
    <ErrorHandler errorMessage={responseError} />
    <TextButton
      onPress={handleSignUp}
     >
         {Languages.signup}   
    </TextButton>
    <Modal
        visible={modalVisible}
        setVisible={setModalVisible}
        loading={loading}
        description={responseError} />
   </ScrollView>
   )

   const Footer=(
    <View style={styles.footer}>
     <TouchableOpacity style={{ justifyContent: 'flex-end',marginEnd:10 }}
        activeOpacity={0.7}
        onPress={() => NavService.goBack(props.navigation)}>
        <Icon name="leftcircleo" type="antdesign" size={40} color={Colors.white} />
     </TouchableOpacity>  
    <TouchableOpacity
        style={{flexDirection:'row'}}
        onPress={() => NavService.goTo('Login',props.navigation)} 
        >
        <Text
          style={{fontSize: 13, fontWeight: '800', color:Colors.white}}>
          {Languages.HaveAccountLogin}
        </Text>      
        <Text style={{fontSize: 14, color: Colors.lightGray}}> {Languages.SignIn} </Text>
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
    justifyContent:'center',
    alignItems:'center'
    },
    socialText: {
        color: Colors.gray,
        marginLeft: 18,
        fontSize: 10,
        fontFamily: 'Lato-Regular',
    },
    inputContainer: {
        marginTop: 40,
        width: '100%',
    },
});

export default Signup;
