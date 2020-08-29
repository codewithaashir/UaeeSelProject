import React , {useState,useEffect} from 'react';
import { LoadingModal } from '../../Loaders';
import {Typography} from '../../Common';
import {Colors} from '../../Utils';
import { View } from 'native-base';
import Animated,{Easing} from 'react-native-reanimated';
import { Service } from '../../Config/Services';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
export  function Page(props){
    const  {name,title} = props.route.params;
    const [data,setData]=useState([]);
    const[loading,setLoading]=useState(false);
    const [tranformView,setTranformView] = useState(new Animated.Value(-16));
    useEffect(()=>{
        Service.getPage(setData,setLoading)
        Animated.timing(tranformView, {
          toValue: 16,
          duration: 600,
          easing: Easing.bezier(0, 1.19, 0.74, 1.2)
        }).start();
      },[]);
    return(
        <ScrollView scrollEventThrottle={1} showsVerticalScrollIndicator={false} contentContainerStyle={{padding:20}}>
         <Animated.View style={{transform:[{translateY:tranformView}] }}>   
         <Typography variant='bold' style={{fontSize:30,color:Colors.appRed}}>{title}</Typography>
         <View  style={{width:40,backgroundColor:Colors.appBlue,height:4,marginTop:4,marginBottom:30}}/>
        </Animated.View>
        {data &&
        //  name=='privacy'?
        //  <WebView source={{ uri:'https://uaesell.ae/privacy-policy/' }} />
        //  : 
        <HTML html={name=='about'?data.about:name=='privacy'?data.privacy:data.term_condition} />
         }
        {loading&&LoadingModal}
        </ScrollView>
    )
}