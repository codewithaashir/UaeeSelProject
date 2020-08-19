/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import {Colors} from '../Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
const maxHeight = Dimensions.get('window').height;
function TextButton(props) {
    return (
        <TouchableOpacity
        activeOpacity={0.7}
        style={[props.styles,styles.getStartedButton,props.light?{}:{backgroundColor:Colors.mediumGrey}]}
        hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
        onPress={props.onPress}
        >
        <Text style={[props.styles,styles.buttonTitle,props.light?{}:{color:Colors.white,backgroundColor:Colors.mediumGrey}]}>{props.children}</Text>
       </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        flexGrow: 1
    },
    getStartedButton: {
        backgroundColor: Colors.next,
        alignSelf: 'center',
        width: 180,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        //marginTop:maxHeight * 0.03,
        marginBottom: maxHeight * 0.05,
    },
    buttonTitle: {
        fontFamily: 'Lato-Bold',
        textAlign: 'center',
        color: Colors.darkBlue,
    },
})

export default TextButton;