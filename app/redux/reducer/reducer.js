import React from 'react';
import initialState from "./initialState";
import { 
    LOADER, 
    LOGIN_SUCCESS, 
    CLEAR_DATA, 
    GET_FAQ_SUCCESS, 
    UPDATE_PROFILE_SUCCESS, 
    ALREADY_LOGIN, 
    SOCIAL_LOGIN, 
    VERYFY_OTP_SUCCESS, 
    SOCIAL_LOGIN_SUCCESS, 
    LOGOUT } from '../actions/type';
// import Appconstant from '../../components/constant/index';

export default reducer = (state = initialState, action) => {

    console.log('Actions', action)

    switch (action.type) {
        case LOADER:
            return {
                ...state,
                case: action.type,
                loading: action.loading,
                
            }
        case CLEAR_DATA:
            return {
                ...state,
                case: '',
                message: '',

            }
        case LOGOUT:
            return {
                ...state,
                case: '',
                message: '',
                userData:'',
                countData:'',
                MyChampaignList:'',
                Winners:'',
            }
        case ALREADY_LOGIN:
            return {
                ...state,
                case: '',
                message: '',
                userData: action.payload,

            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                case: action.type,
                message: action.message,

            }
        case SOCIAL_LOGIN_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                case: action.type,
                message: action.message,

            }
        case VERYFY_OTP_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                case: action.type,
                message: action.message,

            }
        case SOCIAL_LOGIN:
            return {
                ...state,
                userData: action.payload,
                case: action.type,
                message: action.message,

            }
        case GET_FAQ_SUCCESS:
            return {
                ...state,
                case: action.type,
                message: action.message,
                FAQs: action.payload,

            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                case: action.type,
                message: action.message,
                userData: action.payload,

            }
        // case MY_CHAMPAIGN_LIST_SUCCESS:
        //     return {
        //         ...state,
        //         case: action.type,
        //         message: action.message,
        //         MyChampaignList: action.payload,
        //     }

        default:
            return {
                ...state,
                case: action.type,
                message: action.message,

            }
    }



}