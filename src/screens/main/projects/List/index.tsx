import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Divider, Fab, FlatList, Heading, Icon, View, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { IProject } from '~/api/project';
import { getUserProjects } from '~/api/user';
import { ProjectStackNavigatorParams } from '..';
import { Card, Skeleton } from './components';

type ProjectListProps = NativeStackScreenProps<ProjectStackNavigatorParams, 'project.list'>;
export function ProjectList({ navigation, route }: ProjectListProps) {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const refreshProjects = useCallback(() => {
    setRefreshing(true);
    getUserProjects()
      .then((projects) =>
        setProjects(projects.sort((project) => new Date(project.createdAt).getTime()))
      )
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (route.params?.forceRefresh) refreshProjects();
  }, [route.params?.forceRefresh]);

  useEffect(() => {
    refreshProjects();
  }, []);

  if (refreshing && !projects.some((i) => i)) {
    return <Skeleton />;
  }

  return (
    <Box flex={1} safeArea>
      <VStack flex={1} space={4}>
        <Heading color="black" size="xl" textAlign="center">
          Projetos
        </Heading>
        <View flex={1}>
          <FlatList
            refreshing={refreshing}
            ItemSeparatorComponent={() => <Divider mx="auto" w="80%" my={1} />}
            onRefresh={refreshProjects}
            data={projects}
            renderItem={({ item }) => <Card navigation={navigation} project={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </VStack>
      {isFocused && (
        <Fab
          onPress={() => navigation.navigate('project.create', { selectedUsers: [] })}
          justifyContent="center"
          alignItems="center"
          mb={12}
          icon={<Icon as={<Ionicons name="add-outline" />} />}
        />
      )}
    </Box>
  );
}
