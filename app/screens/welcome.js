import React, { useState,useRef } from 'react'
import { StyleSheet, Text, View,FlatList,Animated,ScrollView,Dimensions } from 'react-native'
import WelcomeItem from '../components/welcomeitem'
import { colors, fonts } from '../assets/globalstyleconstants';
import { scaleHeight, scaleWidth } from '../assets/globalstylefunctions';

const { width, height } = Dimensions.get("window");

export default function Welcome() {

    const scrollX = useRef(new Animated.Value(0)).current;

    const videoData = [
        {
            id:1,
            video:require('../assets/videos/winev1.mp4')
        },
        {
            id:2,
            video:require('../assets/videos/winev2.mp4')
        },
        {
            id:3,
            video:require('../assets/videos/winev3.mp4')
        }
    ] 
    // const [videos,setVideos] = useState({
    //     video1:require('../assets/videos/winev1.mp4'),
    //     video2:require('../assets/videos/winev2.mp4'),
    //     video3:require('../assets/videos/winev3.mp4')
    // })

    const [videos,setVideos] = useState([
        require('../assets/videos/winev1.mp4'),
        require('../assets/videos/winev2.mp4')
        // require('../assets/videos/winev3.mp4')
    ])
    
    const renderSteps =()=>{

        const stepPosition = Animated.divide(scrollX, width);

        return(
            <View style={styles.dotsContainer}>
                <Text style={styles.inspire}>Let's spark the moment</Text>
                <View style={styles.dots}>
                    {videos.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: "clamp"
                    });
                    // <View>

                    //     <Text>hkjhjhjkhkjhjk</Text>
                    // </View>
                    return(
                        <Animated.View
                            // animated
                            // flex={false}
                            
                            key={index}
                            color="gray"
                            style={[styles.steps,{opacity}]}
                        />
                    )
                     })}
                </View>
            </View>
        )
    }
    

    return (


        <View>
            <ScrollView
                decelerationRate={0}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={scaleWidth('100%')}
                contentContainerStyle={styles.container}
                onScroll={Animated.event([
                    {
                      nativeEvent: { contentOffset: { x: scrollX } }
                    }
                ],)}
                scrollEventThrottle={1}
                >
                    <WelcomeItem item={videos[0]}/> 
                    <WelcomeItem item={videos[1]}/>
                    {/* <WelcomeItem item={videos.video3}/> */}
                    
            </ScrollView>
            {renderSteps()}
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flexGrow:1,
        backgroundColor:colors.white,
        alignItems:'center',
        // height:scaleHeight('100%')
    },
    video:{
        // flex:1,
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        width:scaleWidth('100%'),
        height:scaleHeight('100%'),
    },
    mediaPlayer: {
        // elevation:-1,
        // flex:1,
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        backgroundColor:colors.black,
        height:scaleHeight('100%'),
        justifyContent: 'center',
    },
    stepsContainer: {
        position: "absolute",
        bottom:0,
        right: 0,
        left: 0
      },
    steps: {
        // flex:1,
        width: scaleWidth('2%'),
        height: scaleWidth('2%'),
        borderRadius: scaleWidth('1%'),
        marginHorizontal: 2.5,
        backgroundColor:colors.white
    },
    dotsContainer:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignItems:'center',
        justifyContent:'center'
    },
    inspire:{
        color:colors.white,
        fontFamily:fonts.FasterOneRegular,
        fontSize:scaleHeight('3.5%'),
    },
    dots:{
        flexDirection:'row'
    }
})













{/* <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={videoData}
              keyExtractor={(item)=>item.id}
              renderItem={WelcomeItem}
              snapToInterval={140}
              snapToAlignment="center"
              decelerationRate="fast"
            /> */}

{/* <WelcomeItem item={videos.video1}/> */}
                {/* <WelcomeItem item={videos.video2}/>
                <WelcomeItem item={videos.video3}/> */}