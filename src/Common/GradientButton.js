/** @format */

import React, { PureComponent } from "react";
import { Text, View, Image, StyleSheet, Platform, Dimensions } from "react-native";
import { Colors, Languages } from "../Utils";
import { Images } from '../Assets';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TextButton from "./TextButton";
import { TouchableOpacity } from "react-native-gesture-handler";
const maxHeight = Dimensions.get('window').height;
const buttonContainer = {
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
  paddingLeft: 20,
  paddingRight: 20,
};
class GradientBtn extends PureComponent {
  render() {
    const { title,icon,onPress } = this.props;
    return (
          <View
            style={[
              buttonContainer,
            ]}>
            <TouchableOpacity
              activeOpacity={0.7}

              hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
              onPress={onPress}
            >
              <LinearGradient style={[styles.getStartedButton, { backgroundColor: Colors.appRed, width: 120 }]} colors={[Colors.appBlue+'20', Colors.appRed+'18', Colors.appGreen+'11']} >
                <Text style={[styles.buttonTitle]}>{title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
    );
  }
}

export default GradientBtn;

const styles = StyleSheet.create({
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
    color: Colors.white,
  },

})