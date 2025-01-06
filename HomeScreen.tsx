import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { Didomi, DidomiEventType } from '@didomi/react-native';
import React, { useEffect } from 'react';
import DidomiLogo from './didomi_logo';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import mobileAds from 'react-native-google-mobile-ads';

const HomeScreen = ({ navigation }) => {

  useEffect(() => {

    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
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
        console.error("Failed to initialize Didomi:", error);
      }
      }

      initDidomi();
      Didomi.setupUI();

    }, []);

  const handleButton_ShowPurposesPreferences = () => {
      Didomi.onReady().then( async() => {
        await Didomi.showPreferences("purposes");
        console.info(await Didomi.getUserStatus());
      });
  }

  const handleButton_ShowVendorsPreferences = () => {
    Didomi.onReady().then( async() => {
      await Didomi.showPreferences("vendors");
      console.info(await Didomi.getUserStatus());
    });
  }

  const handleButton_ShowWebView = () => {
    Didomi.onReady().then( async() => {
      global.didomiJavaScriptCode = await Didomi.getJavaScriptForWebView();
      global.didomiJavaScriptCode=didomiJavaScriptCode+`true;`
      navigation.navigate('Webview');
    });
  }

  const handleButton_ShowGoogleAd = () => {
    navigation.navigate('GoogleAd');
  }

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
}

export default HomeScreen;

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