import ImagePicker from 'expo-image-picker';
import { ImageInfo, ImagePickerResult } from 'expo-image-picker/build/ImagePicker.types';
import { Actionsheet, Box, Text } from 'native-base';
import React, { useCallback } from 'react';

export enum PhotoSelectorType {
  CAMERA = 'PHOTO_SELECTOR_TYPE_CAMERA',
  GALLERY = 'PHOTO_SELECTOR_TYPE_GALLERY',
}

interface ISimplePhotoSelectorProps {
  type?: PhotoSelectorType;
  callback(photo: ImageInfo): any;
  onCancel(): any;
  isOpen: boolean;
}

export function SimplePhotoSelector({
  callback,
  onCancel,
  isOpen,
}: ISimplePhotoSelectorProps) {
  const takePhotoFromCamera = useCallback(async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }

    callback(result as ImageInfo);
  }, []);

  const takePhotoFromGallery = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }

    callback(result as ImageInfo);
  }, []);

  return (
    <Actionsheet isOpen={isOpen} onClose={onCancel}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text
            fontSize="md"
            color="gray.500"
            _dark={{
              color: 'gray.300',
            }}
          >
            Select an option
          </Text>
        </Box>
        <Actionsheet.Item onPress={takePhotoFromGallery}>
          Gallery
        </Actionsheet.Item>
        <Actionsheet.Item onPress={takePhotoFromCamera}>
          Camera
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
