import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { Center, useDisclose } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { setUserImage } from '~/api/user';
import { SimplePhotoSelector } from '~/components';
import { UserPhoto } from '~/components/UserPhoto';

interface IPhotoProps {
  isSameUser: boolean;
  photoUrl: string | null;
}
export function Photo({ isSameUser, photoUrl }: IPhotoProps) {
  const [photo, setPhoto] = React.useState<null | string>('');
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    setPhoto(photoUrl);
  }, [photoUrl]);

  const uploadImage = (photo: ImageInfo) => {
    setUserImage(photo.uri).then((res) => {
      setPhoto(res.image);
    });
  };

  return (
    <>
      <Center marginY={4}>
        <TouchableOpacity onPress={onOpen}>
          <UserPhoto url={photo} size={48} />
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
