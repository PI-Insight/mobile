import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';
import MainPage from '../screens/main/Index';
import { ProfileNavigator } from '../screens/main/profile';
import ProjectsNavigator from '../screens/main/projects';
import { TeamsNavigator } from '../screens/main/teams';

const icons: any = {
  index: (active: boolean) => (active ? 'home' : 'home-outline'),
  projects: (active: boolean) => (active ? 'book' : 'book-outline'),
  groups: (active: boolean) => (active ? 'people' : 'people-outline'),
  profile: (active: boolean) => (active ? 'person' : 'person-outline'),
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
  const color = theme.colors.primary['500'];

  function TabIcon({ focused, color, size }: ITabIconProps) {
    const iconName = icons[route.name](focused);
    return <Ionicons name={iconName} size={size} color={color} />;
  }

  return {
    tabBarIcon: TabIcon,
    tabBarLabel: () => <></>,
    headerTintColor: color,
    tabBarActiveTintColor: color,
    tabBarInactiveTintColor: color,
    // unmountOnBlur: true,
  };
}

export type MainStackParamList = {
  index: undefined;
  projects: undefined;
  groups: undefined;
  profile: undefined;
};

const Tab = createBottomTabNavigator<MainStackParamList>();

export default function LoggedInNavigator() {
  return (
    <Tab.Navigator screenOptions={createConfig}>
      <Tab.Screen
        options={{ headerShown: false, title: 'Início' }}
        name="index"
        component={MainPage}
      />
      <Tab.Screen
        options={{ headerShown: false, title: 'Seus projetos' }}
        name="projects"
        component={ProjectsNavigator}
      />
      <Tab.Screen
        options={{ headerShown: false, title: 'Seus times' }}
        name="groups"
        component={TeamsNavigator}
      />
      <Tab.Screen
        options={{ headerShown: false, title: 'Seu perfil' }}
        name="profile"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
}
