import AsyncStorage from '@react-native-community/async-storage';
import {Toast} from 'native-base';
export const ADD_WISH_ITEM ='ADD_WISH_ITEM';
export const REMOVE_WISH_ITEM ='REMOVE_WISH_ITEM';
export const EMPTY_WISHLIST ='EMPTY_WISHLIST';
export const ADD_QUANTITY='ADD_QUANTITY'
var b = 0;
var MATCH = 'false';
export function addWishItem(product, navigation){
      // Toast.show({
      //   text: 'Added to WishList successfully',
      //   position: 'bottom',
      //   type: 'success',
      //   buttonText: 'View WishList',
      //   buttonStyle:{borderColor:"#fff",borderWidth:1},
      //   style: {
      //     backgroundColor: "blue",
      //     marginBottom:10
      //    },
      //   onClose:(reason)=>{
                  
      //     if(reason=='user')
      //     {
      //       navigation.navigate('Wish List');
      //     }
      //   },
      //   duration: 3000
      // });
      return {
        type:ADD_WISH_ITEM,
        data:product
    }
} 
export function removeWishItem(data){
    return {
        type:REMOVE_WISH_ITEM,
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
function WishList(state=initialState,action){
  switch(action.type){
      case EMPTY_WISHLIST :
      return {
        ...state,
        Wish: [],
        total: 0,
      };
      case ADD_WISH_ITEM:
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
            : state.total + parseFloat(action.data.price),
      };
      case REMOVE_WISH_ITEM:
        return {
          ...state,
          Wish: state.Wish.filter((item, i) => item.id !== action.data.id),
          total: state.total - parseInt(action.data.price),
        };         
       default:
       return state; 
  }

}
export default WishList