import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { colors, fonts } from '../assets/globalstyleconstants'
import { horizontalScale, moderateScale, verticalScale } from '../assets/globalstylefunctions'

export default function AppButton(props) {
    const {text,onPress} = props
    return (
        <TouchableOpacity style={{...props.style,...styles.button}} onPress={onPress}>
            <Text style={{...styles.buttonText,...props.textStyle}}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        justifyContent:'center',
        alignItems:'center',
        // width:horizontalScale(260),
        // height:verticalScale(75),
        // borderRadius:moderateScale(18),
        // backgroundColor:colors.appColor,
        
    },
    buttonText:{
        color:'#fff',
        // fontSize:moderateScale(17),
        // fontWeight:'bold',
        fontFamily:fonts.MontserratBold,
    },


})
