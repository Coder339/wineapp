import React,{useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FullModel from '../components/fullmodel'
import MiniModel from '../components/minimodel'
import SwipeUpDown from 'react-native-swipe-up-down-fix';
import { scaleHeight } from '../assets/globalstylefunctions';

export default function Categories() {
    const swipeUpDownRef = useRef(null);

    const swipeHandler = () => {
        // `current` points to the mounted text input element
        swipeUpDownRef.current.focus(); //GIVING ERROR BECAUSE IT'S USED FOR INPUT.
      };
    return (
        <View style={styles.container}>

            <SwipeUpDown		
                // hasRef={swipeUpDownRef}
                
                // animation="easeInEaseOut"
                itemMini={<MiniModel />} // Pass props component when collapsed
                itemFull={<FullModel />} // Pass props component when show full
                onShowMini={() => console.log('mini')}
                onShowFull={() => console.log('full')}
                onMoveDown={() => <MiniModel />}
                onMoveUp={() => console.log('up')}
                disablePressToShow={false} // Press item mini to show full
                style={{ backgroundColor: 'green'}} // style for swipe
                swipeHeight={160}
            />
            {/* <Text onPress={swipeHandler}>show</Text> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
