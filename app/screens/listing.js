import React,{useEffect} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import data from '../config/dummydata.json';
import WineItem from "../components/wineitem";
import { colors, loginBackground } from '../assets/globalstyleconstants';
import ImageContainer from '../components/common/imagecontainer';
import { moderateScale } from '../assets/globalstylefunctions';

export default function Listing() {

    const seprator=()=>{
        
        return(
            <View style={{margin:moderateScale(20)}}></View>
        )
    }

    useEffect(()=>{
        console.log('data',data)
      },[])
    return (
        <View>
            <ImageContainer image={loginBackground}/>
            <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={WineItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={seprator}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
