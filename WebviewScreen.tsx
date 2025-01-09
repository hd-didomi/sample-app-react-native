import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from './navigation_types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type WebviewScreenProps = NativeStackScreenProps<RootStackParamList, 'Webview'>;

export const WebviewScreen: React.FC<WebviewScreenProps> = ({ route }) => {

  const { JScode } = route.params;

  console.log(JScode);

  return (
     <View style={styles.container}>
       <WebView
         source={{ uri: 'https://didomi.github.io/webpage-for-sample-app-webview/?didomiConfig.notice.enable=false' }}
         style={styles.container}
         injectedJavaScript={JScode}
         onMessage={(event) => console.log('Received message:', event.nativeEvent.data)}
       />
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
