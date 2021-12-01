import React, { useEffect, useState } from "react";
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
function Project({ project, navigation }: IProjectProps) {
  return (
    <Box borderRadius={4} overflow='hidden' p={2}>
      <Touchable
        borderless
        onPress={() => navigation.navigate("ProjectSingle", { project })}
      >
        <VStack p={2} space={2}>
          {!!project.image && (
            <Image
              source={{
                uri: `${baseURL}/${project.image}`,
              }}
              alt='Alternate Text'
              w='100%'
              h={32}
              rounded={4}
              resizeMode='cover'
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
}

export function ProjectsList({
  navigation,
  route,
}: NativeStackScreenProps<ProjectStackNavigatorParams, "ProjectsList">) {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const id = useSelector<RootState>((state) => state.user.id) as number;
  const isFocused = useIsFocused();

  const refreshProjects = () => {
    setRefreshing(true);
    getUserProjects(id)
      .then(setProjects)
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    if (route.params?.forceRefresh) refreshProjects();
  }, [route.params?.forceRefresh]);

  useEffect(() => {
    refreshProjects();
  }, []);

  if (!isFocused)
    return (
      <Center safeArea flex={1}>
        <CircularProgress size={16} value={100} isIndeterminate />
      </Center>
    );

  return (
    <VStack mb={16} space={4} position='relative' bg='#fff' safeArea>
      <Heading textAlign='center'>Projetos</Heading>
      <FlatList
        ItemSeparatorComponent={() => <Divider size={1} my={1} />}
        refreshing={refreshing}
        onRefresh={refreshProjects}
        data={projects}
        renderItem={({ item }) => (
          <Project navigation={navigation} project={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Fab
        onPress={() =>
          navigation.navigate("ProjectCreate", { selectedUsers: [] })
        }
        justifyContent='center'
        alignItems='center'
        mb={12}
        icon={<Icon as={<Ionicons name='add-outline' />} />}
      />
    </VStack>
  );
}
