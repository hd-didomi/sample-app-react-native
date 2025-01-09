import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation_types';
import { Didomi } from '@didomi/react-native';
import DidomiLogo from './didomi_logo';
import mobileAds from 'react-native-google-mobile-ads';

const customVendorId = 'customven-gPVkJxXD';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {

    // Load the IAB vendors; the consent status will be shared automatically with them.
    // More informal info about Google Mobile Ads here : https://docs.page/invertase/react-native-google-mobile-ads
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Google Ads initialization complete!
        console.log(adapterStatuses);
      });

    const initDidomi = async () => {
      try {
        Didomi.initialize(
          '7dd8ec4e-746c-455e-a610-99121b4148df',
          undefined,
          undefined,
          undefined,
          false,
          undefined,
          'DVLP9Qtd'
        );
        console.log('Didomi is initialized');
      } catch (error) {
        console.error('Failed to initialize Didomi:', error);
      }
    };

    // Initialize the SDK
    initDidomi();
    Didomi.setupUI();

    Didomi.onReady().then(() => {

      // Automatically listen to the change of the custom vendor status and if enabled then call the API of the vendor
      // https://developers.didomi.io/cmp/mobile-sdk/react-native/reference#addvendorstatuslistener
      // https://developers.didomi.io/cmp/mobile-sdk/third-party-sdks#non-iab-vendor
      Didomi.addVendorStatusListener(customVendorId, (vendorStatus) => {
        console.log(`${vendorStatus.id} status has changed: ${vendorStatus.enabled}`);
        if(vendorStatus.enabled) {
          // Call your vendor's API
          console.log('Calling the API of the custom vendor');
        }
      });

      // Cleanup function to remove the listener
      return () => {
        Didomi.removeVendorStatusListener(customVendorId); // Removes the listener
        console.log('Didomi listener is removed');
      };
    });
  }, []);

  const handleButton_ShowPurposesPreferences = () => {
      Didomi.onReady().then( async() => {
        await Didomi.showPreferences('purposes');
      });
  };

  const handleButton_ShowVendorsPreferences = () => {
    Didomi.onReady().then( async() => {
      await Didomi.showPreferences('vendors');
    });
  };

  const handleButton_ShowWebView = () => {
    Didomi.onReady().then( async() => {
      let didomiJavaScriptCode = await Didomi.getJavaScriptForWebView();
      didomiJavaScriptCode = didomiJavaScriptCode + 'true;';
      navigation.navigate('Webview', { JScode: didomiJavaScriptCode });
    });
  };

  const handleButton_ShowGoogleAd = () => {
    navigation.navigate('GoogleAd');
  };

  return (
    <View style={styles.container}>
      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButton_ShowPurposesPreferences()}
        >
          <Text style={styles.buttonText}>Show Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButton_ShowVendorsPreferences()}
        >
          <Text style={styles.buttonText}>Show Preferences - Vendors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButton_ShowWebView()}
        >
          <Text style={styles.buttonText}>Show Web View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButton_ShowGoogleAd()}
        >
          <Text style={styles.buttonText}>Show Ad</Text>
        </TouchableOpacity>
        </View>

        {/* Image at the Bottom */}
        <View style={styles.logoContainer}>
          <DidomiLogo width={120} height={64} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // White background
    justifyContent: 'space-between', // Space between buttons and image
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: '75%', // 75% of horizontal space
    height: '15%', // 15% of vertical space
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
