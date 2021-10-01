import * as React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

// Icons
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import {
  MainPage,
  ProfilePage,
  ProjectsPage,
  TeamsPage,
} from "../screens/main";
import { ParamListBase, RouteProp } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const icons: any = {
  MainPage: (active: boolean) => (active ? "home" : "home-outline"),
  ProjectPage: (active: boolean) => (active ? "book" : "book-outline"),
  TeamsPage: (active: boolean) => (active ? "people" : "people-outline"),
  ProfilePage: (active: boolean) => (active ? "person" : "person-outline"),
};

interface NavigatorParams {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}

interface ITabIconProps {
  focused: boolean;
  color: string;
  size: number;
}

function createConfig(params: NavigatorParams): BottomTabNavigationOptions {
  const { route } = params;

  function TabIcon({ focused, color, size }: ITabIconProps) {
    const iconName = icons[route.name](focused);
    return <Ionicons name={iconName} size={size} color={color} />;
  }

  return {
    tabBarIcon: TabIcon,
    tabBarLabel: () => <></>,
    headerTintColor: "#DF2266",
    tabBarActiveTintColor: "#DF2266",
    tabBarInactiveTintColor: "#DF2266",
  };
}

export default function LoggedInNavigator() {
  return (
    <Tab.Navigator screenOptions={createConfig}>
      <Tab.Screen
        options={{ headerShown: false, title: "Início" }}
        name='MainPage'
        component={MainPage}
      />
      <Tab.Screen
        options={{ headerShown: false, title: "Seus projetos" }}
        name='ProjectPage'
        component={ProjectsPage}
      />
      <Tab.Screen
        options={{ headerShown: false, title: "Seus times" }}
        name='TeamsPage'
        component={TeamsPage}
      />
      <Tab.Screen
        options={{ headerShown: false, title: "Seu perfil" }}
        name='ProfilePage'
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
}
