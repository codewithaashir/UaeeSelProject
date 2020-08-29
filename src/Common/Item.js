import React, {useState, useEffect} from 'react';
import  {View,StyleSheet, Dimensions, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { getProductImage,getCurrecyFormatted,Colors } from '../Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ImgURl } from '../Config/Apis';
import css from '../Styles';
import Typography from './Typography';
import {useDispatch} from 'react-redux';
import  {Icon} from  'react-native-elements'; 
const {height,width} = Dimensions.get('window');
import Animated,{Easing} from 'react-native-reanimated';
import { addItemQuanToCart } from '../Redux/Reducer/Cart';
export default function Item(props){
    const [tranformText,setTranformText] = useState(new Animated.Value(-9));
    const {index,item,scene,onPress,onDeleteItem} = props;
    const [count,setCount]=useState(item.pro_qty);
    const dispatch =useDispatch();
    useEffect(()=>{
        Animated.timing(tranformText, {
          toValue: 16,
          duration: 600,
          easing: Easing.bezier(0, 1.19, 0.74, 1.2)
        }).start();
      },[]);
    const addItemQua=(product,value)=>{
        dispatch(addItemQuanToCart(product,value))
    }
    return(
        <View style={styles.container}>
            <View style={styles.content}>
              <TouchableOpacity onPress={() => onPress()}>
              <FastImage
                style={styles.image}
                source={{
                    uri:getProductImage(ImgURl+item.featured_image,width),
                    priority: FastImage.priority.high,
                 }}
                resizeMode={FastImage.resizeMode.contain}
               /> 
              </TouchableOpacity>
              <Animated.View
            style={[
              styles.infoView,
              { width: Dimensions.get("window").width - 180,transform:[{translateY:tranformText}] },
            ]}>
            <TouchableOpacity onPress={() => onPress()}>
            <Text style={[styles.title]} numberOfLines={3}>
                {item.name}
              </Text>            
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={[styles.price]}>
                {getCurrecyFormatted(item.price)}
              </Text>
            </View>
            </Animated.View>
            <View style={{flexDirection:'column',position:'absolute',right:0,top:0}}>
            <TouchableOpacity activeOpacity={0.7} onPress={async () => {
  if (count <= item.qty) {
    setCount(count+1);
    await addItemQua(item, 'add');
    AsyncStorage.setItem(
      'CART',
      JSON.stringify(this.props.cartItems),
    );
    // this.setState(
    //   {count: this.state.count + 1},
    //   this.props.Update({
    //     id: this.props.data.id,
    //     qty: this.state.count + 1,
    //   }),
    //   this.props.onRefresh(),
    // );
  } else {
    Toast.show({
      text: 'Item Out of Stock!',
    });
  }
}}> 
            <Icon  type="antdesign" name="caretup" size={20} color={Colors.appRed} />
           </TouchableOpacity> 
           <Text style={[styles.price]}>
                {item.pro_qty?item.pro_qty:0}
              </Text>
           <TouchableOpacity activeOpacity={0.7} onPress={onDeleteItem}> 
            <Icon  type="antdesign" name="caretdown" size={20} color={Colors.appRed} />
           </TouchableOpacity>
           </View> 
           <TouchableOpacity activeOpacity={0.7} style={{flex:1,flexDirection:'column-reverse'}} onPress={onDeleteItem}> 
            <FontAwesome name="trash" size={30} color={Colors.appRed} />
           </TouchableOpacity> 
             </View>   
        </View>
    )
}
const styles =  StyleSheet.create({
    container:{
     flex:1,
     borderBottomWidth: 1,
     borderBottomColor: "#d4dce1",
    },
    content: {
     flexDirection: "row",
     margin: 10,
    },
    image: {
     width: 100,
     height: 100,
     borderRadius: 10,
    },
    infoView: {
     marginLeft: 10,
     marginRight: 10,
     flex: 1,
    },
    title: {
     fontSize: 15,
     fontFamily: 'Lato-Regular',
     color: Colors.darkBlue,
    },
    priceContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "flex-start",
      },
      price: {
        fontSize: 14,
        color: Colors.appBlue,
        textAlign:'center',
        fontFamily: 'Lato-Bold',
      },
}) 