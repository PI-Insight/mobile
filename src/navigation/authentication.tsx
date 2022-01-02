import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { FirstOpen } from '../screens/authentication/FirstOpen';
import { LoginUser } from '../screens/authentication/LoginUser';
import { RegisterUser } from '../screens/authentication/RegisterUser';

export type AuthenticationStackParamList = {
  "authentication.FirstOpen": undefined;
  "authentication.LoginUser": undefined;
  "authentication.RegisterUser": undefined;
};

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();

export default function AuthenticationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="authentication.FirstOpen"
        component={FirstOpen}
      />
      <Stack.Screen
        options={{ headerShown: false, title: 'Registrar' }}
        name="authentication.RegisterUser"
        component={RegisterUser}
      />
      <Stack.Screen
        options={{ headerShown: false, title: 'Entrar' }}
        name="authentication.LoginUser"
        component={LoginUser}
      />
    </Stack.Navigator>
  );
}
