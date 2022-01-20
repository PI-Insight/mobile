import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, Heading, HStack, Stack, Text, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { IUser } from '~/api/user';
import { Touchable } from '~/components/Touchable';
import { UserPhoto } from '~/components/UserPhoto';

interface ICardUsersProps {
  user: IUser;
  selected?: boolean;
  onSelect(user: IUser, selected: boolean): void;
}
export function CardUsers({ user, onSelect, selected }: ICardUsersProps) {
  const [isSelected, setIsSelected] = useState(!!selected);

  const toggleSelected = useCallback(() => {
    onSelect(user, !isSelected);
    setIsSelected(!isSelected);
  }, [isSelected]);

  return (
    <Box borderRadius={8} overflow="hidden">
      <Touchable onPress={() => toggleSelected()}>
        <HStack p={2} bg={isSelected ? 'blue.100' : 'white'} space={4}>
          <UserPhoto url={user.image} size={16} />
          <VStack space={2}>
            <Heading size="md">{user.username}</Heading>
            <Text color="gray.500">Hello there!</Text>
          </VStack>
          {isSelected && (
            <Stack ml="auto" mr={4} justifyContent="center">
              <Ionicons name="ios-checkmark" size={24} />
            </Stack>
          )}
        </HStack>
      </Touchable>
    </Box>
  );
}
