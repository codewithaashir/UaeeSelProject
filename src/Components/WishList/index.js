import React from 'react';
import {Empty, AnimatedView} from '../../Common';
export default function WishList(props){
    return(
        <AnimatedView style={{flex:1}}>
        <Empty scene='wish'/>
        </AnimatedView>
    )
}