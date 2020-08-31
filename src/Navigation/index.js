import React, { useState, useEffect, useMemo } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../Utils';
import { useDispatch } from 'react-redux';
import MyNetInfo from '../Config/NetInfo';
import { clearsignupdata } from '../Redux/Reducer/SignUp';
import { clearuserdetails } from '../Redux/Reducer/User';
import { Signup,Login,Forget } from '../Components/AuthComponent';
import OnBoard from '../Components/Onboarding';
import Splash from '../Components/Splash';
import LetStarted from '../Components/Onboarding/LetStarted';
import { Service } from '../Config/Services';
import DashboardTab from './DashboardTab';

//Onboard Stack *****************************//
const OnboardStack = createStackNavigator();
const OnboardStackScreen = () => (
    <OnboardStack.Navigator
        screenOptions={params => ({
            // gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
        mode="card"
        headerMode="none"
        initialRouteName="Onboard"
    >
        <OnboardStack.Screen
            name="Onboard"
            component={OnBoard}
        />
    </OnboardStack.Navigator>
);
//Onboard Stack *****************************//

//Auth Stack *****************************//
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator
        screenOptions={params => ({
            // gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            // cardStyle: { opacity: 1, shadowOpacity: 1 }
        })}
        mode="card"
        headerMode="none"
    >
        <AuthStack.Screen name="LetStarted" component={LetStarted} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="ForgetPassword" component={Forget} />
        <AuthStack.Screen name="Guest" component={AppStackScreen}/>
        <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
);
//Auth Stack *****************************//

//App Stack *****************************//
const AppStack = createStackNavigator();
const AppStackScreen = () => (
    <AppStack.Navigator
        screenOptions={params => ({
            // gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            // cardStyle: { opacity: 1, shadowOpacity: 1 }
        })}
        mode="card"
        headerMode="none"
    >
        <AppStack.Screen name="Home" component={DashboardTab} />
    </AppStack.Navigator>
);
//App Stack *****************************//

//Root Stack *****************************//
const RootStack = createStackNavigator();
const RootStackScreen = ({ onboarding, userToken, inviteFriendsToken }) => {
    let isAuth = false;
    useEffect(() => {
        AsyncStorage.getItem('@userToken').then(value => {
            // console.warn('val:', value);
            if (value) {
                isAuth = true;
                // console.warn(isAuth);
            }
        });
    }, []);

    return (
        <RootStack.Navigator headerMode="none">
            {
                onboarding ?
                    (
                        // AsyncStorage.getItem('@userToken') ||
                        userToken || isAuth ? (
                            <RootStack.Screen name="App" component={AppStackScreen} />
                        ) : ( 
                              <RootStack.Screen name="Auth" component={AuthStackScreen} />
                            )
                    ) : (
                        <RootStack.Screen name="Onboard" component={OnboardStackScreen} />
                    )
            }
        </RootStack.Navigator>
    );
};
//Root Stack *****************************//
export default () => {
    const [isLoading, setIsLoading] = useState(true);
    const [onboarding, setOnboarding] = useState('');
    const [userToken, setUserToken] = useState('');
    const dispatch = useDispatch();
    const clearSignUpData = () => dispatch(clearsignupdata());
    const clearUserDetails = () => dispatch(clearuserdetails());

    const authContext = useMemo(() => {
        return {
            loading: () => {
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            },
            signIn: (obj,type, rememberMe, adduserData, loading, error,navigation) => {
                if(type!='socialLogin')
                Service.Login(obj, rememberMe, adduserData, loading, setUserToken, error,navigation);
                else
                Service.SocialSignIn(obj, rememberMe, adduserData, loading, setUserToken, error,navigation);

            },
            signUp: async (data, navigation, loading, message) => {
                Service.Signup(data,navigation,loading, message);
            },
            signOut: () => {
                setIsLoading(false);
                clearSignUpData();
                clearUserDetails();
                setUserToken(null);
                AsyncStorage.setItem('@userToken', '');
                AsyncStorage.removeItem('@user');
                // GoogleSignin.revokeAccess();
            },
            log:(navigation)=>{
                setIsLoading(false);
                clearSignUpData();
                clearUserDetails();
                setUserToken(null);
                AsyncStorage.setItem('@userToken', '');
                AsyncStorage.removeItem('@user');
                navigation.navigate('Auth',{screen:'Login'})
            },
            onboard: () => {
                setIsLoading(true);
                setOnboarding('true');
                AsyncStorage.setItem('@onboarding', 'asdf');
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            },

        };
    }, []);

    useEffect(() => {
        // crashlytics().log('App mounted.');
        // Geocoder.init('AIzaSyAkeEEi29Xdm5EQIefzyJmLUsjKYow7LDo');
        //AsyncStorage.clear();
        AsyncStorage.getItem('@onboarding').then(value => {
            setIsLoading(true);
            console.log('value onboarding', value);
            setOnboarding(value);
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        });
        AsyncStorage.getItem('@userToken').then(async value => {
            setIsLoading(true);
            //await Service.verifyToken(value);
            setUserToken(value);
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        });


    }, []);


    if (isLoading) {
        return <Splash />;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <RootStackScreen onboarding={onboarding} userToken={userToken}  />
                <MyNetInfo />
            </NavigationContainer>
        </AuthContext.Provider>
    );
};
