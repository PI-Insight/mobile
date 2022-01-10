import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { IUser } from '~/api/user';
import UsersNavigator, { UsersStackNavigatorParams } from '../users';
import { ProjectCreate } from './Create';
import { ProjectList } from './List';
import { ProjectSingle } from './Single';

export type ProjectStackNavigatorParams = {
  'project.list': {
    forceRefresh?: boolean;
  };
  'project.create': {
    selectedUsers: IUser[];
  };
  'project.single': {
    projectId: number;
  };
  'users.navigator': {
    screen: keyof UsersStackNavigatorParams;
    params: UsersStackNavigatorParams[keyof UsersStackNavigatorParams];
  };
};

const Stack = createNativeStackNavigator<ProjectStackNavigatorParams>();

export default function ProjectsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="project.list" component={ProjectList} />
      <Stack.Screen name="project.single" component={ProjectSingle} />
      <Stack.Screen name="project.create" component={ProjectCreate} />
      <Stack.Screen name="users.navigator" component={UsersNavigator} />
    </Stack.Navigator>
  );
}
