/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, YellowBox, Dimensions, LogBox } from 'react-native';
import {Colors} from '../Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Languages from '../Utils/Languages';
import FastImage from 'react-native-fast-image';
import {AnimatedView} from './AnimatedView';
const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;
const aspectRatio = 240 / 576;
const backgroundHeight = maxWidth * aspectRatio;
function CustomDesgin(props) {
    LogBox.ignoreLogs(['Warning: ...']);

    return (
        <View style={styles.root}>
            
            <StatusBar barStyle={'light-content'} backgroundColor={'#008a49'} />
            <View style={[styles.slider]}>
                <FastImage
                    style={{ width: maxWidth, height: backgroundHeight, resizeMode: 'contain', borderBottomLeftRadius: 55, overflow: "hidden" }}
                    source={{
                        uri: 'https://t4.ftcdn.net/jpg/01/77/35/23/240_F_177352308_aX3Jhbt4O6YdOl1mXuf3gjmIW0LWqTTH.jpg',
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>

            <View style={styles.footer}>
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: Colors.darkBlue, overflow: "hidden" }}>
                    <FastImage
                        style={{ width: maxWidth, height: backgroundHeight, overflow: "hidden", top: -backgroundHeight * 0.71 }}
                        source={{
                            uri: 'https://t4.ftcdn.net/jpg/01/77/35/23/240_F_177352308_aX3Jhbt4O6YdOl1mXuf3gjmIW0LWqTTH.jpg',
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View style={styles.footerContainer}>
                    {props.Body}
                </View>
                <View style={{ bottom: 0, height: maxHeight * 0.17, backgroundColor: Colors.darkBlue }}>
                 {props.Footer&&
                   props.Footer
                 }    
                </View>

            </View>

        </View>
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
        borderBottomRightRadius: 75
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
