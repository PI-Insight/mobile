import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { IUser, paginateUsers } from '../../../api/user';
import { CardUsers } from '../../../components';
import { ProjectStackNavigatorParams } from '../Projects';

export function UsersSelect({
  navigation,
  route,
}: NativeStackScreenProps<ProjectStackNavigatorParams, 'UsersSelect'>) {
  const limit = 10;
  const { selecteds, goto } = route.params;

  const [offset, setOffset] = useState(0);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selected, setSelected] = useState<IUser[]>(selecteds || []);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadUsers = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    const users = await paginateUsers(limit, offset);
    setUsers((oldUsers) => [...oldUsers, ...users]);
    setOffset((offset) => offset + limit);
    setIsRefreshing(false);
  }, [isRefreshing, offset]);

  useEffect(() => {
    loadUsers();
  }, []);

  function updateSelected(user: IUser, isSelected: boolean) {
    setSelected((oldSelected) => {
      if (isSelected) {
        return [...oldSelected, user];
      }
      return oldSelected.filter((u) => u.id !== user.id);
    });
  }

  return (
    <VStack flex={1} p={4}>
      <FlatList
        refreshing={isRefreshing}
        onEndReachedThreshold={0.1}
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
        mt="auto"
        rounded={32}
        h={12}
        onPress={() => {
          navigation.navigate(goto, {
            selectedUsers: selected,
          });
        }}
      >
        Confirm
      </Button>
    </VStack>
  );
}
