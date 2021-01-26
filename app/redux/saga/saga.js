import { takeLatest, put } from 'redux-saga/effects';
import {
  LOADER,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from '../actions/type';

import API from '../../config/api';

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
      yield put({ type: LOGIN_SUCCESS, message: resp.Message, payload: resp })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: LOGIN_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else {
    yield put({ type: LOADER, loading: false })
    yield put({ type: LOGIN_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
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

