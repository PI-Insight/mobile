import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Spinner, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useUser from '~/hooks/useUser';
import { RootState } from '~/store';
import { ProfileStackNavigatorParams } from '..';
import { Header } from './components/Header';
import { Photo } from './components/Photo';
import { Tabs } from './components/Tabs';
import { Username } from './components/Username';

export function Profile({
  route: {
    params: { userId },
  },
  navigation: { setParams },
}: NativeStackScreenProps<ProfileStackNavigatorParams, 'profile.index'>) {
  const { user } = useUser(userId);
  const isFocused = useIsFocused();
  const loggedInUserid = useSelector((state: RootState) => state.user.id);
  const isSameUser = useSelector<RootState, boolean>((state) => state.user.id === userId);

  useEffect(() => {
    if (!isFocused && user.id !== loggedInUserid) {
      setParams({ userId: loggedInUserid });
    }
  }, [isFocused]);

  if (!user || user.id !== userId) {
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
        <Username user={user} isSameUser={isSameUser} />
      </VStack>
      <Tabs user={user} />
    </VStack>
  );
}
