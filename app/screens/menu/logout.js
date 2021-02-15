import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button,Alert } from 'react-native'
import { removeData } from '../../config/storage'
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { logoutAction } from '../../redux/actions/action';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/common/loader';

export default function Logout() {
    const state = useSelector(state => state).reducer;
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isVisible,setIsVisible] = useState(false)
    const logoutHanlder=()=>{
        Alert.alert(
            'LOGOUT !',
            'PRESS OK TO LOGOUT',
            [
              {
                text: 'Cancel',
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: 'OK', 
                onPress: async () => {
                  dispatch(logoutAction())
                  removeData('userToken')
                  navigation.replace('Auth')
                }
              }
            ],
            { cancelable: false }
          );
    }

    useEffect(() => {
        
        AsyncStorage.getItem('userToken').then((value) =>
        
            value === null ? setIsVisible(true) : setIsVisible(false)
        
        )}
    );
    

    return (
        <View>
            <Button title='logout' onPress={logoutHanlder}/>
        </View>
    )
    

    }


const styles = StyleSheet.create({})
