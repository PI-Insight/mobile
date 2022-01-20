import { Skeleton, VStack } from 'native-base';
import React, { memo } from 'react';

export const ProjectListSkeleton = memo(() => (
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
