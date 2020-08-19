import React from 'react';
import {Empty, AnimatedView} from '../../Common';
export default function CartList(props){
    return(
        <AnimatedView style={{flex:1}}>
        <Empty scene='cart'/>
        </AnimatedView>
    )
}