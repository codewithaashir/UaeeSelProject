/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, YellowBox, Dimensions, LogBox, KeyboardAvoidingView, Platform } from 'react-native';
import {Colors} from '../Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Languages from '../Utils/Languages';
import FastImage from 'react-native-fast-image';
import {AnimatedView} from './AnimatedView';
import { Images } from '../Assets';
const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';
const aspectRatio = 240 / 576;
const backgroundHeight = maxWidth * aspectRatio;
function CustomDesgin(props) {
    LogBox.ignoreLogs(['Warning: ...']);

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        style={styles.root}
        >
            <LinearGradient  colors={[Colors.appGreen, Colors.appBlue, Colors.appRed]} style={[styles.slider,{ width: maxWidth, height: backgroundHeight, resizeMode: 'contain', borderBottomLeftRadius: 55, overflow: "hidden",backgroundColor: Colors.appRed }]}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
               <FastImage
                 source={Images.logo}
                 resizeMode={FastImage.resizeMode.contain}
               />
            </LinearGradient>

            <View style={styles.footer}>
            <LinearGradient useAngle={true} angle={360} angleCenter={{ x: 0.1, y: 0.1}} colors={[Colors.appBlue, Colors.appRed, '#192f6a']} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: Colors.appBlue, overflow: "hidden" }}>
                    <View
                        style={{ width: maxWidth, height: backgroundHeight, overflow: "hidden", top: -backgroundHeight * 0.71,backgroundColor:Colors.appRed }}
                    />
            </LinearGradient>
                <View style={styles.footerContainer}>
                    {props.Body}
                </View>
                <LinearGradient  colors={[Colors.appBlue, Colors.appRed, Colors.appGreen]} style={{ bottom: 0, height: maxHeight * 0.17, backgroundColor: Colors.appBlue }}>
                 {props.Footer&&
                   props.Footer
                 }    
                </LinearGradient>

            </View>

        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    slider: {
        //backgroundColor:Colors.lightGreen,
        height: backgroundHeight,
        borderBottomRightRadius: 0
    },
    footer: {
        flex: 1
    },
    footerContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopRightRadius: 65,
        borderBottomLeftRadius: 65,
        borderBottomRightRadius: 65
    },
    bottomContainer: {
        height: maxHeight * 0.3,
        //height: "30%",
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "100%",
        alignItems: 'center',
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
});

export default CustomDesgin;
