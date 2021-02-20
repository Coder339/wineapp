import { takeLatest, put } from 'redux-saga/effects';
import {
  LOADER,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SOCIAL_LOGIN,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from '../actions/type';

import API from '../../config/api';
import GoogleAuth from '../../config/googleAuth';

// import { GoogleSignin } from '@react-native-community/google-signin';

//Sign In
export function* SignIn() {
  try {
    yield takeLatest(LOGIN, signIn);
  }
  catch (ex) {
    yield put({ type: LOGIN_FAILURE, message: ex })
  }
}
export function* signIn(payload) {

  yield put({ type: LOADER, loading: true })
  const res = yield API('auth/login', 'POST', payload.payload);
  if (res.status === 200) {
    let resp = res.body.access_token;
    if (resp) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: LOGIN_SUCCESS, message: res.body.Message, payload: resp })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: LOGIN_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else if(res.status===401){
    yield put({ type: LOADER, loading: false })
    yield put({ type: LOGIN_FAILURE, message: res.body.message})
  }
  else {
    console.log('ghgjhgjhghh',res.body.Message)
    yield put({ type: LOADER, loading: false })
    yield put({ type: LOGIN_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
  }
}

//SocialSignIn
export function* SocialSignIn() {
  try {
    yield takeLatest(SOCIAL_LOGIN, socialSignIn);
  }
  catch (ex) {
    yield put({ type: SOCIAL_LOGIN_FAILURE, message: ex })
  }
}
export function* socialSignIn(payload) {

  // // const res = yield API('Account/SocialLogin', 'POST', payload.payload);
  let googleToken;
  const googleCred = yield GoogleAuth()

  if (googleCred){
    googleToken = googleCred.user.uid

    if (googleToken) {
      console.log('googleToken',googleToken)
      // let resp = res.body; 
      yield put({ type: LOADER, loading: false })
      yield put({ type: SOCIAL_LOGIN_SUCCESS, message: 'successfully login', payload: googleCred })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: SOCIAL_LOGIN_FAILURE, message: 'you are not allowed to login' })
    }
  }else{
    alert('you did not select any account')
  }

}

//Sign Up
export function* SignUp() {
  try {
    yield takeLatest(SIGNUP, signUp);
  }
  catch (ex) {
    yield put({ type: SIGNUP_FAILURE, message: ex })
  }
}
export function* signUp(payload) {
  yield put({ type: LOADER, loading: true })
  const res = yield API('auth/register', 'POST', payload.payload);
  if (res.status === 200) {
    let resp = res.body;
    if (resp.Status === 200) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: SIGNUP_SUCCESS, message: resp.Message, payload: resp.result })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: SIGNUP_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else {
    yield put({ type: LOADER, loading: false })
    yield put({ type: SIGNUP_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
  }
}




export function* GetProducts(){
  try {
    yield takeLatest(GET_PRODUCTS, getProducts);
  }
  catch (ex) {
    yield put({ type: GET_PRODUCTS_FAILURE, message: ex })
  }
}


export function* getProducts(payload){
  console.log('tesssssssss')
  // yield put({type:LOADER,loading:true})
  const res = yield API('products','GET')
  console.log(res,'ressp')
  if(res){
    yield put({ type: LOADER, loading: false })
    yield put({ type: GET_PRODUCTS_SUCCESS, payload: res })
    console.log(res)
  }
}

