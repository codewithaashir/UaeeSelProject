import React,{useState,useEffect} from 'react';
import {Empty, AnimatedView, TextButton, Typography, Item} from '../../Common';
import { clearCartList } from '../../Redux/Reducer/Cart';
import { Languages,Colors, NavService } from '../../Utils';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { Alert, Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { View } from 'native-base';
const buttonContainer = {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
  };
export default function CartList(props){
    const { Cart } = useSelector(state => state.CartList);
    const [tranformView,setTranformView] = useState(new Animated.Value(-16));
    useEffect(()=>{
        Animated.timing(tranformView, {
          toValue: 16,
          duration: 600,
          easing: Easing.bezier(0, 1.19, 0.74, 1.2)
        }).start();
      },[]);
    const dispatch  = useDispatch()
    const cleanAll = () => {
         dispatch(clearCartList())
    }
    const renderItem = ({ item, index }) => {
        return (
            <Item item={item} index={index} scene='Cart'  {...props} onDeleteItem={()=>onDeleteItem(item)}/>
        )
    }

    const renderHeader = (name)=>{
        return(
            <Animated.View style={{transform:[{translateY:tranformView}] }}>   
                <Typography variant='bold' style={{fontSize:30,padding:20,color:Colors.appRed}}>{name}</Typography>
                <View  style={{width:40,backgroundColor:Colors.appBlue,height:4,marginLeft:20,marginTop:-10}}/>
            </Animated.View>
            )
    }
    const BottomBtns = () =>{
        return(
            <View
            style={[
                buttonContainer,
            ]}>
            <TextButton
                small
                onPress={cleanAll}
            >
                {Languages.CleanAll}
            </TextButton>
            <TextButton
                small
                onPress={() => NavService.goTo('Login', props.navigation)}
            >
                {Languages.MoveAllToCart}
            </TextButton>
        </View>
        )
    }
    return(
        <AnimatedView style={{ flex: 1 }}>
        {Cart.length == 0 ?
            <Empty scene='cart' onPress={()=>NavService.goTo('Home',props.navigation)} /> :
            <>
                <FlatList
                    style={{ padding: 20 }}
                    data={Cart}
                    ListHeaderComponent={renderHeader(Languages.Cart)} 
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