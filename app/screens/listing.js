import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import data from '../config/dummydata.json';
import WineItem from "../components/wineitem";
import { colors, loginBackground } from '../assets/globalstyleconstants';
import ImageContainer from '../components/common/imagecontainer';
import { moderateScale } from '../assets/globalstylefunctions';
import { useSelector, useDispatch } from 'react-redux';
import { SignIn, clearAction,GetProducts } from '../redux/actions/action';
import { LOADER, LOGIN_FAILURE, LOGIN_SUCCESS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from '../redux/actions/type';
export default function Listing() {
    const state = useSelector(state => state).reducer;
    const dispatch = useDispatch();

    const [productData, setProductData] = useState(null)

    // const modelClose=()=>{
    //     alert('alert')
    // }

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
        // if (state.case === LOADER) {
        //     // setIsVisible(true)
        //     console.log('loading...')
        //     // toast.show(state.message)
        // }
        if (state.case === GET_PRODUCTS_SUCCESS) {
            // toast.show(state.message)
            console.log('products...',state.products.body)
            setProductData(state.products.body)
            console.log('productsData...',productData)
        }
        else if (state.case === GET_PRODUCTS_FAILURE) {
            dispatch(clearAction())
       
        }
        
      },[state])
    return (
        <View>
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
