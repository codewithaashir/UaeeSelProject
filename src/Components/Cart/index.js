import React,{useState,useEffect} from 'react';
import {Empty, AnimatedView, TextButton, Typography, Item, GradientBtn,Price} from '../../Common';
import { clearCartList, removeCartItem } from '../../Redux/Reducer/Cart';
import { Languages,Colors, NavService, getCurrecyFormatted } from '../../Utils';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { Alert, Animated, Dimensions, StyleSheet,Text } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { View } from 'native-base';
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
  const styles=StyleSheet.create({
    priceContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "flex-end",
      },
      price: {
        fontSize: 20,
        color: Colors.appBlue,
        textAlign:'center',
        fontFamily: 'Lato-Black',
      },
  })
export default function CartList(props){
    const { Cart } = useSelector(state => state.CartList);
    const [tranformView,setTranformView] = useState(new Animated.Value(-16));
    const TotalCost = () => {
        var total = 0;
        if (Cart) {
          Cart.map(item => {
            total += parseFloat(item.price).toFixed(2) * item.pro_qty;
            //this.setState({total: total});
          });
        }
        return total.toFixed(2);
        //console.warn(arr);
      };
    // useEffect(()=>{
    //     Animated.timing(tranformView, {
    //       toValue: 16,
    //       duration: 600,
    //       easing: Easing.bezier(0, 1, 0.74, 1)
    //     }).start();
    //   },[]);
    const dispatch  = useDispatch()
    const cleanAll = () => {
         dispatch(clearCartList())
    }
    const onDeleteItem  =async (product)=>{
       await dispatch(removeCartItem(product))
    }
    const renderItem = ({ item, index }) => {
        return (
            <Item item={item} index={index} scene='Cart'  {...props} onDeleteItem={()=>onDeleteItem(item)}/>
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
                 title={Languages.Checkout}
                 onPress={() => NavService.goTo('Login', props.navigation)}
                />
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
                    ListFooterComponent={
                        <View style={styles.priceContainer}>
                        <Text style={[styles.price]}>
                          {getCurrecyFormatted(TotalCost())}
                        </Text>
                      </View>
                    }
                />
               <BottomBtns/>
            </>
        }
    </AnimatedView>
    )
}