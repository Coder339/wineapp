import React, { useState } from 'react'
import { Button, StyleSheet, Text, View,TextInput } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import { colors, fonts } from '../../assets/globalstyleconstants';
import { scaleHeight } from '../../assets/globalstylefunctions';
import ScrollContainer from '../../components/common/scrollcontainer';



export default function CreateChatRoom() {

    const Navigation = useNavigation()

    const [roomName,setRoomName] = useState('')
    // ... rest remains same

    const roomNameHandler=(text)=>{
        setRoomName(text)
    }

    function handleButtonPress() {
        if (roomName.length > 0) {
        // create new thread using firebase & firestore
        firestore()
            .collection('MESSAGE_THREADS')
            .add({
            name: roomName,
            latestMessage: {
                text: `${roomName} created. Welcome!`,
                createdAt: new Date().getTime()
            }
            })
            .then(() => {
            Navigation.navigate('MessageScreen')
            })
        }
    }

    return (
        <ScrollContainer style={styles.container}>
            <Text>CreateChatRoom</Text>
            <TextInput
                placeholder='enter'
                underlineColorAndroid='transparent'
                placeholderTextColor={colors.black}
                onChangeText={roomNameHandler}
                value={roomName}
                style={{...styles.input,width:'90%'}}
                // secureTextEntry={data.isHidden}
            />
            <Button title='Enter' onPress={handleButtonPress}/>
        </ScrollContainer>
    )
}

const styles = StyleSheet.create({
    container:{
        // flexGrow:1,
        backgroundColor:colors.white,
        justifyContent:'center',
        alignItems:'center',
        height:scaleHeight('100%')
    },
    input:{
        // backgroundColor:'rgba(255,255,255,0.3)',
        // color:colors.white,
        borderWidth:1,
        fontFamily:fonts.MontserratRegular,
        height:scaleHeight('7%')
    },
})
