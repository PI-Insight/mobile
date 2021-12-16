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
  Fab,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ProjectStackNavigatorParams } from ".";
import { baseURL } from "../../../api/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Touchable } from "../../../components/Touchable";
import { useIsFocused } from "@react-navigation/native";
import { getProject, IProject } from "../../../api/project";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IUser } from "../../../api/user";
import { IUSerSliceState } from "../../../store/slices/user";

export function ProjectSingle({
  route,
  navigation,
}: NativeStackScreenProps<ProjectStackNavigatorParams, "ProjectSingle">) {
  const [project, setProject] = useState<IProject | null>(null);
  const user = useSelector<RootState, IUSerSliceState>((state) => state.user);
  const { projectId } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    getProject(projectId).then(setProject);
  }, [projectId]);

  if (!isFocused || !project) return null;

  return (
    <VStack space={4} p={4}>
      {!!project.image && (
        <Image
          alt='Project image'
          source={{ uri: `${baseURL}/${project.image}` }}
          h={48}
          rounded={4}
          resizeMethod='resize'
        />
      )}
      <Heading size='xl'>{project.name}</Heading>

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
      {project.owner!.id !== user.id && (
        <Fab
          onPress={() => {}}
          justifyContent='center'
          alignItems='center'
          mb={12}
          icon={<Icon as={<Ionicons name='person-add-outline' />} />}
        />
      )}
    </VStack>
  );
}
