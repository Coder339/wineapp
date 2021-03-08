
import React,{useState,useEffect} from 'react';
// import { colors } from '../assets/globalstyleconstants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Splash from '../screens/splash';
import Login from '../screens/login';
import Signup from '../screens/signup';

import Faq from '../screens/menu/faq';
import ContactUs from '../screens/menu/contactus';
import Refer from '../screens/menu/refer';
import Rewards from '../screens/menu/rewards';
import TermsOfService from '../screens/menu/termsofservice';
import PrivacyPolicy from '../screens/menu/privacypolicy';
import Logout from '../screens/menu/logout';
import Animate from '../screens/animate';
import Listing from '../screens/listing';
import { 
  activeHome, 
  inactiveHome, 
  colors, 
  activeFav, 
  inactiveFav, 
  activeSettings, 
  inactiveSettings, 
  activeCart, 
  inactiveCart, 
  activeIce,
  inactiveIce,
  fonts} from '../assets/globalstyleconstants';
import Cart from '../screens/cart';
import Favourites from '../screens/favourites';
import Categories from '../screens/categories';
import Settings from '../screens/settings';
import OnboardingScreen from '../screens/onboarding';
import { GoogleSignin } from '@react-native-community/google-signin';
import MessageScreen from '../screens/menu/messagescreen';
import ChatScreen from '../screens/menu/chatscreen';
import CreateChatRoom from '../screens/menu/createchatroom';

const Stack = createStackNavigator();  // Testing as of now. 

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();


export function AuthStack() {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

    useEffect(() => {
      AsyncStorage.getItem('alreadyLaunched').then((value) => {
        if (value === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
          setIsFirstLaunch(true);
          
        } else {
          setIsFirstLaunch(false);
          
        }
      }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
    
      GoogleSignin.configure({
        webClientId: "170241595518-5p5p49737o54i9e0r5jjqq6gl5sa84sc.apps.googleusercontent.com",
      });
    
    }, []);


    if (isFirstLaunch === null) {
      return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
    } else if (isFirstLaunch === true) {
      routeName = 'Onboarding';
    } else {
      routeName = 'SignIn';
    }

    return (
      <Stack.Navigator
        mode='modal'
        initialRouteName={routeName}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
        <Stack.Screen name="SignIn" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
    );
  }


export function MessageStack({route,navigation}) {

  return (
    <Stack.Navigator
      mode='modal'
      initialRouteName="MessageScreen"
      screenOptions={{
        // headerShown: false
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily:fonts.FasterOneRegular,
        },
      }}
    >
      {/* <Stack.Screen 
        name="CreateChatScreen" 
        component={CreateChatRoom}
        options={{ 
          title: 'Enter   Chat   Room', 
        }} 
      /> */}
      <Stack.Screen 
        name="MessageScreen" 
        component={MessageScreen}
        options={{ 
          title: 'ChatWindow', 
        }} 
      />
      <Stack.Screen 
        name="ChatScreen" 
        component={ChatScreen} 
        options={({ route }) => ({ 
          title: route.params.userName, 
        })} 
      />
    </Stack.Navigator>
  );
}

export function MenuStack({route,navigation}) {

  return (
    <Drawer.Navigator 
        initialRouteName="HomeTabs" 
        drawerPosition='right'
        drawerStyle={{
          // activeTintColor:colors.appColor,
          // activeBackgroundColor:colors.appColor
          // width: 240,
        }}
        >
        <Drawer.Screen name="HomeTabs" component={HomeTabs} />
        <Drawer.Screen name="Message" component={MessageStack} />
        <Drawer.Screen name="Faq" component={Faq} />
        <Drawer.Screen name="ContactUs" component={ContactUs} />
        <Drawer.Screen name="Refer" component={Refer} />
        <Drawer.Screen name="Rewards" component={Rewards} />
        <Drawer.Screen name="TermsOfService" component={TermsOfService} />
        <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
  );
}

export function HomeStack({route,navigation}) {

  return (
    <Stack.Navigator
      mode='modal'
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Landing" component={Listing}/>
      {/* <RootStack.Screen name="Menu" component={MenuStack}/> */}
    </Stack.Navigator>
  );
}


export function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color,focused }) => {
          if (route.name === 'Home') {
            return focused ? activeHome : inactiveHome
          } else if (route.name === 'Favourites') {
            return focused ? activeFav : inactiveFav
          } else if (route.name === 'Categories') {
            return focused ? activeIce : inactiveIce
          } else if (route.name === 'Settings') {
            return focused ? activeSettings : inactiveSettings
          }else if (route.name === 'Cart') {
            return focused ? activeCart : inactiveCart
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.appColor,
        inactiveTintColor: 'gray',
        keyboardHidesTabBar:true,
        showLabel:false
      }}
      
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favourites" component={Favourites}/>
      <Tab.Screen name="Categories" component={Categories}/>
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}


export default function RootStackScreen(){

  return(
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="App"
        component={MenuStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
};


