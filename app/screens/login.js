import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import ScrollContainer from '../components/common/scrollcontainer';
import ImageContainer from '../components/common/imagecontainer';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AppConstant from '../assets/globalstyleconstants'
import { SignIn, clearAction } from '../redux/actions/action';
import { encrypter, scaleHeight, moderateScale, scaleWidth } from '../assets/globalstylefunctions';
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOADER } from '../redux/actions/type';
import validate from '../config/validations';
import {colors, loginBackground,user,lock,eyeoff,eyeon,logo_global,fonts} from '../assets/globalstyleconstants';
import AppButton from '../components/appbutton';
import Loader from '../components/common/loader';
import {setData} from '../config/storage';

export default function Login() {
    const state = useSelector(state => state).reducer;

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [defaultValue,setDefaultValue] = useState('123456789')
    const [token, setToken] = useState('');
    const [isHidden,setisHidden] = useState(false)
    const [isVisible,setIsVisible] = useState(false)
    
    const navigation = useNavigation();

    const dispatch = useDispatch();
    // const { signIn } = useContext(AuthContext);

    useEffect(() => {
        console.log('statecon',state.case)
        if (state.case === LOADER) {
            setIsVisible(true)
            // toast.show(state.message)
        }
        if (state.case === LOGIN_FAILURE) {
            dispatch(clearAction())
            // toast.show(state.message)
        }
        else if (state.case === LOGIN_SUCCESS) {
            console.log('userdata',state.userData)
            AppConstant.token = state.userData; // as of now only token inside userdata
            console.log('appconst',AppConstant.token)
            setData('userToken',JSON.stringify(state.userData))
            dispatch(clearAction())
            // Actions.reset('Tabbar')
            navigation.replace('App')
        }

    }, [state])

    const usernameHandler=(text)=>{
        setUsername(text)
    }
    const passwordHandler=(text)=>{
        setPassword(text)
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
            email: username,
            password: password,
            // device_type: Platform.OS === 'ios' ? 1 : 2,
            // device_token: token,
            // device_info: Platform.OS.toUpperCase() + ' Device'
        }
        
        dispatch(SignIn(formdata));

    }
    return (
        <ScrollContainer style={styles.container}>
            <Loader visible={state.loading}/>
            <ImageContainer image={loginBackground}/>
            <Text style={styles.logo}>W I N E D R U M</Text>
            <View style={styles.loginContainer}>
                <View>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                      placeholder='john wick'
                      underlineColorAndroid='transparent'
                      placeholderTextColor={colors.white}
                      onChangeText={usernameHandler}
                      value={username}
                      style={{...styles.input,...styles.inputBorder}}
                    />
                </View>
                <View style={{marginTop:moderateScale(5)}}>
                    <Text style={styles.label}>Password</Text>
                    <View style={{...styles.user,...styles.inputBorder}}>
                        <TextInput
                        placeholder='**********'
                        underlineColorAndroid='transparent'
                        placeholderTextColor={colors.white}
                        onChangeText={passwordHandler}
                        value={password}
                        style={{...styles.input,width:'90%'}}
                        secureTextEntry={isHidden}
                        />
                        <TouchableOpacity 
                            style={{}} 
                            onPress={()=>setisHidden(!isHidden)}>
                            <Image
                              source={isHidden ? eyeoff : eyeon} 
                              style={styles.eye}/>
                        </TouchableOpacity>
                    </View>
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
            <View style={{flexDirection:'row',marginBottom:scaleWidth('2%')}}>
                <Text style={{color:colors.white}}>Dont have account ? </Text>
                <Text style={styles.register} onPress={()=>navigation.navigate('Signup')}>Register</Text>
            </View>
        </ScrollContainer>
    )
}

const styles = StyleSheet.create({
    container:{
        // flexGrow:1,
        backgroundColor:colors.white,
        alignItems:'center'
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
        fontFamily:fonts.MontserratRegular
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
        marginTop:scaleHeight('42%'),
    },
    register:{
        color:colors.wine1,
        fontWeight:'bold'
    },
})
