import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProjectsList } from "./List";
import { ProjectCreate } from "./Create";
import { ProjectSingle } from "./Single";
import { IProject } from "../../../api/project";

export type ProjectStackNavigatorParams = {
  ProjectsList: undefined;
  ProjectCreate: undefined;
  ProjectSingle: {
    project: IProject;
  };
};

const Stack = createNativeStackNavigator<ProjectStackNavigatorParams>();

export default function AuthenticationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='ProjectsList'
        component={ProjectsList}
      />
      <Stack.Screen
        name='ProjectCreate'
        component={ProjectCreate}
        options={{ title: "Criar projeto" }}
      />
      <Stack.Screen
        options={{ title: "" }}
        name='ProjectSingle'
        component={ProjectSingle}
      />
    </Stack.Navigator>
  );
}
