/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Header } from '../Common';
import { Icon } from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Images } from "../Assets";
import { Colors } from '../Utils';
import {WishList,Categories,Cart,Home} from '../Components';
//*** Start of Wish List Stack***
const WishListStack = createStackNavigator();
const WishListStackScreen = (props)=>{
  return(
    <WishListStack.Navigator 
    screenOptions={params => ({
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    })}
    headerMode="none" initialRouteName="WishList"
     >
      <WishListStack.Screen name='WishList' component={WishList}/>
    </WishListStack.Navigator>  
  )
}
//***End of Wish List Stack***

//*** Start of Category List Stack***
const CategoryStack = createStackNavigator();
const CategoryStackScreen = (props)=>{
  return(
    <CategoryStack.Navigator 
    screenOptions={params => ({
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    })}
    headerMode="none" initialRouteName="Category"
     >
      <CategoryStack.Screen name='Category' component={Categories}/>
    </CategoryStack.Navigator>  
  )
}
//***End of Category List Stack***

//*** Start of Category List Stack***
const CartStack = createStackNavigator();
const CartStackScreen = (props)=>{
  return(
    <CartStack.Navigator 
    screenOptions={params => ({
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    })}
    headerMode="none" initialRouteName="Cart"
     >
      <CartStack.Screen name='Cart' component={Cart}/>
    </CartStack.Navigator>  
  )
}
//***End of Category List Stack***

//*** Start of Home List Stack***
const HomeStack = createStackNavigator();
const HomeStackScreen = (props)=>{
  return(
    <HomeStack.Navigator 
    screenOptions={params => ({
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    })}
    headerMode="none" initialRouteName="Home"
     >
      <HomeStack.Screen name='Home' component={Home}/>
    </HomeStack.Navigator>  
  )
}
//***End of Home List Stack***

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}
const Tab = createMaterialBottomTabNavigator();
const Tabs = [
  {
    name: 'Home',
    icon: (focus, color) => <Image source={Images.home} style={[iconstyles, { tintColor: color }]} />,
    component: HomeStackScreen,
  },
  {
    name: 'Categories',
    icon: (focus, color) => <Image source={Images.categories} style={[iconstyles, { tintColor: color }]} />,
    component: CategoryStackScreen,
  },
  {
    name: 'Wish List',
    icon: (focus, color, count) =>
      <React.Fragment>
       {count>=1&&
        <View style={[styles.Bad,{right:-10}]}>
          <Text style={{ fontSize: 8,color:Colors.appBlue }}>{count}</Text>
        </View>}
        <Image source={Images.wishList} style={[iconstyles, { tintColor: color }]} />
      </React.Fragment>
    ,
    component: WishListStackScreen,
  },
  {
    name: 'Deals',
    icon: (focus, color) => <Fontisto name='shopping-package' color={color} size={20}/>,
    component: HomeScreen,
  },
  {
    name: 'Cart',
    icon: (focus, color, count) =>
      <>
       {count>=1&&
        <View style={styles.Bad}>
          <Text style={{ fontSize: 8,color:Colors.appBlue }}>{count}</Text>
        </View>}
        <Icon type='feather' name='shopping-bag' color={color} size={20}/>
      </>
    ,
    component: CartStackScreen,
  },
  {
    name: 'Account',
    icon: (focus, color) => <Image source={Images.account} style={[iconstyles, { tintColor: color }]} />,
    component: HomeScreen,
  },
]
export default HomeTabs = props => {
  // Get a name of current screen
  const routeName = props && props.route && props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : '.';

  const isFocused = useIsFocused();
  const tabBarColor = Colors.white;
  let icon = 'feather';


  const RenderHeader = () => {
    switch (routeName) {
      case 'News':
        return <Header navigation={props.navigation} logo />;
      default:
        return <Header navigation={props.navigation} />;
    }
  };

  const WishCount = '2';
  const CartCount = '2';

  return (
    <React.Fragment >
      <RenderHeader />
      <Tab.Navigator initialRouteName="Home" 
        shifting={true}
        labeled={false}
        activeColor={Colors.appBlue}
        inactiveColor={Colors.appGreen}
        barStyle={{
          backgroundColor: Colors.white,
          borderTopLeftRadius:15,
          borderTopRightRadius:15
        }}
        backBehavior="initialRoute"
      >
        {Tabs.map((item, index) => (
          <Tab.Screen
            key={index.toString()}
            name={item.name}
            component={item.component}
            options={({
              tabBarIcon: ({ focused, color }) => item.icon(focused, color, item.name == 'Cart' ? CartCount : WishCount),
              tabBarColor,
            })}
            initialParams={{ refresh: false }}
          // listeners={({ navigation, route }) => ({
          //   tabPress: e => {
          //     if (route.params.title === '.') {
          //       e.preventDefault();
          //       navigation.setParams({
          //         refresh: true,
          //       });
          //     }
          //   },
          // })}
          // options={{
          //   tabBarIcon:({ focused, color})=>item.icon(focused, color),
          //   tabBarColor,
          // }}
          />
        ))}
      </Tab.Navigator>

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  Bad: { 
    position: 'absolute',
    right: -8, 
    top:-7, 
    backgroundColor: Colors.lightGreen, 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 16, 
    width: 16 
  }
})
const iconstyles = {
  width: 20, height: 20, resizeMode: 'contain',
};
