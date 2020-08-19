import React,{useEffect,useState} from  'react';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  Value,
  useCode,
  startClock,
  set,
  divide,
  cond,
  eq,
  multiply,
  greaterThan,
  interpolate,
  Extrapolate,
  debug,
} from "react-native-reanimated";
import {
  diff,
  useValue,
  useClock,
  withSpringTransition,
  useDiff,
} from "react-native-redash";
import { AnimatedView,CategoriesItem } from '../../Common';
import {Colors,useConsts} from '../../Utils';
import {Service} from '../../Config/Services';  
import { Loading, LoadingModal } from '../../Loaders';
const perspective = 600;
export  default  function Categories(props){
   const [categories,setCategories]=useState([]);
   const [loading,setLoading]=useState(false);
   const [response,setResponse] = useState('');
   
   useEffect(()=>{
     Service.getCategories(setCategories,setLoading,setResponse)
   },[])
   const clock = useClock();
   const y = useValue(0);
   const velocity = useValue(0);
   const onScroll = useConsts(() =>
     Animated.event([
       {
         nativeEvent: {
           contentOffset: { y },
         },
       },
     ])
   );
   const dy = useDiff(y);
   const dt = useDiff(clock);
   useCode(() => [startClock(clock), set(velocity, divide(dy, dt))], []);
   const skewY = interpolate(velocity, {
     inputRange: [-5, 0, 5],
     outputRange: [-Math.PI / 9, 0, Math.PI / 9],
     extrapolate: Extrapolate.CLAMP,
   });
  return(
     <AnimatedView style={{flex:1}}>   
     <Animated.ScrollView scrollEventThrottle={1} {...{onScroll}} showsVerticalScrollIndicator={false} style={{backgroundColor:Colors.appRed+'31',padding:10}}>
       {categories.map((item,index)=>(
         <Animated.View
         key={index}
         style={{
           width: "100%",
           marginTop: 20,
           transform: [{ perspective }, { skewY }],
         }}
       >
       <CategoriesItem item={item} index={index}/>
       </Animated.View>
       ))}
     </Animated.ScrollView>  
      {loading &&
       Loading
      } 
     </AnimatedView>
    )
}