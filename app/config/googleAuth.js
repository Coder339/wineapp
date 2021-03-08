import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import auth,{firebase} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';


// let jwtToken = firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       user.getToken().then(function(idToken) {  // <------ Check this line
//           alert(idToken); // It shows the Firebase token now
//           return idToken;
//       });
//     }
//   });
  
async function GoogleAuth() {
    try{
        // Get the users ID token
        // console.log('jwtToken',jwtToken())
        const { idToken } = await GoogleSignin.signIn();
        
        // Create a Google credential with the token
        console.log('googleTokennnn',idToken)

        // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        const access_token = await GoogleSignin.getTokens()
        
        console.log('access token :' ,access_token.accessToken)
        // alert(access_token.accessToken)
        
        // Sign-in the user with the credential
        // return auth().signInWithCredential(googleCredential);
        return access_token.idToken     // token is of large length but we need of short length to access the data as well.

    }catch(err){
        console.log(err)
    }
    
     
}

const styles = StyleSheet.create({})

export default GoogleAuth;