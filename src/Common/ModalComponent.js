/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {Colors} from '../Utils';
import { Spinner } from 'native-base';
import { ProgressBar } from 'react-native-paper';
import TextButton from './TextButton';
import FastImage from 'react-native-fast-image';
import { Images } from '../Assets';

function ModalComponent(props) {
    return (
        <ReactNativeModal
            useNativeDriver={true}
            animationIn={'slideInUp'}
            animationOut={'slideOutRight'}
            testID={'modal'}
            onBackdropPress={() => props.setVisible(false)}
            isVisible={props.visible}
            style={styles.root}
        >
            <View style={styles.view}>
             <FastImage
               style={styles.image}
               source={Images.logo}
               resizeMode={FastImage.resizeMode.contain}
             />    
                {
                    props.loading ?
                        props.uploadProgress ?
                            <ProgressBar
                                progress={props.uploadProgress}
                                color={Colors.darkBlue}
                                style={{
                                    height: 20,
                                    width: fullWidth * 0.6,
                                    borderRadius: 4,
                                }}
                            />
                            :
                            < Spinner color={Colors.darkBlue} size={50} />
                        :
                        <>
                            <Text numberOfLines={3} style={styles.text}>{props.description}</Text>
                            <TextButton
                                filled={true}
                                style={styles.button}
                                onPress={() => {if(props.loading==false){ props.setVisible(false);props.setResponse?props.setResponse(''):null}}}
                            >
                                OK
                            </TextButton>
                        </>
                }
            </View>
        </ReactNativeModal >
    );
}
const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Colors.white,
        borderRadius: 16,
        width: fullWidth * 0.7,
        height: fullHeight * 0.4,
    },
    image: {
        width: 120,
        height: 120,
        marginTop: fullHeight * 0.03,
        resizeMode:'contain'
    },
    text: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    button: {
        width: '50%',
        height: fullHeight * 0.06,
        paddingVertical: 3,
        marginBottom: fullHeight * 0.02,
    },
});

export default ModalComponent;
