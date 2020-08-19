import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, View, Image,Text, Animated, Easing } from "react-native";
import { Images } from "../../Assets";

function Splash(props) {
    const [expanded, expand] = useState(false);
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    const [scaleOutValue, setScaleOutValue] = useState(new Animated.Value(0));

    useEffect(() => {
        animate();
        return () => scaleOutFunc();
    }, []);


    const scaleOutFunc = () => {
        Animated.timing(
            scaleOutValue,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.ease,
            }
        ).start();

    }

    const animate = () => {
        animatedValue.setValue(0);
        Animated.timing(
            animatedValue,
            {
                toValue: 1,
                duration: 600,
                easing: Easing.elastic(1),
            }
        ).start();
    }

    const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })
    const scaleOut = scaleOutValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    })
    return (
        <TouchableWithoutFeedback onPress={() => expand(!expanded)}>
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Animated.View style={{
                    flexGrow: 1,
                    transform: [{ scaleY: scale }, { scaleX: scaleOut }]
                }}
                >
                    <Image
                        source={Images.logo}
                        resizeMode="contain"
                        style={{
                            minWidth: 200,
                            width: 200,
                            // height:'100%'
                        }}
                    />
                </Animated.View>
            </View>
        </TouchableWithoutFeedback >
    );
}

export default Splash;