import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import RootStackScreen from './app/config/router';
import Landing from './app/screens/landing';
import Splash from './app/screens/splash';
import { NavigationContainer } from '@react-navigation/native';
import Login from './app/screens/login';
import { colors } from './app/assets/globalstyleconstants';
// import { AuthContext } from './app/config/authcontext';


const App = () => {

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white,}}>
          <StatusBar backgroundColor='white' barStyle='dark-content' />
          <NavigationContainer >
            <RootStackScreen/>
          </NavigationContainer>
      </SafeAreaView>
    </Provider>

  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default App;
