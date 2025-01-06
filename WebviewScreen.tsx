import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Didomi, DidomiEventType } from '@didomi/react-native';
import { WebView } from 'react-native-webview';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const WebviewScreen = ({ navigation }) => {

  console.log(global.didomiJavaScriptCode);

  return (
     <View style={{ flex: 1 }}>
       <WebView
         source={{ uri: 'https://didomi.github.io/webpage-for-sample-app-webview/?didomiConfig.notice.enable=false' }}
         style={{ flex: 1 }}
         injectedJavaScript={global.didomiJavaScriptCode}
         onMessage={(event) => console.log('Received message:', event.nativeEvent.data)}
       />
       <TouchableOpacity
         style={styles.button}
         onPress={() => navigation.goBack()}
       >
         <Text style={styles.buttonText}>Close WebView</Text>
       </TouchableOpacity>
     </View>
  );
}

export default WebviewScreen;

const styles = StyleSheet.create({
  button: {
    width: '100%', // 75% of horizontal space
    height: '10%', // 15% of vertical space
    backgroundColor: '#2450B2', // Button color
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10, // Space between buttons
    borderRadius: 10, // Rounded corners
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});