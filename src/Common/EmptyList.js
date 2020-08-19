/** @format */

import React, { PureComponent } from "react";
import { Text, View, Image, StyleSheet,Platform } from "react-native";
import { Colors,Languages } from "../Utils";
import  {Images} from '../Assets';
import {Icon} from 'react-native-elements';
class EmptyList extends PureComponent {
  render() {
     const {scene,onPress} = this.props;
    return (
      <View style={[styles.container]}>
        <View style={styles.content}>
          <View>
           {scene=='wish'?
           <Image
              source={Images.wishList}
              style={styles.icon}
              resizeMode="contain"
            />
            :<Icon type='feather' name='shopping-bag' color={"#B7C4CB"} size={70}/>
            }
          </View>
           <Text style={[styles.title, { color: Colors.appBlue }]}>
            {scene=='wish'?Languages.EmptyWishList:Languages.ShoppingCartIsEmpty}
          </Text>
         <Text style={[styles.message, { color: Colors.appGreen }]}>
            {scene=='wish'?Languages.NoWishListItem:Languages.AddProductToCart}
          </Text>
        </View>

        {/* <ShopButton onPress={this.props.onViewHome} /> */}
      </View>
    );
  }
}

export default EmptyList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.appRed+'31',
      },
      label: {
        fontSize: 16,
        color: Colors.lightGray,
        fontFamily: 'Lato-Bold',
      },
      icon: {
        width: 70,
        height: 70,
        tintColor: "#B7C4CB",
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
    
})