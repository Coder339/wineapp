import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import data from '../config/dummydata.json';
import WineItem from "../components/wineitem";
import { colors, loginBackground } from '../assets/globalstyleconstants';
import ImageContainer from '../components/common/imagecontainer';
import Loader from '../components/common/loader';
import { moderateScale } from '../assets/globalstylefunctions';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { SignIn, clearAction,GetProducts } from '../redux/actions/action';
import { LOADER, LOGIN_FAILURE, LOGIN_SUCCESS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from '../redux/actions/type';
import PushNotification from "react-native-push-notification";


export default function Listing() {
    const state = useSelector(state => state).reducer;
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [productData, setProductData] = useState(null)
    const [isVisible,setIsVisible] = useState(null)


    const seprator=()=>{
        
        return(
            <View style={{margin:moderateScale(20)}}></View>
        )
    }



    useEffect(()=>{
        
        dispatch(GetProducts())

    },[])

    useEffect(()=>{
        // console.log('data',data)
        // console.log('statecon',state.case)
        if (state.case === LOADER) {
            setIsVisible(true)
            console.log('loading...')
            // toast.show(state.message)
        }
        if (state.case === GET_PRODUCTS_SUCCESS) {
            // toast.show(state.message)
            console.log('products...',state.products.body)
            setProductData(state.products.body)
            console.log('productsData...',productData)
            setIsVisible(false)
        }
        else if (state.case === GET_PRODUCTS_FAILURE) {
            dispatch(clearAction())
       
        }
        
      },[state])
    return (
        <View>
            <Loader visible={state.loading}/>
            <ImageContainer image={loginBackground}/>
            <FlatList
                data={productData}
                keyExtractor={(item)=>item.id}
                renderItem={WineItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={seprator}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
