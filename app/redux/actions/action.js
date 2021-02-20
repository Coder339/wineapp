import React from 'react';
import {
    LOGIN,
    SOCIAL_LOGIN,
    SIGNUP,
    CLEAR_DATA,
    LOGOUT,
    GET_FAVOURITES,
    GET_PRODUCTS,
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
export const SignUp = payload => {
    return { type: SIGNUP, payload }
}
export const logoutAction = payload => {
    return { type: LOGOUT, payload }
}
export const GetProducts = payload => {
    return { type: GET_PRODUCTS, payload }
}
export const GetFavourites = payload => {
    return { type: GET_FAVOURITES, payload }
}