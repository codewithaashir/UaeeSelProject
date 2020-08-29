import React ,{useState,useEffect}from 'react';
import {Empty, AnimatedView,ProductItem} from '../../Common';
import {Languages,Colors} from "../../Utils"
import  {View}  from 'react-native'
import {Images} from '../../Assets';
import BannerSlider from './BannerSlider';
import { FlatList } from 'react-native-gesture-handler';
import { Service } from '../../Config/Services';
import { Loading } from '../../Loaders';
import { set } from 'react-native-reanimated';
export default function Home(props){
  const [featuredProduct,setFeatured]=useState([]);
  const [loading,setLoading]=useState(false);
  const [response,setResponse] = useState('');
  
  useEffect(()=>{
    Service.getFeaturedProduct(setFeatured,setLoading,setResponse)
  },[])
    return(
        <AnimatedView style={{flex:1}}>
         <View style={{flex:1,padding:10}}> 
        <BannerSlider/>
        <FlatList
         keyExtractor={(index)=>index.toString()}
         style={{flex:1}}
         showsVerticalScrollIndicator={false}
         scrollEventThrottle={1}
         data={featuredProduct}
         renderItem={({item,index})=><ProductItem item={item} index={index} scene='Home'  {...props}/>}
         numColumns={1}
         
        />
        {loading &&
        Loading
         } 
        </View>
        </AnimatedView>
    )
}