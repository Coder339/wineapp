import React,{useEffect,useState,useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import { colors } from '../assets/globalstyleconstants';
import { scaleHeight, scaleWidth } from '../assets/globalstylefunctions';

function WelcomeItem(props) {
    const {item,index} = props

    // const navigation = useNavigation();
    const videoPlayer = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [screenType, setScreenType] = useState('cover');

    return (
        <View style={styles.video}>
            <Video
                // onEnd={onEnd}
                // onLoad={onLoad}
                // onLoadStart={onLoadStart}
                // onProgress={onProgress}
                repeat={true}
                ref={videoPlayer}
                resizeMode={screenType}
                onFullScreen={isFullScreen}
                source={item}
                style={styles.mediaPlayer}
                volume={10}
                minLoadRetryCount={5}
                playWhenInactive={true}
                bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 50000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    video:{
        // flex:1,
        width:scaleWidth('100%'),
        height:scaleHeight('100%'),
    },
    mediaPlayer: {
        // elevation:-1,
        // flex:1,
        backgroundColor:colors.black,
        height:scaleHeight('100%'),
        justifyContent: 'center',
    },
})


export default WelcomeItem;