#  Didomi - Sample App for React-native

## Description

**This sample app demonstrates how to implement Didomi in a simple mobile app project using React-native.**

In particular, it shows how to:
* Condition a custom vendor to consent
* Open the Preferences
* Share consent with a web view

This app is also using the Google Mobile Ads SDK as we are taking Google Advertising Products as an example of a commonly used IAB vendor.

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Main Content

**App.tsx**

* It contains the definition of the navigation through the app, including a reference for each screen

**Homescreen.tsx**

* Initialize the Didomi SDK.
  
Definition of the actions of the buttons of our UI:
* Show the preferences (purposes).
* Show the preferences (vendors).
* Show a web view.
* Show an ad.

We also automatically listen to the change of the custom vendor status and if enabled then call the API of the vendor.
Documentation references :
* https://developers.didomi.io/cmp/mobile-sdk/react-native/reference#addvendorstatuslistener
* https://developers.didomi.io/cmp/mobile-sdk/third-party-sdks#non-iab-vendor

**WebviewScreen.tsx**

* Load a WebView and share consent with it. You need to embed the Didomi Web SDK in the HTML page that is loaded by the web view so that it can collect the consent information passed from the app and share it with vendors. The list of vendors configured in the web SDK in the web view should be a subset of the list of vendors configured in the mobile app. That will ensure that the WebView has all the consent information it needs and does not re-collect consent. See [Share consent with WebViews](https://developers.didomi.io/cmp/mobile-sdk/share-consent-with-webviews).

**GoogleAdScreen.tsx**

* Load a Google Ad for testing. The status of the vendor is retrieved automatically (IAB vendor) and the Ad is displayed only if the vendor "Google Advertising Products" is enabled.

## Compilation

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android
npx react-native run-android

### For iOS
in the main directory of the project :

```bash
cd ios && pod install
cd ..
npx react-native run-ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.