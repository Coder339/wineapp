import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import ScrollContainer from '../components/common/scrollcontainer';
import ImageContainer from '../components/common/imagecontainer';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import AppConstant from '../assets/globalstyleconstants'
import { SignIn, clearAction } from '../redux/actions/action';
import { encrypter, scaleHeight, moderateScale, scaleWidth } from '../assets/globalstylefunctions';
import validate from '../config/validations';
import {colors, loginBackground,user,lock,eyeoff,eyeon,logo_global,fonts} from '../assets/globalstyleconstants';
import AppButton from '../components/appbutton';

export default function Signup() {
    const state = useSelector(state => state).reducer;

    const [fullName,setFullname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [isHidden,setisHidden] = useState(false)
    
    const navigation = useNavigation();

    const dispatch = useDispatch();


    const fullNameHandler=(text)=>{
        setFullname(text)
    }
    const emailHandler=(text)=>{
        setEmail(text)
    }
    const passwordHandler=(text)=>{
        setPassword(text)
    }
    const confirmPasswordHandler=(text)=>{
        setConfirmPassword(text)
    }

    return (
        <ScrollContainer style={styles.container}>
            <ImageContainer image={loginBackground}/>
            <Text style={styles.logo}>W I N E D R U M</Text>
            <View style={styles.signupContainer}>
                <View>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                      placeholder='john wick'
                      underlineColorAndroid='transparent'
                      placeholderTextColor={colors.white}
                      onChangeText={fullNameHandler}
                      value={fullName}
                      style={{...styles.input,...styles.inputBorder}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      placeholder='johnwick@break.com'
                      underlineColorAndroid='transparent'
                      placeholderTextColor={colors.white}
                      onChangeText={emailHandler}
                      value={email}
                      style={{...styles.input,...styles.inputBorder}}
                    />
                </View>
                <View style={styles.inputContainer}>
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
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={{...styles.user,...styles.inputBorder}}>
                        <TextInput
                        placeholder='**********'
                        underlineColorAndroid='transparent'
                        placeholderTextColor={colors.white}
                        onChangeText={confirmPasswordHandler}
                        value={confirmPassword}
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
                </View>
            </View>
            <AppButton text='SIGNUP' style={styles.signupButton} textStyle={{color:colors.wine1}}/>
            <View style={{flexDirection:'row'}}>
                <Text style={{color:colors.white}}>Already have an account ? </Text>
                <Text style={styles.register} onPress={()=>navigation.navigate('SignIn')}>Login</Text>
            </View>
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
    signupContainer:{
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
        // fontWeight:'bold'
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
    signupButton:{
        // flex:1,
        width:scaleWidth('80%'),
        height:scaleHeight('8%'),
        borderRadius:moderateScale(5),
        backgroundColor:colors.whiteFade,  
        marginTop:scaleHeight('24%'),
    },
    register:{
        color:colors.wine1,
        fontWeight:'bold'
    },
    inputContainer:{
        marginTop:scaleHeight('0.4%')
    },
})
