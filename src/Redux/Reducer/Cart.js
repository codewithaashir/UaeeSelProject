import AsyncStorage from '@react-native-community/async-storage';
import {Toast} from 'native-base';
export const ADD_ITEM ='ADD_ITEM';
export const REMOVE_ITEM ='REMOVE_ITEM';
export const EMPTY_CartLIST ='EMPTY_CartLIST';
export const ADD_QUANTITY='ADD_QUANTITY';
var b = 0;
var MATCH = 'false';
export function addCartItem(product, navigation){
  var obj = product;
  Object.assign(obj, {pro_qty: 1});
  
  if (product.in_stock == 0) {
        Toast.show({
          text: 'Product out of stock',
        });
        return;
      } else {
        // Toast.show({
        //   text: 'Added to Cart successfully',
        //   position: 'bottom',
        //   type: 'success',
        //   buttonText: 'View Cart',
        //   buttonStyle:{borderColor:"#fff",borderWidth:1},
        //   onClose:(reason)=>{
                    
        //     if(reason=='user')
        //     {
        //       navigation.navigate('Wish List');
        //     }
        //   },
        //   duration: 3000
        // });
        return {
          type:ADD_ITEM,
          data:obj
      }
      }
  } 
  export function addItemQuanToCart(product, value){
    return {
      type:ADD_QUANTITY,
      val: value,
      data:product
  }
  }
export function removeCartItem(data){
    return {
        type:REMOVE_ITEM,
        data:data
    }
  } 
export function clearCartList(){
  return {
      type:EMPTY_CartLIST,
  }
}
const initialState = {
  Cart: [],
  total: 0,
};
AsyncStorage.getItem('Cart', (error, result) => {
  if (!error) {
    if (result) {
      Object.assign(initialState, {Cart: JSON.parse(result)});
    } else {
      Object.assign(initialState, {Cart: []});
    }
  }
});
function CartList(state=initialState,action){
  switch(action.type){
      case ADD_QUANTITY :
      //console.warn();
      if (action.val == 'add') {
        return {
          ...state,
          Cart: state.Cart.map(CartItem => {
            if (CartItem.id === action.data.id) {
              CartItem.pro_qty = CartItem.pro_qty + 1;
            }
            return CartItem;
          }),
          //action.payload,
          //,
        };
      } else {
        return {
          ...state,
          Cart: state.Cart.map(CartItem => {
            if (CartItem.id === action.data.id) {
              CartItem.pro_qty = CartItem.pro_qty - 1;
            }
            return CartItem;
          }),
          //action.payload,
          //,
        };
      }
      case EMPTY_CartLIST :
      return {
        ...state,
        Cart: [],
        total: 0,
      };
      case ADD_ITEM:
      MATCH = 'false';
      return {
        ...state,
        Cart: [
          ...state.Cart.filter(CartItem => CartItem.id !== action.data.id),
          action.data,
        ],
        total:
          MATCH == 'true'
            ? state.total
            : state.total + parseInt(action.data.price).toFixed(2),
      };
      case REMOVE_ITEM:
       let temp = state.filter(item=>item!=action.data.text&&action.data.createdAt)
       return temp;            
       default:
       return state; 
  }

}
export default CartList