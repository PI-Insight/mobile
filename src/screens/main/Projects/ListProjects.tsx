import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Divider,
  Fab,
  FlatList,
  Heading,
  Icon,
  Image,
  Skeleton,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { ProjectStackNavigatorParams } from '.';
import { baseURL } from '../../../api/base';
import { IProject } from '../../../api/project';
import { getUserProjects } from '../../../api/user';
import { Touchable } from '../../../components';

interface IProjectProps {
  project: IProject;
  navigation: any;
}
const Project = React.memo(
  ({ project, navigation }: IProjectProps) => (
    <Box m={2} borderRadius={4} overflow="hidden">
      <Touchable
        onPress={() => navigation.navigate('ProjectSingle', { projectId: project.id })}
      >
        <VStack p={2} space={2}>
          {!!project.image && (
          <Image
            source={{
              uri: `${baseURL}/${project.image}`,
            }}
            alt="Alternate Text"
            w="100%"
            h={48}
            rounded={4}
            resizeMode="cover"
            resizeMethod="resize"
          />
          )}
          <VStack space={1}>
            <Heading size="lg">{project.name}</Heading>
            {!!project.description && <Text>{project.description}</Text>}
          </VStack>
        </VStack>
      </Touchable>
    </Box>
  ),
  (prevProps, nextProps) => prevProps.project.id === nextProps.project.id,
);

const ListSkeleton = React.memo(() => (
  <VStack space={2} safeArea p={4}>
    <Skeleton w="100%" h={48} />
    <VStack space={1}>
      <Skeleton height={12} w="44%"/>
      <VStack space={1}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={6} w="100%"/>
          ))}
      </VStack>
    </VStack>
  </VStack>
));

export function ProjectsList({
  navigation,
  route,
}: NativeStackScreenProps<ProjectStackNavigatorParams, 'ProjectsList'>) {
  const [projects, setProjects] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const refreshProjects = useCallback(() => {
    setRefreshing(true);
    getUserProjects()
      .then(setProjects)
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (route.params?.forceRefresh) refreshProjects();
  }, [route.params?.forceRefresh]);

  useEffect(() => {
    refreshProjects();
  }, []);

  if (!projects.some(i => i)) {
    return <ListSkeleton />;
  }

  return (
    <Box flex={1} safeArea>
      <VStack flex={1} space={4}>
        <Heading textAlign="center">Projetos</Heading>
        <View flex={1}>
          <FlatList
            refreshing={refreshing}
            ItemSeparatorComponent={() => (
              <Divider mx="auto" w="80%" my={1} />
            )}
            onRefresh={refreshProjects}
            data={projects}
            renderItem={({ item }) => (
              <Project navigation={navigation} project={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </VStack>
      {isFocused && (
        <Fab
          onPress={() => navigation.navigate('ProjectCreate', { selectedUsers: [] })}
          justifyContent="center"
          alignItems="center"
          mb={12}
          icon={<Icon as={<Ionicons name="add-outline" />} />}
        />
      )}
    </Box>
  );
}
