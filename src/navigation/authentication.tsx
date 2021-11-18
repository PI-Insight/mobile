import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import { IndexPage, LoginUser, RegisterUser } from "../screens/authentication";
import MainNavigator from "./main";

const Stack = createNativeStackNavigator();

export default function AuthenticationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='FirstOpen'
        component={IndexPage}
      />
      <Stack.Screen
        options={{ headerShown: false, title: "Registrar" }}
        name='RegisterUser'
        component={RegisterUser}
      />
      <Stack.Screen
        options={{ headerShown: false, title: "Entrar" }}
        name='LoginUser'
        component={LoginUser}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name='UserLoggedIn'
        component={MainNavigator}
      />
    </Stack.Navigator>
  );
}
