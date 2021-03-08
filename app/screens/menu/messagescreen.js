import React,{useState,useEffect,useCallback} from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, Text, View,FlatList,ActivityIndicator,TextInput,Button } from 'react-native'
import { colors } from '../../assets/globalstyleconstants';
import { scaleWidth } from '../../assets/globalstylefunctions';
import { UserItem } from '../../components/useritem';
import { Messages } from '../../config/messages';
import firestore from '@react-native-firebase/firestore';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';

const db = firestore()
const chatsRef = db.collection('chats')

export default function MessageScreen() {
     
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    readUser()
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

    // const [threads, setThreads] = useState([])
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const unsubscribe = firestore()
    //     .collection('MESSAGE_THREADS')
    //     .orderBy('latestMessage.createdAt', 'desc')
    //     .onSnapshot(querySnapshot => {
    //         const threads = querySnapshot.docs.map(documentSnapshot => {
    //         return {
    //             _id: documentSnapshot.id,
    //             name: '',
    //             latestMessage: { text: '' },
    //             ...documentSnapshot.data()
    //         }
    //         })

    //         setThreads(threads)
    //         console.log(threads)
    //         if (loading) {
    //         setLoading(false)
    //         }
    //     })

    //     return () => unsubscribe()
    // }, [])

    // if (loading) {
    //     return <ActivityIndicator size='large' color='#555' />
    // }
    
    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    
    async function readUser() {
      const user = await AsyncStorage.getItem('user')
      if (user) {
          setUser(JSON.parse(user))
      }
    }
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }
    
    const sepratorItem=()=>{
        return(
            <View style={{borderWidth:0.5,width:scaleWidth('75%'),marginLeft:scaleWidth('17%')}}/>
        )
    }

    // if (!user) {
    //   return (
    //       <View style={styles.container}>
    //           <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
    //           <Button onPress={handlePress} title="Enter the chat" />
    //       </View>
    //   )
    // }

    return (
        <View style={styles.container}>
            <FlatList
              data={Messages}
              keyExtractor={(item)=>item.id}
              renderItem={UserItem}
              ItemSeparatorComponent={sepratorItem}
            />
        </View>
        // <View style={styles.container}>
        //     <FlatList
        //         data={threads}
        //         keyExtractor={item => item._id}
        //         renderItem={({ item }) => (
        //         <TouchableOpacity onPress={() => alert('Open a message thread')}>
        //             <View style={styles.row}>
        //             <View style={styles.content}>
        //                 <View style={styles.header}>
        //                 <Text style={styles.nameText}>{item.name}</Text>
        //                 </View>
        //                 <Text style={styles.contentText}>
        //                 {item.latestMessage.text.slice(0, 90)}
        //                 </Text>
        //             </View>
        //             </View>
        //         </TouchableOpacity>
        //         )}
        //         ItemSeparatorComponent={sepratorItem}
        //     />
        // </View>
        // <GiftedChat messages={messages} user={user} onSend={handleSend} />
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.chat
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: '#dee2eb'
    //   },
    //   title: {
    //     marginTop: 20,
    //     marginBottom: 30,
    //     fontSize: 28,
    //     fontWeight: '500'
    //   },
    //   row: {
    //     paddingRight: 10,
    //     paddingLeft: 5,
    //     paddingVertical: 5,
    //     flexDirection: 'row',
    //     alignItems: 'center'
    //   },
    //   content: {
    //     flexShrink: 1
    //   },
    //   header: {
    //     flexDirection: 'row'
    //   },
    //   nameText: {
    //     fontWeight: '600',
    //     fontSize: 18,
    //     color: '#000'
    //   },
    //   dateText: {},
    //   contentText: {
    //     color: '#949494',
    //     fontSize: 16,
    //     marginTop: 2
    //   }



    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     padding: 30,
    // },
    // input: {
    //     height: 50,
    //     width: '100%',
    //     borderWidth: 1,
    //     padding: 15,
    //     marginBottom: 20,
    //     borderColor: 'gray',
    // },
})
