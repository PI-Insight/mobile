import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  VStack,
  Image,
  Heading,
  Text,
  Icon,
  HStack,
  Box,
  Stack,
} from "native-base";
import React from "react";
import { ProjectStackNavigatorParams } from ".";
import { baseURL } from "../../../api/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Touchable } from "../../../components/Touchable";

export function ProjectSingle({
  route,
  navigation,
}: NativeStackScreenProps<ProjectStackNavigatorParams, "ProjectSingle">) {
  const { project } = route.params;

  return (
    <VStack space={4} p={4}>
      {!!project.image && (
        <Image
          alt='Project image'
          source={{ uri: `${baseURL}/${project.image}` }}
          h={48}
          rounded={4}
        />
      )}
      <Heading size='2xl'>{project.name}</Heading>

      {!!project.description && (
        <VStack space={1}>
          <Heading size='sm'>Sobre</Heading>
          <Text color='gray.500'>{project.description}</Text>
        </VStack>
      )}

      <VStack space={1}>
        <Heading size='sm'>Time responsável</Heading>
        <Box borderRadius={4} overflow='hidden'>
          <Touchable borderless>
            <HStack p={2} alignItems='center' space={2}>
              <Stack p={4} bg='#e5e5e5' rounded='full'>
                <Icon
                  color='gray.400'
                  size='md'
                  as={<Ionicons name='people-outline' />}
                />
              </Stack>
              <Heading color='primary.500' size='sm'>
                Time
              </Heading>
            </HStack>
          </Touchable>
        </Box>
      </VStack>
    </VStack>
  );
}
