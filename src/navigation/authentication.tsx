import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Index } from '~/screens/authentication/Index';
import { Login } from '~/screens/authentication/Login';
import { Register } from '~/screens/authentication/Register';

export type AuthenticationStackParamList = {
  'authentication.index': undefined;
  'authentication.login': undefined;
  'authentication.register': undefined;
};

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();

export default function AuthenticationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="authentication.index"
        component={Index}
      />
      <Stack.Screen
        options={{ headerShown: false, title: 'Registrar' }}
        name="authentication.register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false, title: 'Entrar' }}
        name="authentication.login"
        component={Login}
      />
    </Stack.Navigator>
  );
}
