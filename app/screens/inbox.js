import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';
import { moderateScale } from '../assets/globalstylefunctions';

export default function Inbox() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        fetch('https://www.amiiboapi.com/api/amiibo', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json)
            setData(json.amiibo)
            console.log('data',data)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));;

    },[])

    const renderItem = ({item})=>{
        return(
            <View>
                <Text style={{fontSize:moderateScale(22),fontWeight:'bold'}}>{item.character}</Text>
            </View>
        )
    }
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
