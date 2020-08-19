/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input, Icon } from 'react-native-elements';
// import { TextInputMask } from 'react-native-masked-text';
import {Colors} from '../Utils';
import CheckBox from './CheckBox';
import { useDispatch } from 'react-redux';
import { addsignupdata } from '../Redux/Reducer/SignUp';
import Typography from './Typography';
import Radio from './Radio';
import { RadioButton } from 'react-native-paper';
import {Languages} from '../Utils';
function InputComponent(props) {
    let inputElement = null;

    const [hide, setHide] = useState(true);
    const [mixedCheck, setMixedCheck] = useState(false);
    
    const dispatch = useDispatch();
    const addSignupData = data => dispatch(addsignupdata(data));
  

    switch (props.elementType) {
        case ('input'):
            inputElement =
                <Input
                    placeholderTextColor={Colors.darkBlue + 'ee'}
                    {...props.elementConfig}
                    value={props.value}
                    onChangeText={props.change}
                    // errorMessage={props.errorMessage}
                    errorStyle={{
                        fontFamily: 'Lato-Regular',
                        margin: 5,
                    }}
                    inputContainerStyle={{borderWidth:1,borderRadius:10}}
                    inputStyle={{ fontFamily: 'Lato-Bold', color: Colors.darkBlue,borderBottomWidth:0 }}
                    containerStyle={{ marginBottom: 2 }}
                    secureTextEntry={props.elementConfig.name === 'password' ? hide : false}
                    rightIcon={
                        props.elementConfig.name === 'password' ?
                        <Icon
                            underlayColor="transparent"
                            name={hide ? 'lock' : 'unlock-alt'}
                            type="font-awesome"
                            iconStyle={{ marginRight: 10 }}
                            hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
                            color={Colors.lightGray}
                            onPress={() => setHide(!hide)}
                        />
                        :
                        props.elementConfig.name === 'name' ?
                        <Icon
                            color={Colors.lightGray}
                            underlayColor="transparent"
                            name={props.valid ? 'md-person-circle-sharp' : 'md-person-circle-sharp'}
                            type="ionicon"
                            iconStyle={{ marginRight: 10 }}
                            hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
                            //onPress={() => setHide(!hide)}
                        />:                        
                        props.elementConfig.name === 'phone' ?
                        <Icon
                            color={Colors.lightGray}
                            underlayColor="transparent"
                            name={props.valid ? 'ios-phone-portrait' : 'ios-phone-portrait'}
                            type="ionicon"
                            iconStyle={{ marginRight: 10 }}
                            hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
                            //onPress={() => setHide(!hide)}
                        />:
                        props.elementConfig.name === 'email' &&
                        <Icon
                            color={Colors.lightGray}
                            underlayColor="transparent"
                            name={props.valid ? 'email-check' : 'email'}
                            type="MaterialCommunityIcons"
                            iconStyle={{ marginRight: 10 }}
                            hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
                            //onPress={() => setHide(!hide)}
                        />
                    }
                    leftIcon={props.leftIcon}
                />;
            break;
            case ('radio'):
                inputElement =
                    <>
                        <Typography style={{ marginLeft: 10 }} variant="bold">{Languages.Gender}</Typography>
                        <View style={{
                            margin: 10,
                            flexDirection: 'row',
                        }}>
                            <RadioButton.Group
                                onValueChange={props.change}
                                value={props.value}
                            >
                                {props.elementConfig.radio.map((radio, index) => {
                                    return <Radio key={index} {...radio} />;
                                })}
                            </RadioButton.Group>
                        </View>
                    </>;
                break;    
        case ('profile-input'):
            inputElement =
                <>
                    <Input
                        placeholderTextColor={Colors.darkBlue + 'ee'}
                        {...props.elementConfig}
                        value={props.value}
                        onChangeText={props.change}
                        errorStyle={{
                            fontFamily: 'Lato-Regular',
                            margin: 5,
                        }}
                        inputStyle={{ fontFamily: 'Lato-Bold', color: Colors.darkBlue }}
                        containerStyle={{ marginBottom: 16 }}
                        rightIcon={
                            props.elementConfig.name === 'last_name' &&
                            props.children
                        }
                    />
                    <Text style={{ marginLeft: 10, color: '#47525E', fontSize: 16, fontFamily: 'Lato-Bold' }}>{props.elementConfig.Label}</Text>
                </>;
            break;
        // case ('location'):
        //     inputElement =
        //         <TouchableOpacity onPress={handleLocation}>
        //             <Input
        //                 placeholderTextColor={Colors.darkBlue + 'ee'}
        //                 editable={false}
        //                 {...props.elementConfig}
        //                 value={props.value}
        //                 errorStyle={{
        //                     fontFamily: 'Lato-Regular',
        //                     margin: 5,
        //                 }}
        //                 inputStyle={{ fontFamily: 'Lato-Bold', color: Colors.darkBlue }}
        //                 containerStyle={{ marginBottom: 16 }}
        //                 leftIcon={props.leftIcon}
        //             />
        //         </TouchableOpacity>;
        //     break;
        // case ('inputMask'):
        //     inputElement =
        //         <TextInputMask
        //             placeholderTextColor={Colors.darkBlue + 'ee'}

        //             {...props.elementConfig}
        //             type={'datetime'}
        //             options={{
        //                 format: 'MM/DD/YYYY',
        //             }}
        //             value={props.value}
        //             onChangeText={props.change}
        //             style={{
        //                 marginHorizontal: 10,
        //                 fontSize: 20,
        //                 fontFamily: 'Lato-Bold',
        //                 color: Colors.darkBlue,
        //                 borderBottomWidth: 1,
        //                 borderBottomColor: Colors.gray,
        //                 marginBottom: 16,
        //             }
        //             }
        //         />;
        //     break;
        case ('contacts'):
            inputElement =
                <Input
                    placeholderTextColor={Colors.darkBlue + 'ee'}
                    {...props.elementConfig}
                    value={props.value}
                    onChangeText={props.change}
                    // errorMessage={props.errorMessage}
                    errorStyle={{
                        fontFamily: 'Lato-Regular',
                        margin: 5,
                    }}
                    inputContainerStyle={{
                        backgroundColor: Colors.lightGray,
                        borderRadius: 20,
                        borderBottomWidth: 0,
                    }}
                    inputStyle={{ fontFamily: 'Lato-Bold', color: Colors.darkBlue }}
                    containerStyle={{ marginBottom: 16 }}
                    secureTextEntry={props.elementConfig.name === 'password' ? hide : false}
                    rightIcon={
                        props.elementConfig.name === 'password' &&
                        <Icon
                            underlayColor="transparent"
                            name={hide ? 'lock' : 'unlock-alt'}
                            type="font-awesome"
                            iconStyle={{ marginRight: 10 }}
                            hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
                            onPress={() => setHide(!hide)}
                        />
                    }
                    leftIcon={<Icon iconStyle={{ marginRight: 12 }} name="star" type="simple-line-icon" color={Colors.darkBlue} />}
                />;
            break;
        default:
            <Input
                placeholderTextColor={Colors.darkBlue + 'ee'}
                {...props.elementConfig}
                value={props.value}
                onChangeText={props.change}
                errorStyle={{
                    fontFamily: 'Lato-Regular',
                    margin: 5,
                }}
                inputStyle={{ fontFamily: 'Lato-Bold', color: Colors.darkBlue }}
                containerStyle={{ marginBottom: 16 }}
                secureTextEntry={props.elementConfig.name === 'password' ? hide : false}
                rightIcon={
                    props.elementConfig.name === 'password' &&
                    <Icon
                        underlayColor="transparent"
                        name={hide ? 'lock' : 'unlock-alt'}
                        type="font-awesome"
                        iconStyle={{ marginRight: 10 }}
                        hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
                        onPress={() => setHide(!hide)}
                    />
                }
            />;
            break;
    }
    return (
        <>
            {inputElement}
        </>
    );
}

// const styles = StyleSheet.create({
//     root: {
//         flexGrow: 1,
//     },
// });

export default InputComponent;
