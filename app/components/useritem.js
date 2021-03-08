import React,{useState} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import { fonts } from '../assets/globalstyleconstants'
import { scaleHeight, scaleWidth } from '../assets/globalstylefunctions'
import Card from './common/card'
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

function Item(props) {
    const { item } = props
    const [user, setUser] = useState(null)

    const navigation = useNavigation();
    const name = item.userName
    const id = item.id

    async function handlePress() {
        // const _id = Math.random().toString(36).substring(7)
        const user = { id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    return (
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('ChatScreen',{
                                                       user:user,
                                                       userName:name,
                                                       id:id
                                                       }
                                                    )}>
            <View style={styles.container}>
                <View>
                    <Image source={item.userImg} style={styles.image}/>
                </View>
                <View style={styles.textSection}>
                    <View style={styles.userInfoText}>
                        <Text style={[styles.userName,styles.fontBold]}>{item.userName}</Text>
                        <Text style={[styles.msgTime,styles.fontLight]}>{item.messageTime}</Text>
                    </View>
                    <Text style={[styles.msgText,styles.fontLight]}>{item.messageText}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const UserItem=({item})=>{
    return (
        <Item item={item}/>
    )
}

const styles = StyleSheet.create({
    card:{
        // width:'100%',
        marginVertical:scaleHeight('1%')
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    image:{
        width:scaleWidth('15%'),
        height:scaleWidth('15%'),
        borderRadius:scaleWidth('7.5%')
    },
    textSection:{
        width:scaleWidth('75%'),
        marginLeft:scaleWidth('2%')
    },
    userInfoText:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    userName:{

    },
    msgText:{
        fontSize:scaleWidth('3.2%'),
        marginTop:scaleHeight('1%')
    },
    msgTime:{
        fontSize:scaleWidth('3%')
    },
    fontBold:{
        fontFamily:fonts.MontserratBold
    },
    fontLight:{
        fontFamily:fonts.MontserratRegular
    }
    
})
