import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,Alert } from 'react-native'
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

export default function HandleNotification() {
    
    const [token,setToken] = useState('')
    const [notification,setNotification] = useState({
      title:'',
      message:''
    })

    PushNotification.configure({
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
      
        onNotification: function (notify) {
          console.log("NOTIFICATION:", notify);
          setNotification({...notification, title:notify.title, message:notify.message})

        //   navigation.navigate('Faq')
      
        },
      
        // onAction: function (notification) {
        //   console.log("ACTION:", notification.action);
        //   console.log("NOTIFICATION:", notification);

        // },
      
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        popInitialNotification: true,

        requestPermissions: true,
    });

    const testPush =()=>{
        PushNotification.localNotification({
            /* Android Only Properties */
            title: notification.title === '' ? 'WELCOME' : notification.title, // (optional)
            message: notification.message === '' ? 'Thanks for choosing WineApp' : notification.message, // (required)
            // bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
          });
    }

    useEffect(()=>{

      testPush()
    },[notification])

    useEffect(()=>{

        messaging()
        .getToken()
        .then(token => {
            // return saveTokenToDatabase(token);
            setToken(token)
            console.log('tokenfirebase',token)
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

          });
      
          return unsubscribe;

        // testPush()
    },[])

    return (
        null
    )
}

const styles = StyleSheet.create({})
