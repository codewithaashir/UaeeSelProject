import React , {useState,useEffect} from 'react';
import {FlatList,Text} from 'react-native';
import { LoadingModal } from '../../Loaders';
import {Typography,ProductCatalog} from '../../Common';
import {Colors} from '../../Utils';
import { View } from 'native-base';
import styles from '../../Common/ProductPrice/styles';
import Languages from '../../Utils/Languages';
import Animated,{Easing} from 'react-native-reanimated';

export  function CategoryProduct(props){
    const [product,setProduct] = useState([]);
    const  {id,name} = props.route.params;
    const [tranformView,setTranformView] = useState(new Animated.Value(-16));
    useEffect(()=>{
        Animated.timing(tranformView, {
          toValue: 16,
          duration: 600,
          easing: Easing.bezier(0, 1.19, 0.74, 1.2)
        }).start();
      },[]);
    return(
        <React.Fragment>
         <Animated.View style={{backgroundColor:Colors.white,transform:[{translateY:tranformView}] }}>   
         <Typography variant='bold' style={{fontSize:30,padding:20,color:Colors.appRed}}>{name}</Typography>
         <View  style={{width:40,backgroundColor:Colors.appBlue,height:4,marginLeft:20,marginTop:-10}}/>
        </Animated.View>
         {product.length!=0?
        <FlatList
         keyExtractor={(index)=>index.toString()}
         style={{flex:1,backgroundColor:Colors.white}}
         showsVerticalScrollIndicator={false}
         scrollEventThrottle={1}
         data={[{id:'23e42',name:'Nilone Shoes for every one yep yep yep',featured_image:'https://www.freeiconspng.com/thumbs/men-suit-png/men-suit-png-19.png',price:'220',in_stock:10},{id:'288e42',name:'Nilone Shoes',featured_image:'https://www.freeiconspng.com/thumbs/men-suit-png/men-suit-png-19.png',price:'600',in_stock:1},]}
         renderItem={({item,index})=><ProductCatalog item={item} index={index} scene='Home'  {...props}/>}
         numColumns={2}
        //  ListFooterComponent={LoadingModal}
        />:
         <View style={styles.empty}>
        <Typography variant='bold' style={{fontSize:30,padding:20,textAlign:'center',color:Colors.appRed}}>{Languages.ThereIsNoMore}</Typography>
         </View>
        }
        </React.Fragment>
    )
}