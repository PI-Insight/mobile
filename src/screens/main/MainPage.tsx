import { Center, Text } from 'native-base';
import React from 'react';

export default function MainPage({ navigation }: any) {
  return (
    <Center p={8} bg="white" safeArea flex={1}>
      <Text>Principal</Text>
    </Center>
  );
}
