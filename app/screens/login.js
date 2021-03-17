import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,Alert } from 'react-native'
import ScrollContainer from '../components/common/scrollcontainer';
import ImageContainer from '../components/common/imagecontainer';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AppConstant, { googleLogo,colors, loginBackground,user,lock,eyeoff,eyeon,logo_global,fonts,checkcircle } from '../assets/globalstyleconstants'
import { SignIn, SocialSignIn,clearAction } from '../redux/actions/action';
import { encrypter, scaleHeight, moderateScale, scaleWidth } from '../assets/globalstylefunctions';
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOADER, SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILURE } from '../redux/actions/type';
import regexEmail from '../config/validations';
import AppButton from '../components/appbutton';
import Loader from '../components/common/loader';
import {setData} from '../config/storage';
import * as Animatable from 'react-native-animatable';
import {useNetInfo} from "@react-native-community/netinfo";
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

export default function Login() {
    const state = useSelector(state => state).reducer;

    const netInfo = useNetInfo();

    const [data,setUserData] = useState({
        username:'',
        password:'',
        isHidden:false,
        isValidUser:true,
        isValidPassword:true,
        isVisible:false,
        check_textInputChange:false,
        isGoogleLogo:false,
    })
    
    const navigation = useNavigation();

    const dispatch = useDispatch();
    // const { signIn } = useContext(AuthContext);

    
    useEffect(() => {
        console.log('statecon',state.message)
        if (state.case === LOADER) {
            setUserData({...data,isVisible:true})
            // setIsVisible(true)
            // toast.show(state.message)
            // setTimeout(()=>{
            //     dispatch(clearAction())
            //     setUserData({...data,isVisible:false})
            //     alert('please check your connection')
            // },10000)
        }
        else if (state.case === LOGIN_FAILURE) {
            Alert.alert('ATTENTION !', state.message, [
                {text: 'Okay'}
            ]);
            dispatch(clearAction())
            // toast.show(state.message)
        }
        else if (state.case === LOGIN_SUCCESS) {
            console.log('userdata',state.userData)
            AppConstant.token = state.userData; // as of now only token inside userdata
            console.log('appconst',AppConstant.token)
            setData('userToken',JSON.stringify(state.userData))
            dispatch(clearAction())
            navigation.replace('App')
        }
        else if (state.case === SOCIAL_LOGIN_SUCCESS) {
            console.log('userdata',state.userData)
            AppConstant.token = state.userData; // as of now only googleToken inside userdata
            console.log('appconst',AppConstant.token)
            setData('userToken',JSON.stringify(state.userData))
            dispatch(clearAction())
            // Actions.reset('Tabbar')
            navigation.replace('App')
        }
        else if (state.case === SOCIAL_LOGIN_FAILURE) {
            Alert.alert('ATTENTION !', state.message, [
                {text: 'Okay'}
            ]);
            dispatch(clearAction())
            // toast.show(state.message)
        }

    }, [state])

    const usernameHandler=(text)=>{
        // setUserData({...data,username:text})
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
        if( re.test(text.trim())) {
            setUserData({
                ...data,
                username: text.trim(),
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setUserData({
                ...data,
                username: text.trim(),
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const passwordHandler=(text)=>{
        // setUserData({...data,password:text})
        if( text.trim().length >= 6 ) {
            setUserData({
                ...data,
                password: text.trim(),
                isValidPassword: true
            });
        } else {
            setUserData({
                ...data,
                password: text.trim(),
                isValidPassword: false
            });
        }
    }

    const HiddenHandler=()=>{
        setUserData({...data,isHidden:!data.isHidden})
    }

    const onGoogleButtonPress=()=> {

        
        // dispatch(SocialSignIn())
    }


    const Login = () => {

        // if (!validate('email', username).status) {
        //     // return toast.show(validate('email', email).error)
        //     if (Platform.OS === 'android') {
        //         ToastAndroid.show(validate('email', username).error, ToastAndroid.SHORT)
        //       } else {
        //         // AlertIOS.alert(
        //         //     // 'Sync Complete',
        //         //   );
        //       }
        // }
        // else if (password === '') {
        //     // return toast.show('password is blank')
        // }

        var formdata = {
            email: data.username,
            password: data.password,
            // device_type: Platform.OS === 'ios' ? 1 : 2,
            // device_token: token,
            // device_info: Platform.OS.toUpperCase() + ' Device'
        }

        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        {netInfo.isConnected ?

            dispatch(SignIn(formdata))
            :
            Alert.alert('Network issue :(', 'Please Check Your Network !', [
                {text: 'Okay'}
            ]);
        }
        

    }
    return (
        
        <ScrollContainer style={styles.container}>
            <Loader visible={state.loading}/>
            <ImageContainer image={loginBackground}/>
            <Text style={styles.logo}>W I N E D R U M</Text>
            <View style={styles.loginContainer}>
                
                <Text style={styles.label}>Username</Text>
                <View style={{...styles.user,...styles.inputBorder}}>
                    <TextInput
                    placeholder='john wick'
                    underlineColorAndroid='transparent'
                    placeholderTextColor={colors.white}
                    onChangeText={usernameHandler}
                    value={data.username}
                    style={{...styles.input,width:'90%'}}
                    />
                    <Animatable.View 
                        animation='flash' 
                        duration={500}
                        >
                        <Image
                            source={data.check_textInputChange && checkcircle} 
                            style={styles.checkCircle}
                        />
                    </Animatable.View>
                </View>
                {!data.isValidUser &&
                    <Animatable.View 
                        animation='fadeInLeft' 
                        duration={500}
                        >
                        <Text style={styles.errorMsg}>Provided email is invalid</Text>
                    </Animatable.View>
                }
                <View style={{marginTop:moderateScale(5)}}>
                    <Text style={styles.label}>Password</Text>
                    <View style={{...styles.user,...styles.inputBorder}}>
                        <TextInput
                        placeholder='**********'
                        underlineColorAndroid='transparent'
                        placeholderTextColor={colors.white}
                        onChangeText={passwordHandler}
                        value={data.password}
                        style={{...styles.input,width:'90%'}}
                        secureTextEntry={data.isHidden}
                        />
                        <TouchableOpacity 
                            style={{}} 
                            onPress={HiddenHandler}>
                            <Image
                            source={data.isHidden ? eyeoff : eyeon} 
                            style={styles.eye}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.errorContainer}>
                    {!data.isValidPassword &&
                        <Animatable.View 
                            animation='fadeInLeft' 
                            duration={500}
                            >
                            <Text style={styles.errorMsg}>Provided password is invalid</Text>
                        </Animatable.View>
                    }
                    <Text 
                        style={styles.forgot} 
                        onPress={()=>alert('forgot password')}>Forgot Password ? 
                    </Text>
                </View>
            </View>
            <AppButton 
                text='LOGIN' 
                style={styles.loginButton} 
                textStyle={{color:colors.wine1}}
                onPress={Login}
            />
            <View style={{flexDirection:'row'}}>
                <Text style={{color:colors.white}}>Dont have account ? </Text>
                <Text style={styles.register} onPress={()=>navigation.navigate('Signup')}>Register</Text>
            </View>
            <Text style={styles.googleText}>OR</Text>
            {data.isGoogleLogo &&

                <Animatable.View 
                    animation='fadeInLeft' 
                    duration={500}
                    >    
                    <TouchableOpacity onPress={onGoogleButtonPress}>
                        {googleLogo}
                    </TouchableOpacity>
                </Animatable.View>
            }
            {!data.isGoogleLogo &&

                <TouchableOpacity 
                  onPress={()=>setUserData({...data,isGoogleLogo:!data.isGoogleLogo})}
                  style={styles.googleTextContainer}>
                    <Text style={styles.googleText}>Sign in with Google</Text>
                </TouchableOpacity>
            }
        </ScrollContainer>
        
    )
}

const styles = StyleSheet.create({
    container:{
        // flexGrow:1,
        backgroundColor:colors.white,
        alignItems:'center',
        height:scaleHeight('100%')
    },
    logo:{
        fontFamily:fonts.FasterOneRegular,
        marginVertical:scaleHeight('5%'),
        color:colors.white,
        fontSize:scaleWidth('5%')
    },
    loginContainer:{
        // flex:1,
        // marginTop:scaleHeight('5%'),
        // marginHorizontal:moderateScale(12)
    },
    input:{
        // backgroundColor:'rgba(255,255,255,0.3)',
        color:colors.white,
        fontFamily:fonts.MontserratRegular,
        height:scaleHeight('7%')
    },
    forgot:{
        color:colors.white,
        textAlign:'right',
        marginTop:scaleHeight('1%'),
        fontFamily:fonts.MontserratRegular
    },
    label:{
        color:colors.white,
        fontSize:scaleWidth('4%'),
        fontFamily:fonts.MontserratBold,
    },
    checkCircle:{
        width:scaleWidth('4.5%'),
        height:scaleWidth('4.5%')
    },
    user:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:colors.whiteFade,  
    },
    inputBorder:{
        borderWidth:1,
        borderColor:colors.whiteFade
    },
    loginButton:{
        // flex:1,
        width:scaleWidth('80%'),
        height:scaleHeight('8%'),
        borderRadius:moderateScale(5),
        backgroundColor:colors.whiteFade,  
        marginTop:scaleHeight('32%'),
    },
    register:{
        color:colors.wine1,
        fontWeight:'bold',
    },
    errorMsg:{
        fontFamily:fonts.MontserratRegular,
        color:colors.wine1,
        fontSize:scaleWidth('3%'),
    },
    errorContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    googleTextContainer:{
        alignItems:'center'
    },
    googleText:{
        marginVertical:scaleHeight('1%'),
        color:colors.white,
        fontFamily:fonts.MontserratBoldItalic,
    }
})
