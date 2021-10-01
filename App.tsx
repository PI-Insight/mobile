import React from "react";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import Navigator from "./navigation";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";

import theme from "./theme";
import store from "./store";

import { NavigationContainer } from "@react-navigation/native";

async function fetchAssets() {
  return Font.loadAsync({});
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Navigator />
          <StatusBar style='auto' />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
