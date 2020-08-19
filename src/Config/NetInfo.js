/* eslint-disable prettier/prettier */
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { colors } from 'react-native-elements';
import {Images} from "../Assets/index";
import { update_connection_status } from '../Redux/Reducer/NetInfo';
export default function MyNetInfo(props) {
  const netInfo = useSelector(state => state.NetInfo);
  const [SpringValue, setSpringValue] = useState(new Animated.Value(0.2))
  const dispatch = useDispatch();
  const updateConnectionStatus = (isConnected) => dispatch(update_connection_status(isConnected));
  const spring = () => {
    SpringValue.setValue(0.2)
    Animated.spring(
      SpringValue,
      {
        toValue: 1,
        friction: 1
      }
    ).start()
  }
  const _handleConnectionChange = ({ isConnected }) => {
    // console.warn(isConnected)
    updateConnectionStatus(isConnected);
    if (!isConnected) return;

  };
  useEffect(() => {
    NetInfo.addEventListener(state => {
      _handleConnectionChange(state);
    });
    if (netInfo.isConnected) spring();
    // NetInfo.fetch().then(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    // });
    // return () => {
    //     NetInfo.removeEventListener(
    //     "connectionChange",
    //     _handleConnectionChange
    //   );
    // };
  }, [])

  //useBackButton("connectionChange",_handleConnectionChange)
  return (
    <>
      {
        !netInfo.isConnected ?
          <Animated.View style={[styles.connectionStatus, { transform: [{ scale: SpringValue }] }]}>
            <View style={styles.centerView}>
              <Image source={Images.netInfo} style={styles.bgImg} />
            </View>
            {/* <Text style={styles.connectionText}>{"No Internet Connection"}</Text> */}
          </Animated.View> :
          <View />

      }
    </>
  );

}


const styles = StyleSheet.create({
  connectionStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    justifyContent: 'center',
    borderRadius: 50,
    alignItems: 'center',
  },
  bgImg: {
    width: 300,
    //heig:300,
    resizeMode: 'contain',
    borderRadius: 50,
    shadowColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  centerView: {
    width: '90%',
    height: 250,
    justifyContent: 'center',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: colors.disabled,
  },
  connectionText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
});
