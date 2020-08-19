/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text } from 'react-native'
import {Colors} from '../Utils';

function Typography(props) {
    return (
        <Text
            style={{
                fontFamily: props.variant === 'regular' || props.variant === 'small' ? 'Lato-Regular'
                    : props.variant === 'bold' || props.variant==='category' ? 'Lato-Bold'
                        : props.variant === 'black' ? 'Lato-Black' : 'Lato-Regular',
                fontSize:
                    props.variant === 'small' ? 12
                        : props.variant === 'regular' ? 14
                          :props.variant==='category'?20                       : props.variant === 'bold' ? 16
                                : props.variant === 'black' ? 18 : 14,
                color: props.variant==='category'?Colors.white:Colors.darkBlue,
                ...props.style,
            }}
            numberOfLines={props.numberOfLines}
        >
            {props.children}
        </Text>

    );
}

export default Typography;
