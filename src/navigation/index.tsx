import React from 'react';
import { useSelector } from 'react-redux';
import { http } from '../api/base';
import { RootState } from '../store';
import AuthenticationNavigator, {
  AuthenticationStackParamList,
} from './authentication';
import LoggedInNavigator, { MainStackParamList } from './main';

export function Navigator() {
  const token = useSelector<RootState, string>((state) => state.user.token);

  // Refresh auth token
  http.defaults.headers.Authorization = `Bearer ${token}`;

  return token ? <LoggedInNavigator /> : <AuthenticationNavigator />;
}

export {
  AuthenticationNavigator,
  LoggedInNavigator,
  AuthenticationStackParamList,
  MainStackParamList,
};
