import { useState, useEffect } from 'react';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { useNavigation } from '@react-navigation/native';

const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

export const GoogleAdScreen: React.FC = () => {

  const navigation = useNavigation();
  const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
      });

      const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        navigation.goBack();
      });

      // Start loading the interstitial straight away
      interstitial.load();

      // Unsubscribe from events on unmount
      return () => {
        console.log('Unsubscribe Ad events');
        unsubscribeLoaded();
        unsubscribeClosed();
      };
    });

    if (loaded) {
      interstitial.show();
    }

    return null; // Render nothing
};
