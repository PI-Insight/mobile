import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Divider, Fab, Heading, Icon, Image, Text, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { baseURL } from '~/api/base';
import { getProject, IProject } from '~/api/project';
import { UserCard } from '~/components/UserCard';
import { MainTabNavigatorParamList } from '~/navigation';
import { RootState } from '~/store';
import { IUSerSliceState } from '~/store/slices/user';
import { ProjectStackNavigatorParams } from '.';
import { ProfileStackNavigatorParams } from '../profile';

type ProjectSingleProps = CompositeScreenProps<
  NativeStackScreenProps<ProjectStackNavigatorParams, 'project.single'>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabNavigatorParamList>,
    NativeStackScreenProps<ProfileStackNavigatorParams>
  >
>;

export function ProjectSingle({ route, navigation: { navigate } }: ProjectSingleProps) {
  const [project, setProject] = useState<IProject | null>(null);
  const user = useSelector<RootState, IUSerSliceState>((state) => state.user);
  const { projectId } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    getProject(projectId).then(setProject);
  }, [projectId]);

  if (!isFocused || !project) return null;

  return (
    <Box flex={1} safeArea p={4}>
      <VStack space={4}>
        {!!project.image && (
          <Image
            alt="Project image"
            source={{ uri: `${baseURL}/${project.image}` }}
            h={48}
            rounded={4}
            resizeMethod="resize"
          />
        )}
        <Heading size="xl">{project.name}</Heading>

        {!!project.description && (
          <VStack space={1}>
            <Heading size="sm">Sobre</Heading>
            <Text color="gray.500">{project.description}</Text>
          </VStack>
        )}

        <VStack space={1}>
          <Heading size="sm">Time responsável</Heading>
          <View>
            <FlatList
              ItemSeparatorComponent={() => <Divider w="80%" mx="auto" my={1} />}
              data={project.members}
              renderItem={({ item }) => (
                <UserCard
                  onPress={() =>
                    navigate('profile', { screen: 'profile.index', params: { userId: item.id } })
                  }
                  user={item}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </VStack>
        {project.owner!.id !== user.id && (
          <Fab
            onPress={() => {}}
            justifyContent="center"
            alignItems="center"
            mb={12}
            icon={<Icon as={<Ionicons name="person-add-outline" />} />}
          />
        )}
      </VStack>
    </Box>
  );
}
