import { Text, VStack } from 'native-base';
import React from 'react';

export const Logo = React.memo(() => (
  <VStack alignItems="center">
    <Text color="black" fontSize="5xl" bold>
      INSIGHT
    </Text>
    <Text color="gray.800" fontSize="md">
      Mantra vem aqui
    </Text>
  </VStack>
));
