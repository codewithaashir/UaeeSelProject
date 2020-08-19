/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import {Colors} from '../Utils';

function Radio({ label, value, reverseLabel }) {
    return (
        <View style={styles.radio}>
            {!reverseLabel && <Text style={styles.radioText} >{label}</Text>}
            <RadioButton
                color={Colors.darkBlue}
                value={value}
            />
            {reverseLabel && <Text style={styles.radioText} >{label}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    radio: {
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioText: {
        margin: 0,
        padding: 0,
        fontFamily: 'Lato-Regular',
    },

});

export default Radio;
