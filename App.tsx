import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppUIContextProvider from './src/context/AppUIContext'

import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import AppContainer from './src/screens/AppContainer'

import { Provider } from 'react-redux'
import configureStore from './src/redux/store'

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '191087790563-to2qhbqrglqduvv4otok2gdahpnmumj5.apps.googleusercontent.com'
})

export default function App() {
  const isLoadingComplete = useCachedResources();
  
  const store = configureStore()

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store = { store }>
        <AppUIContextProvider>
          <SafeAreaProvider>
            <AppContainer />
          </SafeAreaProvider>
        </AppUIContextProvider>
      </Provider>
    );
  }
}

