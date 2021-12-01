import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IUser } from "../../../api/user";
import { UsersSelect } from "./SelectUsers";

export type UsersStackNavigatorParams = {};

const Stack = createNativeStackNavigator<UsersStackNavigatorParams>();

export default function UsersNavigator() {
  return <></>;
}
