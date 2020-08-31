import React, { useState, useEffect } from 'react';
import {StyleSheet, View,Dimensions,Image} from  'react-native';
import Typography from './Typography';
import {Colors, getProductImage} from '../Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { Images } from '../Assets';
import {Icon} from 'react-native-elements';
import css from '../Styles';
import ProductPrice from './ProductPrice';
import Animated,{Easing} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {addWishItem }from '../Redux/Reducer/WishList';
import {addCartItem,addItemQuanToCart }from '../Redux/Reducer/Cart';
import AsyncStorage from '@react-native-community/async-storage';
import { ImgURl } from '../Config/Apis';
const {height,width} = Dimensions.get('window');

const ItemHeight=height*0.32;
let opac='41'
export default function ProductItem(props){
  const initialTranform=-16 
  const dispatch =useDispatch();
  const [tranformText,setTranformText] = useState(new Animated.Value(-16));
  const CartListItem = useSelector(state=>state.CartList);
  const WishListItem = useSelector(state=>state.WishList);
  const {index,item,scene} = props;
  useEffect(()=>{
    Animated.timing(tranformText, {
      toValue: 16,
      duration: 600,
      easing: Easing.bezier(0, 1.19, 0.74, 1.2)
    }).start();
  },[]);
       addtocart = cart => {
         AsyncStorage.setItem('Cart', JSON.stringify(cart));
       };
       const onCartPress = async (item) =>{
           //console.warn(CartListItem.Cart)
         if(CartListItem&&CartListItem.Cart&&CartListItem.Cart.length!=0){ 
           var exist = CartListItem.Cart.find(value => {
            return value.id == item.id;
          });
          if (exist) {
            await dispatch(addItemQuanToCart(item,'add'));
            //this.props.addItemQuanToCart(this.props.product, 'add');
          }
        }
          else{
            await dispatch(addCartItem(item,props.navigation));
            addtocart(CartListItem.Cart);
          }
        }
       const onWishPress =async (data) => {
         await dispatch(addWishItem(data,props.navigation))
         AsyncStorage.setItem('Wish', JSON.stringify(WishListItem.Wish));
       } 
    
    return(
        <View 
        style={[styles.container,{
          backgroundColor:index%2==0?
            Colors.cyan+(parseInt(opac)+index).toString()
            :
            Colors.cyan+(parseInt(opac)+index).toString()
        },
             index % 2 != 0||scene!='Home' && { marginLeft:10 }]}>

          <FastImage
           style={styles.productImg}
           source={{
               uri:getProductImage(ImgURl+item.featured_image,width),
               priority: FastImage.priority.high,
           }}
           resizeMode={FastImage.resizeMode.contain}
          />   
        
         <View style={styles.bottomView}>
         <TouchableOpacity activeOpacity={0.7}   style={styles.iconBtn} onPress={()=>onWishPress(item)}>     
         <Image source={Images.wishList} style={[iconstyles, { tintColor: Colors.appGreen }]} />   
         </TouchableOpacity>
         <Animated.View style={{flexDirection:'column',justifyContent:'space-between',transform:[{translateY:tranformText}]}}>
         <Typography variant="category" numberOfLines={2} style={css.nameTwo}>{item.name?item.name:''}</Typography> 
         <ProductPrice product={item} hideDisCount/>   
         </Animated.View>
         <TouchableOpacity activeOpacity={0.7}   style={styles.iconBtn} onPress={()=>onCartPress(item)}> 
         {/* <Icon type='feather' name='plus' color={Colors.appGreen} size={10} style={{marginLeft:10}} /> */}
         <Icon type='feather' name='shopping-bag' color={Colors.appGreen} size={20}/>
         </TouchableOpacity>
         </View>
        </View>    
    )
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      marginBottom:10,
      height:ItemHeight,
      borderRadius:20,  
    },
    productImg:{
      ...StyleSheet.absoluteFill,
      width:'auto',
      height:ItemHeight-70,
      marginVertical:ItemHeight*0.04,
      alignSelf:'center',
      resizeMode:'contain'
    },
    bottomView:{
      flex:1,
      alignItems:'flex-end',
      justifyContent:'space-between',
      padding:30,  
      flexDirection:'row'  
    },
    iconBtn:{
      width:30,
      height:30,
      borderRadius:7,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:Colors.lightGreen  
    },
});
const iconstyles = {
    width: 20, height: 20, resizeMode: 'contain',
  };