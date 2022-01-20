import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IUser } from '~/api/user';
import { Select } from './Select';

export type UsersStackNavigatorParams = {
  'users.select': {
    selectedUsers?: IUser[];
    goto: 'project.create';
  };
};

const Stack = createNativeStackNavigator<UsersStackNavigatorParams>();

export default function UsersNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="users.select" component={Select} />
    </Stack.Navigator>
  );
}
