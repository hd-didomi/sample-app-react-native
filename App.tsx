import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WebviewScreen from './WebviewScreen';
import GoogleAdScreen from './GoogleAdScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Webview" component={WebviewScreen} />
        <Stack.Screen name="GoogleAd" component={GoogleAdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;