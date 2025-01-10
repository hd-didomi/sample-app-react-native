import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './navigation_types';
import { HomeScreen } from './HomeScreen';
import { WebviewScreen } from './WebviewScreen';
import { GoogleAdScreen } from './GoogleAdScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false, // Hides the header for all screens
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Webview" component={WebviewScreen} />
        <Stack.Screen name="GoogleAd" component={GoogleAdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
