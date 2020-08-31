import React, {useState, useEffect} from 'react';
import  {View,StyleSheet, Dimensions, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { getProductImage,getCurrecyFormatted,Colors } from '../Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ImgURl } from '../Config/Apis';
import css from '../Styles';
import Typography from './Typography';
import {useDispatch, useSelector} from 'react-redux';
import  {Icon} from  'react-native-elements'; 
const {height,width} = Dimensions.get('window');
import Animated,{Easing} from 'react-native-reanimated';
import {Toast} from 'native-base';
import { addItemQuanToCart } from '../Redux/Reducer/Cart';
export default function Item(props){
    const [tranformText,setTranformText] = useState(new Animated.Value(-9));
    const {index,item,scene,onPress,onDeleteItem} = props;
    const {Cart} = useSelector(state=>state.CartList)
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
    const changeQty= async (type) => {
      if(type=='add') {
      if (count <= item.qty) {
        setCount(count+1);
      await addItemQua(item, type);
      AsyncStorage.setItem(
        'Cart',
        JSON.stringify(Cart),
      );
       } else {
         Toast.show({
           text: 'Item Out of Stock!',
         });
       }
     }
     else{
      if(count>1) {
        setCount(count-1);
        await addItemQua(item, type);
      AsyncStorage.setItem(
        'Cart',
        JSON.stringify(Cart),
      );
      }
      else{
        onDeleteItem()
        AsyncStorage.setItem(
          'Cart',
          JSON.stringify(Cart),
        );
      }
     }
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
            <View style={{flexDirection:'column',justifyContent:'space-between'}}>
            <TouchableOpacity
            style={{justifyContent:'flex-end',alignItems:'flex-end'}}
            onPress={onDeleteItem}
            >
                <Icon name="closecircle" type="antdesign" color={Colors.appRed}/>
            </TouchableOpacity>
           {scene!='wish' &&
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={[styles.iconBtn,{marginEnd:3}]} activeOpacity={0.7} onPress={()=>changeQty('minus')}> 
            <Icon  type="font-awesome" name="minus" size={20} color={Colors.appRed} />
           </TouchableOpacity> 
           <Text style={[styles.price,{marginStart:4,marginEnd:4}]}>
                {item.pro_qty?item.pro_qty:0}
              </Text>
           <TouchableOpacity  style={styles.iconBtn} activeOpacity={0.7} onPress={()=>changeQty('add')}> 
            <Icon  type="font-awesome" name="plus" size={20} color={Colors.appRed} />
           </TouchableOpacity>
           </View> }
           </View>
           {/* <TouchableOpacity activeOpacity={0.7} style={{flex:1,flexDirection:'column-reverse'}} onPress={onDeleteItem}> 
            <FontAwesome name="trash" size={30} color={Colors.appRed} />
           </TouchableOpacity>  */}
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
      iconBtn:{
        width:25,
        height:25,
        marginStart:4,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.lightGreen  
      },
}) 