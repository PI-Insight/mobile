import {
  VStack,
  Box,
  Center,
  Stack,
  View,
  Image,
  HStack,
  Divider,
  Heading,
} from "native-base";
import React from "react";
import { FlatList } from "react-native";
import Ionicions from "react-native-vector-icons/Ionicons";
import { baseURL } from "../api/base";
import { IUser } from "../api/user";
import { Touchable } from "./Touchable";

interface ISelectorUsersProps {
  onPress(): void;
  onCardPress(user: IUser): void;
  users: IUser[];
}
export function SelectorUsers({
  onPress,
  onCardPress,
  users,
}: ISelectorUsersProps) {
  return (
    <Box overflow='hidden' borderRadius={8} border={1} borderColor='gray.200'>
      <Touchable borderless onPress={onPress}>
        <HStack p={2} justifyContent='center' alignItems='center'>
          <FlatList
            horizontal
            data={users}
            keyExtractor={(user) => user.id.toString()}
            renderItem={({ item }) => (
              <Touchable onPress={() => onCardPress(item)}>
                <Center mr={2}>
                  <Center
                    top='0'
                    right='0%'
                    zIndex={1}
                    position='absolute'
                    bg='gray.800'
                    rounded='full'
                    boxSize={5}
                  >
                    <Ionicions size={16} color='#fff' name='close-outline' />
                  </Center>
                  <Image
                    alt='profile photo'
                    source={{
                      uri: item.image
                        ? `${baseURL}/${item.image}`
                        : "https://picsum.photos/200",
                    }}
                    boxSize={16}
                    rounded='full'
                  />
                </Center>
              </Touchable>
            )}
            ListEmptyComponent={() => (
              <HStack alignItems='center' space={4}>
                <Center
                  border={1}
                  rounded='full'
                  boxSize={16}
                  borderColor='gray.200'
                >
                  <Ionicions size={32} name='add' />
                </Center>
                <Heading size='md'>Select members</Heading>
              </HStack>
            )}
          />
        </HStack>
      </Touchable>
    </Box>
  );
}
