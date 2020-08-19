import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Checkbox } from 'react-native-paper';
import {Colors} from '../Utils';
import Typography from './Typography';

function CheckboxButton(props) {
    return (
        <TouchableOpacity
            style={{ ...styles.rememberMe, ...props.style }}
            onPress={props.onPress}
        >
            <Checkbox
                onPress={props.onPress}
                status={props.status ? "checked" : "unchecked"}
                color={Colors.darkBlue}
            />
            <Typography variant="bold">
                {props.title}
            </Typography>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    rememberMe: {
        width: 150,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:20,
        //backgroundColor: Colors.lightGray,
        borderRadius: 12
    },
})

export default CheckboxButton;