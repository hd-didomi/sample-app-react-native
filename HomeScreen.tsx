import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation_types';
import { Didomi } from '@didomi/react-native';
import DidomiLogo from './didomi_logo';
import mobileAds from 'react-native-google-mobile-ads';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';

const { height } = Dimensions.get('window'); // Get the screen height

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const customVendorId = 'customven-gPVkJxXD';
  let didomiJavaScriptCode = '';

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
      didomiJavaScriptCode = await Didomi.getJavaScriptForWebView();
      didomiJavaScriptCode = didomiJavaScriptCode + 'true;';
      openModal();
    });
  };

  const handleButton_ShowGoogleAd = () => {
    navigation.navigate('GoogleAd');
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Change the status bar color */}
      <StatusBar backgroundColor="#2E62D6" barStyle="light-content" />
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
          <Text style={styles.buttonText}>Show Preferences (Vendors)</Text>
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

      {/* Modal with WebView */}
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down" // Enables swipe-down to close
        onSwipeComplete={closeModal} // Close the modal on swipe
        onBackdropPress={closeModal} // Close on tapping outside
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {/* Close Button (Cross) */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          {/* WebView */}
          <WebView
            source={{ uri: 'https://didomi.github.io/webpage-for-sample-app-webview/?didomiConfig.notice.enable=false' }}
            style={styles.webview}
            injectedJavaScript={didomiJavaScriptCode}
            onMessage={(event) => console.log('Received message:', event.nativeEvent.data)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFA', // Grey 50
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 32,
  },
  button: {
    width: '75%',
    height: '10%',
    backgroundColor: '#2E62D6', // Electric Blue 50
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15, // Space between buttons
    borderRadius: 5, // Rounded corners
  },
  buttonText: {
    fontFamily: 'Montserrat',
    color: 'white',
    fontSize: 16,
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: height * 0.03,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '94%', // Makes the modal take 93% of the screen height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden', // Ensures the WebView doesn't overflow the rounded corners
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 26,
  },
  webview: {
    flex: 1, // Makes the WebView fill the modal
    marginTop: 40, // Pushes the content down to avoid overlap with the close button
  },
});
