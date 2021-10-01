import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../store";

import LoggedInNavigator from "./main";
import AuthenticationNavigator from "./authentication";

export default function MainNavigator() {
  const userLoggedIn = useSelector<RootState>((state) => state.user.isLoggedIn);

  if (userLoggedIn) return <LoggedInNavigator />;
  return <AuthenticationNavigator />;
}
