import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import {
  Box, Center, Heading, HStack, Image, useDisclose,
} from 'native-base';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseURL } from '../api/base';
import { SimplePhotoSelector } from './SimplePhotoSelector';
import { Touchable } from './Touchable';

interface IPhotoSelectorProps {
  callback(photo: ImageInfo): any;
  image?: string | null;
}

export function PhotoSelector({ callback, image }: IPhotoSelectorProps) {
  const [photoPath, setPhotoPath] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  const onSelectPhoto = (imageInfo: ImageInfo) => {
    setPhotoPath(imageInfo.uri);
    callback(imageInfo);
  };

  return (
    <>
      <Box bg="#F6F6F6" overflow="hidden" borderRadius={8} borderWidth={1} borderColor="gray.200">
        <Touchable borderless onPress={onOpen}>
          {photoPath || image ? (
            <Image
              height={32}
              alt="project image"
              source={{ uri: photoPath || `${baseURL}/${image}` }}
            />
          ) : (
            <HStack space={4} alignItems="center" p={2}>
              <Center
                borderWidth={1}
                rounded="full"
                boxSize={16}
                borderColor="gray.200"
              >
                <Ionicons size={32} name="camera-outline" />
              </Center>
              <Heading size="md">Select a photo</Heading>
            </HStack>
          )}
        </Touchable>
      </Box>
      {isOpen && (
        <SimplePhotoSelector
          isOpen={isOpen}
          callback={onSelectPhoto}
          onCancel={onClose}
        />
      )}
    </>
  );
}
