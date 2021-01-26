import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import { removeData } from '../../config/storage'
import {useNavigation} from '@react-navigation/native';

export default function Logout() {
    const navigation = useNavigation()
    const logoutHanlder=()=>{
        removeData('userToken')
        navigation.replace('Auth')
    }

    return (
        <View>
            <Button title='logout' onPress={logoutHanlder}/>
        </View>
    )
}

const styles = StyleSheet.create({})
