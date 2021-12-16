import React, { useCallback, useEffect, useState } from "react";
import { ScreenProps } from "../../../types";
import {
  Box,
  Center,
  Fab,
  FlatList,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Image,
  Divider,
  PresenceTransition,
  Pressable,
  Stack,
  CircularProgress,
  Skeleton,
  ScrollView,
  View,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getUserProjects } from "../../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IProject } from "../../../api/project";
import { useIsFocused } from "@react-navigation/native";
import { NavigationScreenProp } from "react-navigation";
import { Touchable } from "../../../components/Touchable";
import { ProjectStackNavigatorParams } from ".";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { baseURL } from "../../../api/base";

interface IProjectProps {
  project: IProject;
  navigation: any;
}
const Project = React.memo(
  ({ project, navigation }: IProjectProps) => {
    return (
      <Box borderRadius={4} overflow='hidden' p={2}>
        <Touchable
          borderless
          onPress={() =>
            navigation.navigate("ProjectSingle", { projectId: project.id })
          }
        >
          <VStack p={2} space={2}>
            {!!project.image && (
              <Image
                source={{
                  uri: `${baseURL}/${project.image}`,
                }}
                alt='Alternate Text'
                w='100%'
                h={48}
                rounded={4}
                resizeMode='cover'
                resizeMethod='resize'
              />
            )}
            <VStack space={1}>
              <Heading size='lg'>{project.name}</Heading>
              {!!project.description && <Text>{project.description}</Text>}
            </VStack>
          </VStack>
        </Touchable>
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.project.id === nextProps.project.id;
  }
);

const ListSkeleton = React.memo(() => {
  return (
    <VStack space={2} safeArea p={4}>
      <Skeleton w='100%' h={48} />
      <VStack space={1}>
        <Skeleton height={12} w='44%' variant='text' />
        <VStack space={1}>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={6} w='100%' variant='text' />
            ))}
        </VStack>
      </VStack>
    </VStack>
  );
});

export function ProjectsList({
  navigation,
  route,
}: NativeStackScreenProps<ProjectStackNavigatorParams, "ProjectsList">) {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const id = useSelector<RootState>((state) => state.user.id) as number;
  const isFocused = useIsFocused();

  const refreshProjects = useCallback(() => {
    setRefreshing(true);
    getUserProjects(id)
      .then(setProjects)
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (route.params?.forceRefresh) refreshProjects();
  }, [route.params?.forceRefresh]);

  useEffect(() => {
    refreshProjects();
  }, []);

  if (!isFocused) return null;

  if (!projects) {
    return <ListSkeleton />;
  }

  return (
    <Box flex={1} safeArea>
      <VStack flex={1} space={4}>
        <Heading textAlign='center'>Projetos</Heading>
        <View flex={1}>
          <FlatList
            refreshing={refreshing}
            ItemSeparatorComponent={() => <Divider size={1} my={1} />}
            onRefresh={refreshProjects}
            data={projects}
            renderItem={({ item }) => (
              <Project navigation={navigation} project={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </VStack>
      <Fab
        onPress={() =>
          navigation.navigate("ProjectCreate", { selectedUsers: [] })
        }
        justifyContent='center'
        alignItems='center'
        mb={12}
        icon={<Icon as={<Ionicons name='add-outline' />} />}
      />
    </Box>
  );
}
