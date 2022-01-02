import theme from '../../theme';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// Screens
import { ParamListBase, RouteProp } from '@react-navigation/native';
import * as React from 'react';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainPage from '../screens/main/MainPage';
import { ProfileNavigator } from '../screens/main/Profile';
import ProjectsNavigator from '../screens/main/Projects';
import { TeamsNavigator } from '../screens/main/Teams';

const icons: any = {
  MainPage: (active: boolean) => (active ? 'home' : 'home-outline'),
  ProjectsPage: (active: boolean) => (active ? 'book' : 'book-outline'),
  TeamsPage: (active: boolean) => (active ? 'people' : 'people-outline'),
  ProfilePage: (active: boolean) => (active ? 'person' : 'person-outline'),
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

export type MainStackParamList = {
  MainPage: undefined;
  ProfilePage: undefined;
  ProjectsPage: undefined;
  TeamsPage: undefined;
};

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

const Tab = createBottomTabNavigator<MainStackParamList>();

export default function LoggedInNavigator() {
  return (
    <Tab.Navigator screenOptions={createConfig}>
      <Tab.Screen
        options={{ headerShown: false, title: 'Início' }}
        name="MainPage"
        component={MainPage}
      />
      <Tab.Screen
        options={{ headerShown: false, title: 'Seus projetos' }}
        name="ProjectsPage"
        component={ProjectsNavigator}
      />
      <Tab.Screen
        options={{ headerShown: false, title: 'Seus times' }}
        name="TeamsPage"
        component={TeamsNavigator}
      />
      <Tab.Screen
        options={{ headerShown: false, title: 'Seu perfil' }}
        name="ProfilePage"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
}
