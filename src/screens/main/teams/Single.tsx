import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Divider, Fab, FlatList, Heading, Icon, Skeleton, View, VStack } from 'native-base';
import React, { memo, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getGroup, IGroup } from '~/api/group';
import { UserCard } from '~/components/UserCard';
import { MainTabNavigatorParamList } from '~/navigation/main';
import { GroupsStackNavigatorParams } from '.';
import { ProfileStackNavigatorParams } from '../profile';

type GroupSingleScreenNavigationsProp = CompositeScreenProps<
  NativeStackScreenProps<GroupsStackNavigatorParams, 'groups.single'>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabNavigatorParamList>,
    NativeStackScreenProps<ProfileStackNavigatorParams>
  >
>;

const GroupSingleSkeleton = memo(() => {
  return (
    <Box flex={1} safeArea>
      <VStack flex={1}>
        {[...Array(5)].map((_, index) => (
          <Box key={index} p={2}>
            <Skeleton w="100%" h={20} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
});

export function GroupSingle({ navigation: { navigate }, route }: GroupSingleScreenNavigationsProp) {
  const [group, setGroup] = useState<IGroup>();
  const { groupId } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    getGroup(groupId).then(setGroup);
  }, []);

  if (!group) {
    return <GroupSingleSkeleton />;
  }

  return (
    <Box flex={1} safeArea>
      <VStack flex={1} space={4}>
        <Heading color="black" size="xl" textAlign="center">
          {group.name}
        </Heading>
        <View flex={1}>
          <FlatList
            ItemSeparatorComponent={() => <Divider w="80%" mx="auto" my={1} />}
            data={group.members}
            renderItem={({ item }) => (
              <Box p={2}>
                <UserCard
                  onPress={() =>
                    navigate('profile', { screen: 'profile.index', params: { userId: item.id } })
                  }
                  user={item}
                />
              </Box>
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
