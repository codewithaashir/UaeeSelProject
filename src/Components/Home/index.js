import React from 'react';
import {Empty, AnimatedView,ProductItem} from '../../Common';
import {Languages,Colors} from "../../Utils"
import  {View}  from 'react-native'
import {Images} from '../../Assets';
import BannerSlider from './BannerSlider';
import { FlatList } from 'react-native-gesture-handler';
const list = [
  {
    id: 1,
    name: Languages.loading,
    images: [Images.PlaceHolder],
  },
  {
    id: 2,
    name: Languages.loading,
    images: [Images.PlaceHolder],
  },
  {
    id: 3,
    name: Languages.loading,
    images: [Images.PlaceHolder],
  },
];
export default function Home(props){
    return(
        <AnimatedView style={{flex:1}}>
         <View style={{flex:1,backgroundColor:Colors.appRed+'31',padding:10}}> 
        <BannerSlider
        />
        <FlatList
         keyExtractor={(index)=>index.toString()}
         style={{flex:1}}
         showsVerticalScrollIndicator={false}
         scrollEventThrottle={1}
         data={[{id:'23e42',name:'Nilone Shoes for every one yep yep yep',featured_image:'https://www.freeiconspng.com/thumbs/men-suit-png/men-suit-png-19.png',price:'220'}]}
         renderItem={({item,index})=><ProductItem item={item} index={index} scene='Home'/>}
         numColumns={1}
        />
        </View>
        </AnimatedView>
    )
}