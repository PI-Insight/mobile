import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Heading, Image, Text, VStack } from 'native-base';
import React from 'react';
import { baseURL } from '~/api/base';
import { IProject } from '~/api/project';
import { Touchable } from '~/components';
import { ProjectStackNavigatorParams } from '../..';

type StackProps = NativeStackScreenProps<ProjectStackNavigatorParams, 'project.list'>;
type ProjectCardProps = {
  project: IProject;
  navigation: StackProps['navigation'];
};

export const ProjectCard = React.memo(
  ({ project, navigation }: ProjectCardProps) => (
    <Box m={2} borderRadius={4} overflow="hidden">
      <Touchable onPress={() => navigation.navigate('project.single', { projectId: project.id })}>
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
  (prevProps, nextProps) => prevProps.project.id === nextProps.project.id
);
