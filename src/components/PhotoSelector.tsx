import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import {
  Actionsheet,
  Box,
  Center,
  Heading,
  HStack,
  Text,
  useDisclose,
  Image,
} from "native-base";
import React, { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Touchable } from "./Touchable";
import Ionicons from "react-native-vector-icons/Ionicons";
import { baseURL } from "../api/base";

export enum PhotoSelectorType {
  CAMERA = "PHOTO_SELECTOR_TYPE_CAMERA",
  GALLERY = "PHOTO_SELECTOR_TYPE_GALLERY",
}

interface IPhotoSelectorProps {
  type?: PhotoSelectorType;
  callback(photo: ImageInfo): any;
  image?: string | null;
}

export function PhotoSelector({ type, callback, image }: IPhotoSelectorProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  const takePhotoFromCamera = useCallback(async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }

    setPhoto(result.uri);
    callback(result);
    onClose();
  }, []);

  const takePhotoFromGallery = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }

    setPhoto(result.uri);
    callback(result);
    onClose();
  }, []);

  return (
    <>
      <Box overflow='hidden' borderRadius={8} border={1} borderColor='gray.200'>
        <Touchable borderless onPress={onOpen}>
          {photo || image ? (
            <Image
              height={32}
              alt='project image'
              source={{ uri: photo || `${baseURL}/${image}` }}
            />
          ) : (
            <HStack space={4} alignItems='center' p={2}>
              <Center
                border={1}
                rounded='full'
                boxSize={16}
                borderColor='gray.200'
              >
                <Ionicons size={32} name='camera-outline' />
              </Center>
              <Heading size='md'>Select a photo</Heading>
            </HStack>
          )}
        </Touchable>
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w='100%' h={60} px={4} justifyContent='center'>
            <Text
              fontSize='md'
              color='gray.500'
              _dark={{
                color: "gray.300",
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
    </>
  );
}
