import { Center, Image } from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseURL } from '~/api/base';

export type UserPhotoProps = {
  url?: string;
  size?: number;
};
export const UserPhoto = ({ url, size }: UserPhotoProps) => {
  if (url) {
    return (
      <Image
        alt="profile photo"
        source={{
          uri: `${baseURL}/${url}`,
        }}
        boxSize={size || 16}
        rounded="full"
      />
    );
  }

  return (
    <Center rounded="full" bg="gray.100" h={16} w={16}>
      <Ionicons size={18} name="person-outline" />
    </Center>
  );
};
