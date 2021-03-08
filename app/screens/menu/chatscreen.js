import React,{useEffect,useCallback,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../assets/globalstyleconstants'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scaleWidth } from '../../assets/globalstylefunctions';
import firestore from '@react-native-firebase/firestore';

const db = firestore()
const chatsRef = db.collection('chats')

export default function ChatScreen({route}) {
    const {userName,id} = route.params
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // setMessages([
        // {
        //     _id: 1,
        //     text: 'Hello developer',
        //     createdAt: new Date(),
        //     user: {
        //     _id: 2,
        //     name: 'React Native',
        //     avatar: 'https://placeimg.com/140/140/any',
        //     },
        // },
        // ])
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])


    const renderSend = (props) => {
    return (
        <Send {...props}>
            <View>
                <MaterialCommunityIcons
                name="send-circle"
                style={{marginBottom: scaleWidth('2%'), marginRight: scaleWidth('1%')}}
                size={32}
                color="#2e64e5"
                />
            </View>
        </Send>
    );
    };

    const renderBubble = (props) => {
    return (
        <Bubble
        {...props}
        wrapperStyle={{
            right: {
            backgroundColor: '#2e64e5',
            },
        }}
        textStyle={{
            right: {
            color: '#fff',
            },
        }}
        />
    );
    };

    const scrollToBottomComponent = () => {
    return(
        <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
    }

    // const onSend = useCallback((messages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }

    return (
        <GiftedChat
        messages={messages}
        // onSend={messages => onSend(messages)}
        onSend={handleSend}
        // user={{_id: 1}}
        user={{user: userName, _id: id}}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        // isLoadingEarlier
        // showUserAvatar
        // onPressAvatar={()=>alert(messages[0].user.name)}
        // onLongPressAvatar={()=>alert('hello')}
        />
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:colors.black
    }
})
