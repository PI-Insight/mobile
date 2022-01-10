import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { Provider } from 'react-redux';
import { Navigator } from '~/navigation';
import { store } from '~/store';
import theme from './theme';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

async function fetchAssets() {
  return Font.loadAsync({});
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={navigationTheme}>
        <NativeBaseProvider theme={theme}>
          <Navigator />
        </NativeBaseProvider>
        <StatusBar translucent />
      </NavigationContainer>
    </Provider>
  );
}
