import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { ProjectStackNavigatorParams } from '.';
import { createProject } from '../../../api/project';
import { IUser } from '../../../api/user';
import {
  ControlledInput,
  ControlledTextArea,
  PhotoSelector,
  UsersSelector,
} from '../../../components';

interface IFormValues {
  name: string;
  description: string;
  members: number[];
  image?: string;
}

export function ProjectCreate({
  navigation,
  route,
}: NativeStackScreenProps<ProjectStackNavigatorParams, 'ProjectCreate'>) {
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
    async (values) => await createProject({
      ...values,
      members: members.map((u) => u.id),
      image,
    })
      .then(() => navigation.replace('ProjectsList', { forceRefresh: false }))
      .catch((e) => Alert.alert('Error', e.message)),
    [members, formState],
  );

  return (
    <Box safeArea flex={1}>
      <VStack justifyContent="space-between" p={4} flex={1}>
        <VStack space={4}>
          <ControlledInput
            name="name"
            control={control}
            placeholder="A nice name to your project"
            label="Name"
          />
          <ControlledTextArea
            label="Description"
            name="description"
            control={control}
          />
          <UsersSelector
            users={members}
            onCardPress={removeMember}
            onPress={() => navigation.navigate('UsersSelect', {
              selecteds: members,
              goto: 'ProjectCreate',
            })}
          />
          <PhotoSelector callback={(image) => setImage(image.uri)} />
        </VStack>

        <Button
          rounded={32} h={12}
          isLoading={formState.isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          {formState.isSubmitting ? '' : 'Criar'}
        </Button>
      </VStack>
    </Box>
  );
}
