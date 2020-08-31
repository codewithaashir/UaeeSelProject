import React, { useEffect,useState } from 'react';
import { Empty, AnimatedView, Typography,Item, TextButton, GradientBtn } from '../../Common';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Icon, View, Text } from 'native-base';
import { Languages,Colors, NavService } from '../../Utils';
import { clearWishList,removeWishItem } from '../../Redux/Reducer/WishList';
import { Alert, Animated, Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';
const buttonContainer = {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
    height:Dimensions.get('window').height*0.1,
    marginBottom: 2,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
  };
export default function WishList(props) {
    const { Wish } = useSelector(state => state.WishList);
    const [tranformView,setTranformView] = useState(new Animated.Value(-16));
    // useEffect(()=>{
    //     Animated.timing(tranformView, {
    //       toValue: 16,
    //       duration: 600,
    //       easing: Easing.bezier(0, 1.19, 0.74, 1.2)
    //     }).start();
    //   },[]);
    const dispatch  = useDispatch()
    const cleanAll = () => {
            Alert.alert(
              Languages.CleanAll,
               Languages.EmptyWishList,
              [
                {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => dispatch(clearWishList())},
              ]
            )
    }
    const onDeleteItem  =async(product)=>{
       await dispatch(removeWishItem(product))
       AsyncStorage.setItem(
        'Wish',
        JSON.stringify(Wish),
      );
    }
 
    const renderItem = ({ item, index }) => {
        return (
            <Item item={item} index={index} scene='wish'  {...props} onDeleteItem={()=>onDeleteItem(item)}/>
        )
    }
    const renderHeader = (name)=>{
        return(
        <View 
        //style={{transform:[{translateY:tranformView}] }}
        >   
            <Typography variant='bold' style={{fontSize:30,padding:20,color:Colors.appRed}}>{name}</Typography>
            <View  style={{width:40,backgroundColor:Colors.appBlue,height:4,marginLeft:20,marginTop:-10}}/>
        </View>
        )
    }
    const BottomBtns = () =>{
        return(
            <View
            style={[
                buttonContainer,
            ]}>
            <GradientBtn
                 title={Languages.CleanAll}
                 onPress={cleanAll}
                />
            <GradientBtn
                 title={Languages.MoveAllToCart}
                 onPress={() => NavService.goTo('Login', props.navigation)}
                />
        </View>
        )
    } 
    return (
        <AnimatedView style={{ flex: 1 }}>
            {Wish.length == 0 ?
                <Empty scene='wish' onPress={()=>NavService.goTo('Home',props.navigation)}/> :
                <>
                    <FlatList
                        style={{ padding: 20 }}
                        data={Wish}
                        ListHeaderComponent={renderHeader(Languages.WishList)} 
                        scrollEventThrottle={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                    />
                   <BottomBtns/>
                </>
            }
        </AnimatedView>
    )
}