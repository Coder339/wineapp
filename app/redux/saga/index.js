import React from 'react';
import { all, fork } from 'redux-saga/effects';
import {
    SignIn,
    SignUp,
    VerifyOtp,
    ForgotPassword,
    GetFAQ,
    UpdateProfile,
    ChangePassword,
    ChangeLanguage,
    MyChampaignList,
    ContactUs,
    SocialSignIn,
} from './saga';

export function* rootSaga() {

    yield all([
        fork(SignIn),
        fork(SocialSignIn),
        fork(SignUp),
        fork(VerifyOtp),
        fork(ForgotPassword),
        fork(GetFAQ),
        fork(UpdateProfile),
        fork(ChangePassword),
        // fork(ChangeLanguage),
        // fork(MyChampaignList),
        fork(ContactUs),
    ])
}
