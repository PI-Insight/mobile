import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-elements";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import theme from "./theme";
import Navigator from "./navigation/authentication";

async function fetchAssets() {
  return Font.loadAsync({});
}

export default function App() {
  const [isReady, setReady] = useState(false);

  if (!isReady)
    return (
      <AppLoading
        startAsync={fetchAssets}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );

  return (
    <ThemeProvider theme={theme}>
      <Navigator />
      <StatusBar style='auto' />
    </ThemeProvider>
  );
}
