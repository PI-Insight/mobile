import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import {
  Box, Center, Image, useDisclose,
} from 'native-base';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { baseURL } from '../../../../api/base';
import { setUserImage } from '../../../../api/user';
import { SimplePhotoSelector } from '../../../../components';
import { setUser } from '../../../../store/slices/user';

interface IPhotoProps {
  isSameUser: boolean;
  photoUrl: string | null;
}
export function Photo({ isSameUser, photoUrl }: IPhotoProps) {
  const [photo, setPhoto] = React.useState<null | string>(photoUrl);
  const { isOpen, onOpen, onClose } = useDisclose();

  const uploadImage = async (photo: ImageInfo) => {
    setUserImage(photo.uri).then((res) => {
      setPhoto(res.image);
    });
  };

  return (
    <>
      <Center marginY={4}>
        <TouchableOpacity onPress={onOpen}>
          <Box p={0.5} bg="white" w={48} h={48} rounded="full">
            {photo ? (
              <Image
                rounded="full"
                source={{
                  uri: `${baseURL}/${photo}`,
                }}
                w="100%"
                h="100%"
                alt="profile photo"
                resizeMethod="resize"
              />
            ) : (
              <Center w="100%" h="100%">
                <Ionicons size={64} name="person-outline" />
              </Center>
            )}
          </Box>
        </TouchableOpacity>
      </Center>
      <SimplePhotoSelector
        isOpen={isOpen && isSameUser}
        onCancel={onClose}
        callback={uploadImage}
      />
    </>
  );
}
