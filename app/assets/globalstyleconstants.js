
import React from 'react'
import {StyleSheet,Platform,Image} from 'react-native';
import { scaleWidth } from './globalstylefunctions';

export const colors = {
    appColor:'#00A93F',
    chilled:'#064CEE',
    chilledFade:'rgba(6, 76, 238 ,0.3)',
    wine1:'#FD0000',
    wine1Fade:'rgba(253, 0, 0,0.2)',
    wine2:'#C70039',
    wine2Fade:'rgba(199, 0, 57,0.3)',
    appIcon:'#3D2EDE',
    black:'#000',
    white:'#fff',
    whiteFade:'rgba(255,255,255,0.3)',
    gray:'gray',
    THEME:'#F51142',
    
}

export const fonts = {
    MontserratRegular: 'Montserrat-Regular',
    MontserratItalic: 'Montserrat-Italic',
    MontserratLight:'Montserrat-Light',
    MontserratLightItalic:'Montserrat-LightItalic',
    MontserratMedium:'Montserrat-Medium',
    MontserratMediumItalic:'Montserrat-MediumItalic',
    MontserratBlack: 'Montserrat-Black',
    MontserratBlackItalic: 'Montserrat-BlackItalic',
    MontserratBold: 'Montserrat-Bold',
    MontserratBoldItalic: 'Montserrat-BoldItalic',
    MontserratExtraBold: 'Montserrat-ExtraBold',
    MontserratExtraBoldItalic: 'Montserrat-ExtraBoldItalic',

    OrbitronRegular: 'Montserrat-Regular',
    OrbitronMedium:'Orbitron-Medium',
    OrbitronBlack: 'Orbitron-Black',
    OrbitronBold: 'Orbitron-Bold',
    OrbitronExtraBold: 'Orbitron-ExtraBold',

    CourgetteRegular: 'Courgette-Regular',

    FasterOneRegular: 'FasterOne-Regular',

    PressStart2PRegular: 'PressStart2P-Regular',
    
}


// import { API_URL } from 'react-native-dotenv'
export default AppConstant = {
    // API_URL: API_URL,
    token:'',
    // terms : `https://app.smartgiveaways.app/Pages/terms/en`,
    // privacy : `https://app.smartgiveaways.app/pages/Policy/en`,
    // content : `https://app.smartgiveaways.app/pages/content/en`,
    // aboutUs : `https://app.smartgiveaways.app/pages/about/en`

}



export const loginBackground = require('./images/twoglasses.jpeg')
// export const ageBackground = require('./images/bg-android/age_bg.png')
// export const interestsBackground = require('./images/bg-android/interests_bg.png')
// export const collegeBackground = require('./images/bg-android/collage_bg.png')
// export const nameBackground = require('./images/bg-android/name_bg.png')
// export const splash = require('./images/splash.png')
// export const activeBookmark = require('./images/bookmark_active.png')
// export const inactiveBookmark = require('./images/bookmark.png')
// export const activeNotification = require('./images/notifications_active.png')
// export const inactiveNotification = require('./images/notifications.png')
// export const activeProfile = require('./images/profile_active.png')
// export const inactiveProfile = require('./images/profile.png')
// export const activeInbox = require('./images/inbox_active.png')
// export const inactiveInbox = require('./images/inbox.png')
// export const activeCurrentListing = require('./images/current_listing_active.png')
// export const inactiveCurrentListing = require('./images/current_listing.png')
export const user = require('./images/user.png')
export const lock = require('./images/lock.png')
export const eyeoff = require('./images/eye-off.png')
export const eyeon = require('./images/eye-outline.png')
export const checkcircle = require('./images/check-circle.png')
// export const check_top = require('./images/check_top2x.png')
// export const menu = require('./images/menu.png')
export const logo_top = require('./images/logo_top.png')
// export const signup_background = require('./images/bg-android/register_bg.png')
// export const arrowLeft = require('./images/arrow-left.png')


const iconImage = {
        width:scaleWidth('6.5%'),
        height:scaleWidth('6.5%')
}
export const activeHome = <Image source={require('../assets/images/beer.png')} style={iconImage}/>
export const inactiveHome = <Image source={require('../assets/images/beer.png')} style={iconImage}/>
export const activeSettings = <Image source={require('../assets/images/settings.png')} style={iconImage}/>
export const inactiveSettings = <Image source={require('../assets/images/settings.png')} style={iconImage}/>
export const activeCart = <Image source={require('../assets/images/cart.png')} style={iconImage}/>
export const inactiveCart = <Image source={require('../assets/images/cart.png')} style={iconImage}/>
export const activeFav = <Image source={require('../assets/images/favorites.png')} style={iconImage}/>
export const inactiveFav = <Image source={require('../assets/images/favorites.png')} style={iconImage}/>
export const activeIce = <Image source={require('../assets/images/ice.png')} style={iconImage}/>
export const inactiveIce = <Image source={require('../assets/images/ice.png')} style={iconImage}/>
export const activeFavItem = <Image source={require('../assets/images/activestar.png')} style={iconImage}/>
export const inactiveFavItem = <Image source={require('../assets/images/star.png')} style={iconImage}/>

export const buy = <Image source={require('../assets/images/buy.png')} style={{width:scaleWidth('8.5%'),height:scaleWidth('8.5%')}}/>
export const googleLogo = <Image source={require('../assets/images/google.png')} style={{width:scaleWidth('10.5%'),height:scaleWidth('10.5%')}}/>


export const forgotpassword = 'Forgot Password'
export const forgot_password_desc = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."


export const detailText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

