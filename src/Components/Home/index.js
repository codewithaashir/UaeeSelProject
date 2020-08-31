import React ,{useState,useEffect}from 'react';
import {Empty, AnimatedView,ProductItem, GradientBtn} from '../../Common';
import {Languages,Colors} from "../../Utils"
import  {View, RefreshControl, StyleSheet}  from 'react-native'
import {Images} from '../../Assets';
import BannerSlider from './BannerSlider';
import { FlatList } from 'react-native-gesture-handler';
import { Service } from '../../Config/Services';
import { Loading, LoadingModal } from '../../Loaders';
import { set } from 'react-native-reanimated';
export default function Home(props){
  const [featuredProduct,setFeatured]=useState([]);
  const [nextUrl,setNextURl]=useState(null);
  const [loading,setLoading]=useState(false);
  const [response,setResponse] = useState('');
  const [refreshing,setRefreshing]=useState(false);
  const [isOnEndReached,setOnEndReached]=useState(false);
  useEffect(()=>{
    Service.getFeaturedProduct(setFeatured,setLoading,setResponse,setNextURl,nextUrl)
  },[isOnEndReached])
 
  const onEndReached = ()=>{
    if(nextUrl){
    setOnEndReached(true)
    }
    else {
      loading(false)
      //setOnEndReached(false)

    }
  }
    return(
        <AnimatedView style={{flex:1}} >
         <View style={{flex:1,padding:10}} 
         > 
        <BannerSlider/>
        <FlatList
         keyExtractor={(index)=>index.toString()}
         refreshing={refreshing}
         onRefresh={()=>console.warn('helo')}
         style={{flex:1}}
         showsVerticalScrollIndicator={false}
         scrollEventThrottle={1}
         data={featuredProduct}
         onEndReached={onEndReached}
         renderItem={({item,index})=><ProductItem item={item} index={index} scene='Home'  {...props}/>}
         numColumns={1}
        //  ListFooterComponent={
        //    isOnEndReached&&
        //    LoadingModal
        //   //  :
        //   //  <GradientBtn
        //   //   title={Languages.ViewMore}
        //   //   onPress={onRefresh}
        //   // />
        //  }
         //onEndReached={onLoadMore}
        />
        {loading &&
        Loading
         } 
        </View>
        </AnimatedView>
    )
}
