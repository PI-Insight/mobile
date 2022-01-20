import { Box, Center, Heading, HStack } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';
import Ionicions from 'react-native-vector-icons/Ionicons';
import { IUser } from '../api/user';
import { Touchable } from './Touchable';
import { UserPhoto } from './UserPhoto';

interface ISelectorUsersProps {
  onPress(): void;
  onCardPress(user: IUser): void;
  users: IUser[];
}
export function UsersSelector({ onPress, onCardPress, users }: ISelectorUsersProps) {
  return (
    <Box bg="#F6F6F6" overflow="hidden" borderRadius={8} borderWidth={1} borderColor="gray.200">
      <Touchable borderless onPress={onPress}>
        <HStack p={2} justifyContent="center" alignItems="center">
          <FlatList
            horizontal
            data={users}
            keyExtractor={(user) => user.id.toString()}
            renderItem={({ item }) => (
              <Touchable onPress={() => onCardPress(item)}>
                <Center mr={2}>
                  <Center
                    top="0"
                    left="0"
                    zIndex={1}
                    position="absolute"
                    bg="gray.800"
                    rounded="full"
                    boxSize={5}
                  >
                    <Ionicions size={16} color="#fff" name="close-outline" />
                  </Center>
                  <UserPhoto url={item.image} size={16} />
                </Center>
              </Touchable>
            )}
            ListEmptyComponent={() => (
              <HStack alignItems="center" space={4}>
                <Center borderWidth={1} rounded="full" boxSize={16} borderColor="gray.200">
                  <Ionicions size={32} name="add" />
                </Center>
                <Heading size="md">Select members</Heading>
              </HStack>
            )}
          />
        </HStack>
      </Touchable>
    </Box>
  );
}
