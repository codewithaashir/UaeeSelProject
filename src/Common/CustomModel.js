/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React,{Component} from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../Utils/Colors';


export default class CustomModel extends Component {
  constructor(props){
      super(props);
  }
    render(){
    return (
        <ReactNativeModal
            //useNativeDriver={true}
            testID={'modal'}
            //onBackdropPress={() => props.setVisible(false)}
            onBackButtonPress={() => this.props.setVisible(false)}
            isVisible={this.props.visible}
            backdropColor={'transparent'}
            swipeThreshold={10}
            onSwipeComplete={() => this.props.setVisible(false)}
            swipeDirection={['down']}
            propagateSwipe={true}
            style={styles.modal}
        >
        <View style={[styles.scrollableModal,this.props.color&&{backgroundColor:Colors.white}]}>
          
            {this.props.children}
        </View>
          
        </ReactNativeModal >
    );
}
}

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      scrollableModal: {
        height: fullHeight*0.5,
        borderTopLeftRadius:20,
        backgroundColor:Colors.appRed,
        borderTopRightRadius:20
    },
});

