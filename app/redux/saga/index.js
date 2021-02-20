import React from 'react';
import { all, fork } from 'redux-saga/effects';
import {
    SignIn,
    SignUp,
    GetProducts,
    SocialSignIn,
} from './saga';

export function* rootSaga() {

    yield all([
        fork(SignIn),
        fork(SocialSignIn),
        fork(SignUp),
        fork(GetProducts)
    ])
}
