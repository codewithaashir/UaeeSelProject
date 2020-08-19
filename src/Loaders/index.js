import React,{Component} from 'react';
import {View,ActivityIndicator} from 'react-native'
import {Colors} from '../Utils';
import { StyleSheet } from 'react-native';
const Loading=(
<View style={{...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator size={25} color={Colors.appGreen+'45'}/>
    </View>
);
const LoadingModal=(
    <View>
        
        <ActivityIndicator size={14} color={Colors.appGreen+'45'}/>
        </View>
)

export {Loading,LoadingModal}