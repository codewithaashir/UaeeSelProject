/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, YellowBox, Dimensions, LogBox } from 'react-native';
import { Images } from '../../Assets';
import {OnBoardSubSlide } from './OnboardSliderItem';
import {TextButton} from '../../Common';
import { NavService,Languages,AuthContext,Colors } from '../../Utils';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;
function LetStarted(props) {
    LogBox.ignoreLogs(['Warning: ...']);
    
    // const carouselRef = useRef(null)

    const { onboard } = useContext(AuthContext);

    const maxWidth = Dimensions.get('window').width;
    const halfWidth = maxWidth / 2

    return (
        <View style={styles.root}>
            <StatusBar backgroundColor={Colors.lightYellow} />
            <View style={[styles.slider, { backgroundColor: Colors.lightYellow}]}>   
            <Image
             source={{uri:'https://www.freeiconspng.com/thumbs/men-suit-png/men-suit-png-19.png'}}
             style={{...StyleSheet.absoluteFill,width:'auto',height:'auto',resizeMode:'contain'}}
           />
            </View>

            <View style={styles.footer}>
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor:Colors.lightYellow }} />
                <View style={{ flex: 1, backgroundColor: Colors.white, borderTopLeftRadius: 75 }}>
                    <View style={styles.bottomContainer}>
                    <OnBoardSubSlide  subtitle={Languages.LetsStart} description={Languages.StartedDescription} />
                    </View>
                    <TextButton
                        onPress={() => NavService.goTo('Login',props.navigation)}
                    >
                     {Languages.HaveAccount}   
                    </TextButton>
                    <TextButton
                        light
                        onPress={() => NavService.goTo('Signup',props.navigation)}
                    >
                     {Languages.JoinUs}   
                    </TextButton>
                    <TextButton
                        light
                        onPress={() => NavService.goTo('ForgetPassword',props.navigation)}
                    >
                     {Languages.CheckInGuest}
                    </TextButton>
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
        height: 0.51*maxHeight,
        borderBottomRightRadius: 75
    },
    footer: {
        flex: 1
    },
    bottomContainer: {
        height: maxHeight * 0.2,
        //height: "30%",
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "100%",
        alignItems: 'center',
    },
});

export default LetStarted;
