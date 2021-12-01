import React, { useCallback, useState } from "react";
import {
  Heading,
  HStack,
  VStack,
  Text,
  Image,
  Box,
  Stack,
  Fade,
} from "native-base";
import { IUser } from "../api/user";
import { baseURL } from "../api/base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Touchable } from "./Touchable";

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
    <Box borderRadius={8} overflow='hidden'>
      <Touchable onPress={() => toggleSelected()}>
        <HStack p={2} bg={isSelected ? "blue.100" : "white"} space={4}>
          <Image
            alt='profile photo'
            source={{
              uri: user.image
                ? `${baseURL}/${user.image}`
                : "https://picsum.photos/200",
            }}
            boxSize={16}
            rounded='full'
          />
          <VStack space={2}>
            <Heading size='md'>{user.username}</Heading>
            <Text color='gray.500'>Hello there!</Text>
          </VStack>
          {isSelected && (
            <Stack ml='auto' mr={4} justifyContent='center'>
              <Ionicons name='ios-checkmark' size={24} />
            </Stack>
          )}
        </HStack>
      </Touchable>
    </Box>
  );
}
