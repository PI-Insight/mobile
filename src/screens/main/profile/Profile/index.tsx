import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Spinner, VStack } from 'native-base';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileStackNavigatorParams } from '..';
import useUser from '~/hooks/useUser';
import { RootState } from '~/store';
import { Header } from './Header';
import { Photo } from './Photo';
import { Tabs } from './Tabs';
import { Username } from './Username';

export function Profile({
  route,
}: NativeStackScreenProps<ProfileStackNavigatorParams, 'profile.index'>) {
  const { user, setUser } = useUser(route.params.userId);
  const isSameUser = useSelector<RootState, boolean>(
    (state) => state.user.id === route.params.userId
  );

  if (!user) {
    return (
      <Center safeArea flex={1}>
        <Spinner accessibilityLabel="Loading profile" />
      </Center>
    );
  }

  return (
    <VStack bg="primary.500" safeArea>
      <VStack paddingX={4}>
        <Header isSameUser={isSameUser} />
        <Photo photoUrl={user.image} isSameUser={isSameUser} />
      </VStack>
      <VStack bg="#fff" p={4}>
        <Username user={user} setUser={setUser} isSameUser={isSameUser} />
      </VStack>
      <Tabs user={user} />
    </VStack>
  );
}
