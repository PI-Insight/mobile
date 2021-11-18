import React from "react";
import { Alert } from "react-native";
import { getUser, IUser } from "../api/user";

export default function useUser(id: number) {
  const [user, setUser] = React.useState<IUser | null>(null);

  const fetchUser = React.useCallback(async () => {
    const user = await getUser(id);
    setUser(user);
  }, [id]);

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return user;
}
