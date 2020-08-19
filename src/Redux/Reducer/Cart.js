import AsyncStorage from '@react-native-community/async-storage';
export const ADD_ITEM ='ADD_ITEM';
export const REMOVE_ITEM ='REMOVE_ITEM';
export const EMPTY_CartLIST ='EMPTY_CartLIST';
export const ADD_QUANTITY='ADD_QUANTITY'
var b = 0;
var MATCH = 'false';
export function addItem(data){
  return {
      type:ADD_ITEM,
      data:data
  }
} 
export function removeItem(data){
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
function CartList(state=intialState,action){
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