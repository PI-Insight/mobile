import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { store } from '../../../store';
import { ProfilePage } from './ProfilePage';

export type ProfileStackNavigatorParams = {
  ProfileIndex: {
    userId: number;
  };
};

const Stack = createNativeStackNavigator<ProfileStackNavigatorParams>();

export function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileIndex"
        component={ProfilePage}
        initialParams={{ userId: store.getState().user.id }}
      />
    </Stack.Navigator>
  );
}
