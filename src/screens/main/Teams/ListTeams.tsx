import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Divider,
  Fab,
  FlatList,
  Heading,
  HStack,
  Icon,
  Skeleton,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { TeamsStackNavigatorParams } from '.';
import { IGroup } from '../../../api/group';
import { getUserGroups } from '../../../api/user';
import { Touchable } from '../../../components';

interface IProjectProps {
  group: IGroup;
  navigation: any;
}
const Project = React.memo(
  ({ group, navigation }: IProjectProps) => (
    <Box m={2} borderRadius={4} overflow="hidden">
      <Touchable borderless onPress={() => {}}>
        <HStack p={2} alignItems="center" space={4}>
          <Box rounded={8} p={4} bg="#F6F6F6">
            <Ionicons color="#7B8794" size={32} name="people-outline" />
          </Box>
          <Heading size="md">{group.name}</Heading>
        </HStack>
      </Touchable>
    </Box>
  ),
  (prevProps, nextProps) => prevProps.group.id === nextProps.group.id,
);

const ListSkeleton = React.memo(() => (
  <VStack space={2} safeArea p={4}>
    <Skeleton w="100%" h={48} />
    <VStack space={1}>
      <Skeleton height={12} w="44%" />
      <VStack space={1}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={6} w="100%" />
          ))}
      </VStack>
    </VStack>
  </VStack>
));

export function TeamsPage({
  navigation,
  route,
}: NativeStackScreenProps<TeamsStackNavigatorParams, 'MainTeamsPage'>) {
  const [groups, setGroups] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const refreshGroups = useCallback(() => {
    setRefreshing(true);
    getUserGroups()
      .then(setGroups)
      .finally(() => setRefreshing(false));
  }, []);

  // useEffect(() => {
  //   if (route.params?.forceRefresh) refreshGroups();
  // }, [route.params?.forceRefresh]);

  useEffect(() => {
    refreshGroups();
  }, []);

  if (!groups) {
    return <ListSkeleton />;
  }

  return (
    <Box flex={1} safeArea>
      <VStack flex={1} space={4}>
        <Heading textAlign="center">Grupos</Heading>
        <View flex={1}>
          <FlatList
            refreshing={refreshing}
            ItemSeparatorComponent={() => (
              <Divider w="80%" mx="auto" my={1} />
            )}
            onRefresh={refreshGroups}
            data={groups}
            renderItem={({ item }) => (
              <Project navigation={navigation} group={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </VStack>
      {isFocused && (
        <Fab
          onPress={() => {}}
          justifyContent="center"
          alignItems="center"
          mb={12}
          icon={<Icon as={<Ionicons name="add-outline" />} />}
        />
      )}
    </Box>
  );
}
