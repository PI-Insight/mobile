import { Heading, View } from 'native-base';
import React, { useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { IUser } from '../../../../api/user';

interface ITabsProps {
  user: IUser;
}
export function Tabs({ user }: ITabsProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Posts' },
    { key: 'second', title: 'Fotos' },
  ]);

  const map = useMemo(
    () => SceneMap({
      first: () => (
        <View flex={1} bg="#f00">
          <Heading>dsahduiahdiu</Heading>
        </View>
      ),
      second: () => (
        <View flex={1} bg="#0f0">
          <Heading>dsahduiahdiu</Heading>
        </View>
      ),
    }),
    [user],
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={map}
      onIndexChange={setIndex}
      // renderTabBar={props}
      initialLayout={{ width: layout.width }}
    />
  );
}
