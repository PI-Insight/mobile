import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { TeamsPage } from './List';
import { GroupSingle } from './Single';

export type GroupsStackNavigatorParams = {
  'groups.list': undefined;
  'groups.single': {
    groupId: number;
  };
};

const Stack = createNativeStackNavigator<GroupsStackNavigatorParams>();

export function TeamsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="groups.list" component={TeamsPage} />
      <Stack.Screen name="groups.single" component={GroupSingle} />
    </Stack.Navigator>
  );
}
