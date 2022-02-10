import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppUIContextProvider from './src/context/AppUIContext';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import AppContainer from './src/screens/AppContainer';

export default function App() {
  const isLoadingComplete = useCachedResources();
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppUIContextProvider>
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </AppUIContextProvider>
    );
  }
}
