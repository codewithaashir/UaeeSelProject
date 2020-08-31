/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Animated, useWindowDimensions, Easing } from 'react-native';
import {Colors} from '../Utils';

export default (props) => {
    const [animatedValue] = useState(new Animated.Value(0));
    const animate = () => {
        animatedValue.setValue(0);
        Animated.timing(
            animatedValue,
            {
                toValue: 1,
                duration: 400,
                easing: Easing.elastic(1),
            }
        ).start();
    };

    const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [useWindowDimensions().width, 0],
    });

    useEffect(() => {
        animate();
    }, []);

    return (
        <Animated.View
            style={{
                ...props.style,
                top: 0,
                bottom: 0,
                right: props.back ? scale : 0,
                left: props.back ? null : scale,
                backgroundColor: Colors.white,
            }}
            
        >
            {props.children}
        </Animated.View>
    );
};
