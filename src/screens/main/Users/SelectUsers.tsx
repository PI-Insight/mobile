import React, { useCallback, useEffect, useState } from "react";
import { ScreenProps } from "../../../types";
import { Box, Button, Center, Divider, Text, VStack } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UsersStackNavigatorParams } from ".";
import usePagination from "../../../hooks/usePagination";
import { IUser, paginateUsers } from "../../../api/user";
import { CardUsers } from "../../../components/CardUsers";
import { FlatList } from "react-native";
import { ProjectStackNavigatorParams } from "../Projects";

export function UsersSelect({
  navigation,
  route,
}: NativeStackScreenProps<ProjectStackNavigatorParams, "UsersSelect">) {
  const limit = 10;
  const { selecteds } = route.params;

  const [offset, setOffset] = useState(0);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selected, setSelected] = useState<IUser[]>(selecteds || []);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadUsers = useCallback(async () => {
    setIsRefreshing(true);
    const users = await paginateUsers(limit, offset);
    setUsers((oldUsers) => [...oldUsers, ...users]);
    setOffset((offset) => offset + limit);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  function updateSelected(user: IUser, isSelected: boolean) {
    setSelected((oldSelected) => {
      if (isSelected) {
        return [...oldSelected, user];
      } else {
        return oldSelected.filter((u) => u.id !== user.id);
      }
    });
  }

  return (
    <VStack flex={1} p={4}>
      <FlatList
        refreshing={isRefreshing}
        onEndReachedThreshold={0.3}
        onEndReached={loadUsers}
        data={users}
        keyExtractor={(user) => user.id.toString()}
        ItemSeparatorComponent={() => <Box my={1} />}
        renderItem={({ item }) => (
          <CardUsers
            selected={selected.some((u) => u.id === item.id)}
            onSelect={updateSelected}
            user={item}
          />
        )}
      />
      <Button
        mt='auto'
        onPress={() => {
          navigation.navigate("ProjectCreate", {
            selectedUsers: selected,
          });
        }}
      >
        Confirm
      </Button>
    </VStack>
  );
}
