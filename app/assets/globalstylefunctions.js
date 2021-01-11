import React from 'react'
import { Dimensions } from 'react-native';
// import { Buffer } from 'buffer'
import { heightPercentageToDP as hp,widthPercentageToDP as wp,} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const horizontalScale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( horizontalScale(size) - size ) * factor;

const scaleWidth = wp;
const scaleHeight = hp;

export {horizontalScale, verticalScale, moderateScale,scaleHeight,scaleWidth};




//use moderateScale on almost everything that needs scaling, like fontSize, margins, image and Svg size,
// to achieve a linear result then use mostly scale, and use verticalScale on stuff like containers heights



// export const encrypter = (data) => {

//     let buff = new Buffer(data);
//     return buff.toString('base64');
// }