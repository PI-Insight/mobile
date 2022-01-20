import { Box, Heading, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { IUser } from '~/api/user';
import { Touchable } from './Touchable';
import { UserPhoto } from './UserPhoto';

interface ICardUsersProps {
  user: IUser;
  onPress(): any;
}
export function UserCard({ user, onPress }: ICardUsersProps) {
  return (
    <Box borderRadius={8} overflow="hidden">
      <Touchable onPress={() => onPress()}>
        <HStack p={2} space={4}>
          <UserPhoto url={user.image} />
          <VStack>
            <Heading size="md">{user.displayname}</Heading>
            <Text color="gray.500">@{user.username}</Text>
          </VStack>
        </HStack>
      </Touchable>
    </Box>
  );
}
