import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { TeamsPage } from './ListTeams';

export type TeamsStackNavigatorParams = {
  MainTeamsPage: undefined;
};

const Stack = createNativeStackNavigator<TeamsStackNavigatorParams>();

export function TeamsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="MainTeamsPage"
        component={TeamsPage}
      />
    </Stack.Navigator>
  );
}
