
import React from 'react';
// import { colors } from '../assets/globalstyleconstants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View,Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

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
import Profile from '../screens/profile';
import Inbox from '../screens/inbox';
import Listing from '../screens/listing';
import Notification from '../screens/notification';
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
  inactiveIce} from '../assets/globalstyleconstants';

const Stack = createStackNavigator();  // Testing as of now. 

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();


export function AuthStack() {
    return (
      <Stack.Navigator
        mode='modal'
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SignIn" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
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

  export function BookMarkStack({route,navigation}) {

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
        initialRouteName="Bookmark"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color,focused }) => {
            if (route.name === 'Bookmark') {
              return focused ? activeHome : inactiveHome
            } else if (route.name === 'Notification') {
              return focused ? activeFav : inactiveFav
            } else if (route.name === 'Profile') {
              return focused ? activeIce : inactiveIce
            } else if (route.name === 'Inbox') {
              return focused ? activeSettings : inactiveSettings
            }else if (route.name === 'Current Listing') {
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
        <Tab.Screen name="Bookmark" component={BookMarkStack} />
        <Tab.Screen name="Notification" component={Notification}/>
        <Tab.Screen name="Profile" component={Profile}/>
        <Tab.Screen name="Inbox" component={Inbox} />
        <Tab.Screen name="Current Listing" component={Listing} />
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