import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { IUser } from '../../../api/user';
import { UsersSelect } from '../Users/SelectUsers';
import { ProjectCreate } from './CreateProject';
import { ProjectsList } from './ListProjects';
import { ProjectSingle } from './SingleProject';

export type ProjectStackNavigatorParams = {
  ProjectsList: {
    forceRefresh?: boolean;
  };
  ProjectCreate: {
    selectedUsers: IUser[];
  };
  ProjectSingle: {
    projectId: number;
  };
  UsersSelect: {
    selecteds?: IUser[];
    goto: keyof ProjectStackNavigatorParams;
  };
};

const Stack = createNativeStackNavigator<ProjectStackNavigatorParams>();

export default function ProjectsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProjectsList"
        component={ProjectsList}
      />
      <Stack.Screen
        options={{ title: '' }}
        name="ProjectSingle"
        component={ProjectSingle}
      />
      <Stack.Screen
        options={{ title: '' }}
        name="UsersSelect"
        component={UsersSelect}
      />
      <Stack.Screen
        name="ProjectCreate"
        component={ProjectCreate}
        options={{ title: 'Criar projeto', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
