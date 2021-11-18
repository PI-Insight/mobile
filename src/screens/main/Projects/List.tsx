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
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getUserProjects } from "../../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IProject } from "../../../api/project";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { NavigationScreenProp } from "react-navigation";

interface IProjectProps {
  project: IProject;
  isFocused: boolean;
  navigation: NavigationScreenProp<any, any>;
}
function Project({ project, isFocused, navigation }: IProjectProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProjectSingle", { project })}
    >
      <VStack space={2}>
        {!!project.image && (
          <Image
            source={{
              uri: project.image,
            }}
            alt='Alternate Text'
            w='100%'
            h={1}
            rounded={4}
            resizeMode='cover'
          />
        )}
        <VStack space={1} px={4}>
          <Heading size='lg'>{project.name}</Heading>
          <Text>{project.description}</Text>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}

export function ProjectsList({ navigation }: ScreenProps) {
  const [projects, setProjects] = React.useState<any[]>([]);
  const id = useSelector<RootState>((state) => state.user.id) as number;
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const refreshProjects = () => {
    setRefreshing(true);
    getUserProjects(id)
      .then(setProjects)
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return (
    <VStack space={4} position='relative' bg='#fff' safeArea>
      <Heading textAlign='center'>Projetos</Heading>
      <FlatList
        ItemSeparatorComponent={() => <Divider size={1} my={4} />}
        refreshing={refreshing}
        onRefresh={refreshProjects}
        data={projects}
        renderItem={({ item }) => (
          <Project
            navigation={navigation}
            isFocused={isFocused}
            project={item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {isFocused && (
        <Fab
          onPress={() => navigation.navigate("ProjectCreate")}
          justifyContent='center'
          alignItems='center'
          mb={12}
          icon={<Icon as={<Ionicons name='add-outline' />} />}
        />
      )}
    </VStack>
  );
}
