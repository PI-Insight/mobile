import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Navigator from "./navigation/authentication";
import { NativeBaseProvider } from "native-base";
import theme from "./theme";

async function fetchAssets() {
  return Font.loadAsync({});
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Navigator />
      <StatusBar style='auto' />
    </NativeBaseProvider>
  );
}
