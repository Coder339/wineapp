import React from 'react';
import { all, fork } from 'redux-saga/effects';
import {
    SignIn,
    SignUp,
    GetProducts,
} from './saga';

export function* rootSaga() {

    yield all([
        fork(SignIn),
        fork(SignUp),
        fork(GetProducts)
    ])
}
