/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, StatusBar, YellowBox, Dimensions, LogBox } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Button } from 'react-native-elements';
import { Images } from '../../Assets';
import Colors from '../../Utils/Colors';
import { AuthContext } from '../../Utils';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import OnboardSliderItem, { Slider_Height, OnBoardSubSlide } from './OnboardSliderItem';
import Languages from '../../Utils/Languages';

const data = [
    {
        id: 0,
        description: Languages.Description1,
        title: Languages.Title1,
        subtitle: Languages.Subtitle1,
        right: true,
        image: Images.logo,
    },
    {
        id: 1,
        description: Languages.Description2,
        title: Languages.Title2,
        subtitle: Languages.Subtitle2,
        right: false,
        image: Images.logo,
    },
    {
        id: 2,
        description: Languages.Description3,
        title: Languages.Title3,
        subtitle: Languages.Subtitle3,
        right: true,
        image: Images.logo,
    },
    {
        id: 3,
        description: Languages.Description4,
        title: Languages.Title4,
        subtitle: Languages.Subtitle4,
        right: false,
        image: Images.logo,
    },

];
const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;
function Onboard(props) {
    LogBox.ignoreLogs(['Warning: ...']);
    const [step, setStep] = useState(0);
    // const carouselRef = useRef(null)

    const { onboard } = useContext(AuthContext);

    const maxWidth = Dimensions.get('window').width;
    const halfWidth = maxWidth / 2


    const handleNext = props => {
        if (step == data.length - 1) {
            onboard();
            return;
        }
        else {
            setStep(step + 1);
        }
    };


    const backgroundColor = () => {
        switch (step) {
            case 0:
                return Colors.cyan
            case 1:
                return Colors.lightGreen
            case 2:
                return Colors.lightRed
            case 3:
                return Colors.lightYellow
            default:
                return Colors.lightYellow
        }
        color;
    }

    return (
        <View style={styles.root}>
            <StatusBar backgroundColor={backgroundColor()} />
            <View style={[styles.slider, { backgroundColor: backgroundColor() }]}>
                {/* <FlatList 
                    data={data}
                    horizontal={true}
                    renderItem={({title, right,image }, index)=>{
                        if (index == step) {
                            return (<OnboardSliderItem key={index.toString()} title={title} right={right} image={image}/>)
                        }
                    }}
                /> */}
                {/* {
                    data.map(({ title, right,image }, index) => {
                        if (index == step) {
                            return (<OnboardSliderItem key={index.toString()} title={title} right={right} image={image}/>)
                        }
                    }
                    )
                } */}

            </View>

            <View style={styles.footer}>
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: backgroundColor() }} />
                <View style={{ flex: 1, backgroundColor: Colors.white, borderTopLeftRadius: 75 }}>
                    <View style={styles.bottomContainer}>
                        <Pagination
                            dotsLength={data.length}
                            activeDotIndex={step}
                            dotColor={Colors.activeDot}
                            inactiveDotColor={Colors.lightGray}
                            inactiveDotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 8,
                                opacity: 1,
                                borderColor: Colors.lightGray,
                                backgroundColor: Colors.lightGray,
                            }}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 8,
                            }}
                            inactiveDotOpacity={1}
                        />
                        {
                            data.map(({ subtitle, description }, index) => {
                                if (index == step) {
                                    return (<OnBoardSubSlide key={index.toString()} subtitle={subtitle} description={description} />)
                                }
                            }
                            )
                        }

                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.getStartedButton, step == data.length - 1 ? { backgroundColor: Colors.mediumGrey } : null]}
                        onPress={() => handleNext(props)}
                    >
                        <Text style={[styles.buttonTitle, step == data.length - 1 ? { color: Colors.white } : null]}>{step == data.length - 1 ? Languages.LetsStart : Languages.Next}</Text>
                    </TouchableOpacity>
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
        height: Slider_Height,
        borderBottomRightRadius: 75
    },
    footer: {
        flex: 1
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

export default Onboard;
