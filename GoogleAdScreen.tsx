import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { Didomi, DidomiEventType } from '@didomi/react-native';
import { WebView } from 'react-native-webview';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
console.log(adUnitId);

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const GoogleAdScreen = ({ navigation }) => {

  const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
      });

      const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
      });

      const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        navigation.goBack();
      });

      // Start loading the interstitial straight away
      interstitial.load();

      // Unsubscribe from events on unmount
      return () => {
        console.log("Unsubscribe Ad events");
        unsubscribeLoaded();
        unsubscribeOpened();
        unsubscribeClosed();
      };
    }, []);

    if (loaded) {
      interstitial.show();
    }
}

export default GoogleAdScreen;