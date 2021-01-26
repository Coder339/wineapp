import React from 'react';
import initialState from "./initialState";
import { 
    LOADER, 
    LOGIN_SUCCESS, 
    CLEAR_DATA, 
    LOGOUT, 
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE} from '../actions/type';
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
        case LOGIN_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                case: action.type,
                message: action.message,

            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                case: action.type,
                products: action.payload,

            }
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                case: action.type,

            }

        default:
            return {
                ...state,
                case: action.type,
                message: action.message,

            }
    }



}