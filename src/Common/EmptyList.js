/** @format */

import React, { PureComponent } from "react";
import { Text, View, Image, StyleSheet, Platform, Dimensions } from "react-native";
import { Colors, Languages } from "../Utils";
import { Images } from '../Assets';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TextButton from "./TextButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import GradientBtn from "./GradientButton";
const maxHeight = Dimensions.get('window').height;
const buttonContainer = {
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
  paddingLeft: 20,
  paddingRight: 20,
};
class EmptyList extends PureComponent {
  render() {
    const { scene, onPress } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={styles.content}>
          <View>
            {scene == 'wish' ?
              <Image
                source={Images.wishList}
                style={styles.icon}
                resizeMode="contain"
              />
              : <Icon type='feather' name='shopping-bag' color={Colors.appBlue} size={70} />
            }
          </View>
          <Text style={[styles.title, { color: Colors.appBlue }]}>
            {scene == 'wish' ? Languages.EmptyWishList : Languages.ShoppingCartIsEmpty}
          </Text>
          <Text style={[styles.message, { color: Colors.appGreen }]}>
            {scene == 'wish' ? Languages.NoWishListItem : Languages.AddProductToCart}
          </Text>
          <GradientBtn
            title={Languages.ShopNow}
            onPress={onPress}
          />
        </View>
      </View>
    );
  }
}

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 16,
    color: Colors.lightGray,
    fontFamily: 'Lato-Bold',
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: Colors.appBlue,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    //fontFamily: Constants.fontHeader,
    fontFamily: 'Lato-Bold'
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    color: "#758692",
    width: 230,
    marginTop: 10,
    lineHeight: 25,
    //fontFamily: Constants.fontFamily,
  },
  root: {
    flexGrow: 1
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

})