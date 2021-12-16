import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  FormControl,
  Input,
  ScrollView,
  Stack,
  TextArea,
  VStack,
} from "native-base";
import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View, Text, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationScreenProp } from "react-navigation";
import { ProjectStackNavigatorParams } from ".";
import { createProject, IProject } from "../../../api/project";
import { IUser } from "../../../api/user";
import { ControlledInput } from "../../../components";
import ControlledTextArea from "../../../components/ControlledTextArea";
import { PhotoSelector } from "../../../components/PhotoSelector";
import { SelectorUsers } from "../../../components/UsersSelector";
import UsersNavigator from "../Users";
interface IFormValues {
  name: string;
  description: string;
  members: number[];
  image?: string;
}

export function ProjectCreate({
  navigation,
  route,
}: NativeStackScreenProps<ProjectStackNavigatorParams, "ProjectCreate">) {
  const { control, handleSubmit, formState } = useForm<IFormValues>();
  const [members, setMembers] = useState<IUser[]>([]);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (route.params?.selectedUsers) {
      setMembers(route.params.selectedUsers);
    }
  }, [route.params?.selectedUsers]);

  function removeMember(user: IUser) {
    setMembers((oldMembers) => oldMembers.filter((u) => u.id !== user.id));
  }

  const onSubmit = useCallback(
    async (values) => {
      return await createProject({
        ...values,
        members: members.map((u) => u.id),
        image,
      })
        .then((project) =>
          navigation.replace("ProjectsList", { forceRefresh: false })
        )
        .catch((e) => Alert.alert("Error", e.message));
    },
    [members, formState]
  );

  return (
    <Box safeArea flex={1}>
      <VStack justifyContent='space-between' p={4} flex={1}>
        <VStack space={4}>
          <ControlledInput
            name='name'
            control={control}
            placeholder='A nice name to your project'
            label='Name'
          />
          <ControlledTextArea
            label='Description'
            name='description'
            control={control}
          />
          <SelectorUsers
            users={members}
            onCardPress={removeMember}
            onPress={() =>
              navigation.navigate("UsersSelect", {
                selecteds: members,
                goto: "ProjectCreate",
              })
            }
          />
          <PhotoSelector callback={(image) => setImage(image.uri)} />
        </VStack>

        <Button
          isLoading={formState.isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          {formState.isSubmitting ? "" : "Criar"}
        </Button>
      </VStack>
    </Box>
  );
}
