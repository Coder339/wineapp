import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

export default function ImageContainer(props) {
    const {image} = props
    return (
        <Image 
            source={image} 
            style={styles.backImage} 
        />
    )
}

const styles = StyleSheet.create({
    backImage:{
        resizeMode:'cover',
        width:'100%',
        height:'100%',
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
    },
})
