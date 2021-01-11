import React from 'react'
import { takeLatest, put } from 'redux-saga/effects';
import {
  LOADER,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  VERYFY_OTP,
  VERYFY_OTP_SUCCESS,
  VERYFY_OTP_FAILURE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  GET_FAQ,
  GET_FAQ_FAILURE,
  GET_FAQ_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  // MY_CHAMPAIGN_LIST,
  // MY_CHAMPAIGN_LIST_FAILURE,
  // MY_CHAMPAIGN_LIST_SUCCESS,
  CONTACT_US,
  CONTACT_US_FAILURE,
  CONTACT_US_SUCCESS,
  SOCIAL_LOGIN,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
} from '../actions/type';

import API from '../../config/api';

//Sign In
export function* SignIn() {
    console.log('test')
  try {
    yield takeLatest(LOGIN, signIn);
  }
  catch (ex) {
    yield put({ type: LOGIN_FAILURE, message: ex })
  }
}
export function* signIn(payload) {
    console.log('testtttt')

  yield put({ type: LOADER, loading: true })
  const res = yield API('login.php', 'POST', payload.payload);
  console.log('response',res)
  if (res.status === 200) {
    let resp = res.body;
    if (resp) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: LOGIN_SUCCESS, message: resp.Message, payload: resp.result })
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



//Social Signin
export function* SocialSignIn() {
  try {
    yield takeLatest(SOCIAL_LOGIN, socialSignIn);
  }
  catch (ex) {
    yield put({ type: SOCIAL_LOGIN_FAILURE, message: ex })
  }
}
export function* socialSignIn(payload) {

  yield put({ type: LOADER, loading: true })
  const res = yield API('Account/SocialLogin', 'POST', payload.payload);
  
  if (res.status === 200) {
    let resp = res.body;
    if (resp.Status === 200) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: SOCIAL_LOGIN_SUCCESS, message: resp.Message, payload: resp.result })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: SOCIAL_LOGIN_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else {
    yield put({ type: LOADER, loading: false })
    yield put({ type: SOCIAL_LOGIN_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
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
  const res = yield API('Account/Register', 'POST', payload.payload);
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

//Verify OTP
export function* VerifyOtp() {
  try {
    yield takeLatest(VERYFY_OTP, verifyOtp);
  }
  catch (ex) {
    yield put({ type: VERYFY_OTP_FAILURE, message: ex })
  }
}
export function* verifyOtp(payload) {
  yield put({ type: LOADER, loading: true })
  const res = yield API('Account/Verify', 'POST', payload.payload);
  if (res.status === 200) {
    let resp = res.body;
    if (resp.Status === 200) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: VERYFY_OTP_SUCCESS, message: resp.Message, payload: resp.result })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: VERYFY_OTP_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else {
    yield put({ type: LOADER, loading: false })
    yield put({ type: VERYFY_OTP_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
  }
}


//Forgot Passwrod
export function* ForgotPassword() {
  try {
    yield takeLatest(FORGOT_PASSWORD, forgotPassword);
  }
  catch (ex) {
    yield put({ type: FORGOT_PASSWORD_FAILURE, message: ex })
  }
}
export function* forgotPassword(payload) {
  yield put({ type: LOADER, loading: true })
  const res = yield API(`Account/ForgotPassword?email=${payload.email}`, 'POST', '');
  if (res.status === 200) {
    let resp = res.body;
    if (resp.Status === 200) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: FORGOT_PASSWORD_SUCCESS, message: resp.Message })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: FORGOT_PASSWORD_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else {
    yield put({ type: LOADER, loading: false })
    yield put({ type: FORGOT_PASSWORD_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
  }
}


//Get FAQ
export function* GetFAQ() {
  try {
    yield takeLatest(GET_FAQ, getFAQ);
  }
  catch (ex) {
    yield put({ type: GET_FAQ_FAILURE, message: ex })
  }
}
export function* getFAQ(payload) {
  yield put({ type: LOADER, loading: true })
  const res = yield API(`FAQ/Get`, 'GET');
  if (res.status === 200) {
    let resp = res.body;
    if (resp.Status === 200) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: GET_FAQ_SUCCESS, message: resp.Message, payload: resp.result })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: GET_FAQ_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else {
    yield put({ type: LOADER, loading: false })
    yield put({ type: GET_FAQ_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
  }
}


//update prifile
export function* UpdateProfile() {
  try {
    yield takeLatest(UPDATE_PROFILE, updateProfile);
  }
  catch (ex) {
    yield put({ type: UPDATE_PROFILE_FAILURE, message: ex })
  }
}
export function* updateProfile(payload) {
  yield put({ type: LOADER, loading: true })
  const res = yield API(`User/UpdateUserProfile`, 'POST',payload.payload,true);
  if (res.status === 200) {
    let resp = res.body;
    if (resp.Status === 200) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: UPDATE_PROFILE_SUCCESS, message: resp.Message, payload: resp.result })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: UPDATE_PROFILE_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else {
    yield put({ type: LOADER, loading: false })
    yield put({ type: UPDATE_PROFILE_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
  }
}

//chnage password
export function* ChangePassword() {
  try {
    yield takeLatest(CHANGE_PASSWORD, changePassword);
  }
  catch (ex) {
    yield put({ type: CHANGE_PASSWORD_FAILURE, message: ex })
  }
}
export function* changePassword(payload) {
  yield put({ type: LOADER, loading: true })
  const res = yield API(`User/ChangePassword`, 'POST',payload.payload);
  if (res.status === 200) {
    let resp = res.body;
    if (resp.Status === 200) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: CHANGE_PASSWORD_SUCCESS, message: resp.Message })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: CHANGE_PASSWORD_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else {
    yield put({ type: LOADER, loading: false })
    yield put({ type: CHANGE_PASSWORD_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
  }
}




//My Champaign List
// export function* MyChampaignList() {
//   try {
//     yield takeLatest(MY_CHAMPAIGN_LIST, myChampaignList);
//   }
//   catch (ex) {
//     yield put({ type: MY_CHAMPAIGN_LIST_FAILURE, message: ex })
//   }
// }
// export function* myChampaignList(payload) {
//   yield put({ type: LOADER, loading: true })
//   const res = yield API(`Campaign/MyCampaigns`, 'GET',payload.payload);
//   if (res.status === 200) {
//     let resp = res.body;
//     if (resp.Status === 200) {
//       yield put({ type: LOADER, loading: false })
//       yield put({ type: MY_CHAMPAIGN_LIST_SUCCESS, message: resp.Message, payload: resp.result })
//     }
//     else {
//       yield put({ type: LOADER, loading: false })
//       yield put({ type: MY_CHAMPAIGN_LIST_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
//     }
//   }
//   else {
//     yield put({ type: LOADER, loading: false })
//     yield put({ type: MY_CHAMPAIGN_LIST_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
//   }
// }



//Contact Us
export function* ContactUs() {
  try {
    yield takeLatest(CONTACT_US, contactUs);
  }
  catch (ex) {
    yield put({ type: CONTACT_US_FAILURE, message: ex })
  }
}
export function* contactUs(payload) {
  yield put({ type: LOADER, loading: true })
  const res = yield API(`Contact/Save`, 'POST',payload.payload);
  if (res.status === 200) {
    let resp = res.body;
    if (resp.Status === 200) {
      yield put({ type: LOADER, loading: false })
      yield put({ type: CONTACT_US_SUCCESS, message: resp.Message, payload: resp.result })
    }
    else {
      yield put({ type: LOADER, loading: false })
      yield put({ type: CONTACT_US_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
    }
  }
  else {
    yield put({ type: LOADER, loading: false })
    yield put({ type: CONTACT_US_FAILURE, message: res.body.Message ? res.body.Message : res.body.error })
  }
}


