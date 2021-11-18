import React from "react";
import * as Font from "expo-font";
import Navigator from "./src/navigation";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";

import theme from "./theme";
import store from "./src/store";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
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
