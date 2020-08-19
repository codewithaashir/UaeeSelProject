import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'native-base';
export const ADD_ITEM ='ADD_ITEM';
export const REMOVE_ITEM ='REMOVE_ITEM';
export const EMPTY_WISHLIST ='EMPTY_WISHLIST';
export const ADD_QUANTITY='ADD_QUANTITY'
var b = 0;
var MATCH = 'false';
export function addItem(product, navigation){
    var obj = product;
    Object.assign(obj, {pro_qty: 1});

    if (product.in_stock == 0) {
      Toast.show({
        text: 'Product out of stock',
      });
      return;
    } else {
      Toast.show({
        text: 'Added to WishList successfully',
        position: 'bottom',
        type: 'success',
        buttonText: 'View WishList',
        buttonStyle:{borderColor:"#fff",borderWidth:1},
        onClose:(reason)=>{
                  
          if(reason=='user')
          {
            navigation.navigate('Wish List');
          }
        },
        duration: 3000
      });
      return {
        type:ADD_ITEM,
        data:obj
    }
    }
} 
export function addItemQuanToWishList(product, value){
  return {
    type:ADD_QUANTITY,
    val: value,
    data:obj
}
}
export function removeItem(data){
    return {
        type:REMOVE_ITEM,
        data:data
    }
  } 
export function clearWishList(){
  return {
      type:EMPTY_WISHLIST,
  }
}
const initialState = {
  Wish: [],
  total: 0,
};
AsyncStorage.getItem('Wish', (error, result) => {
  if (!error) {
    if (result) {
      Object.assign(initialState, {Wish: JSON.parse(result)});
    } else {
      Object.assign(initialState, {Wish: []});
    }
  }
});
function WishList(state=intialState,action){
  switch(action.type){
      case ADD_QUANTITY :
      //console.warn();
      if (action.val == 'add') {
        return {
          ...state,
          Wish: state.Wish.map(WishItem => {
            if (WishItem.id === action.data.id) {
              WishItem.pro_qty = WishItem.pro_qty + 1;
            }
            return WishItem;
          }),
          //action.payload,
          //,
        };
      } else {
        return {
          ...state,
          Wish: state.Wish.map(WishItem => {
            if (WishItem.id === action.data.id) {
              WishItem.pro_qty = WishItem.pro_qty - 1;
            }
            return WishItem;
          }),
          //action.payload,
          //,
        };
      }
      case EMPTY_WISHLIST :
      return {
        ...state,
        Wish: [],
        total: 0,
      };
      case ADD_ITEM:
      MATCH = 'false';
      return {
        ...state,
        Wish: [
          ...state.Wish.filter(WishItem => WishItem.id !== action.data.id),
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
export default WishList