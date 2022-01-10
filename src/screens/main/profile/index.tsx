import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { store } from '~/store';
import { Profile } from './Profile';

export type ProfileStackNavigatorParams = {
  'profile.index': {
    userId: number;
  };
};

const Stack = createNativeStackNavigator<ProfileStackNavigatorParams>();

export function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="profile.index"
        component={Profile}
        initialParams={{ userId: store.getState().user.id }}
      />
    </Stack.Navigator>
  );
}
