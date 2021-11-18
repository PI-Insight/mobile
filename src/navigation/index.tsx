import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../store";

import LoggedInNavigator from "./main";
import AuthenticationNavigator from "./authentication";
import { http } from "../api/base";

export default function MainNavigator() {
  const token = useSelector<RootState>((state) => state.token.token) as
    | string
    | undefined;

  // Refresh auth token
  http.defaults.headers["Authorization"] = `Bearer ${token}`;

  return token ? <LoggedInNavigator /> : <AuthenticationNavigator />;
}
