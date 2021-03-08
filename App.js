import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import RootStackScreen from './app/config/router';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './app/assets/globalstyleconstants';
// import { AuthContext } from './app/config/authcontext';
import HandleNotification from './app/screens/handlenotification';
import Welcome from './app/screens/welcome';

const App = () => {

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white,}}>
          <StatusBar backgroundColor='white' barStyle='dark-content' hidden/>
          <NavigationContainer >
            <RootStackScreen/>
          </NavigationContainer>
          <HandleNotification/>
      </SafeAreaView>
    </Provider>
      //  <Welcome/>

  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default App;
