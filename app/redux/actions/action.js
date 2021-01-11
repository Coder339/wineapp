import React from 'react';
import {
    LOGIN,
    SIGNUP,
    VERYFY_OTP,
    CLEAR_DATA,
    FORGOT_PASSWORD,
    GET_FAQ,
    UPDATE_PROFILE,
    CHANGE_PASSWORD,
    ALREADY_LOGIN,
    CONTACT_US,
    ALLOT_TICKET,
    SOCIAL_LOGIN,
    LOGOUT
} from "./type"

export const clearAction = payload => {
    return { type: CLEAR_DATA, payload }
}
export const SignIn = payload => {
    return { type: LOGIN, payload }
}
export const SocialSignIn = payload => {
    return { type: SOCIAL_LOGIN, payload }
}
export const AlreadyLogin = payload => {
    return { type: ALREADY_LOGIN, payload }
}
export const SignUp = payload => {
    return { type: SIGNUP, payload }
}
export const VerifyOtp = payload => {
    return { type: VERYFY_OTP, payload }
}
export const FortgotPasswordAction = payload => {
    return { type: FORGOT_PASSWORD, payload }
}
export const GetFAQ = payload => {
    return { type: GET_FAQ, payload }
}
export const UpdateProfile = payload => {
    return { type: UPDATE_PROFILE, payload }
}
export const ChangePassword = payload => {
    return { type: CHANGE_PASSWORD, payload }
}
export const Contact = payload => {
    return { type: CONTACT_US, payload }
}
export const logoutAction = payload => {
    return { type: LOGOUT, payload }
}