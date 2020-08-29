/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect,useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, YellowBox, Dimensions, LogBox,Animated } from 'react-native';
import { Images } from '../../Assets';
import {OnBoardSubSlide } from './OnboardSliderItem';
import {TextButton} from '../../Common';
import { NavService,Languages,AuthContext,Colors } from '../../Utils';
import LinearGradient from 'react-native-linear-gradient';
const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;
function LetStarted(props) {
    LogBox.ignoreLogs(['Warning: ...']);
    const spring = () => {
        SpringValue.setValue(0.2)
        Animated.spring(
          SpringValue,
          {
            toValue: 1,
            friction: 1
          }
        ).start()
      }
    // const carouselRef = useRef(null)

    const { onboard } = useContext(AuthContext);
    const [SpringValue, setSpringValue] = useState(new Animated.Value(0.2))
    const maxWidth = Dimensions.get('window').width;
    const halfWidth = maxWidth / 2
    useEffect(()=>{
        spring();
    },[])
    return (
        <View style={styles.root}>
            <LinearGradient  colors={[Colors.appGreen, Colors.appBlue, Colors.appRed]} style={[styles.slider, { backgroundColor: Colors.appBlue}]}>   
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <Animated.Image
             source={Images.PlaceHolderURL}
             style={[styles.iconImage,{ transform: [{ scale: SpringValue }] }]}
           />
            </LinearGradient >

            <View style={styles.footer}>
                <LinearGradient useAngle={true} angle={360} angleCenter={{ x: 0.9, y: 0.9}} colors={[Colors.appGreen, Colors.appBlue, Colors.appRed]} style={{ ...StyleSheet.absoluteFillObject, backgroundColor:Colors.appBlue }} />
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
                        onPress={() => NavService.goTo('Guest',props.navigation)}
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
        justifyContent:'center',
        alignItems:'center',
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
    iconImage:{
        width:200,
        height:200,
        resizeMode:'contain'
    }
});

export default LetStarted;
