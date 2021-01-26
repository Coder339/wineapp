import { API_URL } from '../config/baseurl';
// import { removeData } from '../../storage';
// import { Actions } from 'react-native-router-flux';
import AppConstant from '../assets/globalstyleconstants';

export default function API(variable, method, parameter, formdata, media) {
    // console.log('testapi',AppConstant.token)
    if (formdata) {

        var headers = {
            // 'Authorization': `Bearer ${AppConstant.token}`,
            // "Content-Type": "multipart/form-data",
            'Content-Type': 'application/json',
            // "X-Requested-With": "XMLHttpRequest",
            "Accept": "application/json"
        }
    }
    else {

        var headers =  {
            // 'token': `${AppConstant.token}`,
            'Authorization': `Bearer ${AppConstant.token}`,
            'Content-Type': 'application/json',
            "Accept": "application/json",
            // "X-Requested-With": "XMLHttpRequest",

        } 
        
    }

    var params = (method === 'GET') ?
        {
            method: method,
            headers: headers
        } :
        {
            method: method,
            headers: headers,
            body: formdata ? parameter : JSON.stringify(parameter),
            // body:{"email":"bruno@email.com","password":"bruno"},
            // redirect: 'follow'  //optional for login purpose
        }
    console.log('APIrequest : ', API_URL + variable, params)
    return fetch(`${API_URL + variable}`, params)
        .then(resp => resp.json()
            .then(async (res) => {
                var data = {
                    status: resp.status,
                    body: res
                }
                console.log('APIresponse : ', JSON.stringify(data))

                if (variable === 'auth/login') {
                    return data
                }
                else if (data.status === 401) {
                    alert('Unautorized user!!')
                    // Actions.reset('signin')
                    return data
                }
                else return data

            })
        )
        .catch((e) => {
            console.log(e)
            return { body: { status: 400, Message: 'Sorry, something went wrong, please try again in sometime.' } }
        });
    
}