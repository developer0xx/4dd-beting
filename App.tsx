import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Platform} from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StoreProvider} from './StoresContext';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const isIOS = Platform.OS === 'ios';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/*<StoreProvider>*/}
          <Navigation colorScheme={colorScheme}/>
          <StatusBar style={'light'}/>
        {/*</StoreProvider>*/}
      </SafeAreaProvider>
    );
  }
}
