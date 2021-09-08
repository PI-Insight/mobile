import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import { Index, LoginUser, RegisterUser } from "../screens";
import { View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name='FirstOpen'
          component={Index}
        />
        <Stack.Screen
          options={{ headerShown: true, title: "Registrar" }}
          name='RegisterUser'
          component={RegisterUser}
        />
        <Stack.Screen
          options={{ headerShown: true, title: "Entrar" }}
          name='LoginUser'
          component={LoginUser}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
