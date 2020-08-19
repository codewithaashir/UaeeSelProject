import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import {Colors} from '../Utils';

function ErrorHandler(props) {

    return (
        props.errorMessage ?
            (<View style={styles.root}>
                <Text style={styles.text}>{props.errorMessage}</Text>
            </View>
            ) : (
                <View style={styles.hidden} />
            )
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hidden: {
        width: 0,
        height: 0,
    },
    text: {
        fontFamily: 'Lato-bold',
        color: Colors.error
    }
})

export default ErrorHandler;