import React, { useCallback, useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Center,
  Heading,
  HStack,
  Spinner,
  useTheme,
  VStack,
  IconButton,
  Box,
  Text,
  Button,
  Flex,
  Stack,
  Image,
  useDisclose,
  Actionsheet,
  Input,
  View,
} from "native-base";
import { IRootParamList } from "../../navigation/main";
import useUser from "../../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IUser, setUserImage, setUsername } from "../../api/user";
import { setToken } from "../../store/slices/token";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { baseURL } from "../../api/base";
import { Alert, TouchableNativeFeedback } from "react-native";
import { Touchable } from "../../components/Touchable";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IHeaderProps {
  isSameUser: boolean;
}
function Header({ isSameUser }: IHeaderProps) {
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    Alert.alert(
      "Tem certeza que deseja sair?",
      "Para entrar no aplicativo novamente, terá que reinserir seus dados.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => dispatch(setToken("")),
        },
      ],
      {
        cancelable: true,
      }
    );
  }, [isSameUser]);

  return (
    <HStack>
      <Stack flex={1}>
        <Touchable borderless onPress={() => {}}>
          <Stack p={0.5} mr='auto' rounded='full'>
            <Ionicons size={32} color='#fff' name='settings-outline' />
          </Stack>
        </Touchable>
      </Stack>
      <Heading textAlign='center' flex={1} color='#fff'>
        Perfil
      </Heading>
      {isSameUser ? (
        <HStack alignItems='center' justifyContent='flex-end' flex={1}>
          <Touchable onPress={logout}>
            <Text color='#fff'>Logout</Text>
          </Touchable>
        </HStack>
      ) : (
        <Box flex={1} />
      )}
    </HStack>
  );
}

interface IPhotoProps {
  isSameUser: boolean;
  photoUrl: string | null;
}
function Photo({ isSameUser, photoUrl }: IPhotoProps) {
  const [photo, setPhoto] = React.useState<null | string>(photoUrl);
  const id = useSelector((state: RootState) => state.user.id) as number;
  const { isOpen, onOpen, onClose } = useDisclose();

  const uploadImage = useCallback(async (photo: ImageInfo) => {
    return await setUserImage(photo.uri);
  }, []);

  const takePhotoFromCamera = useCallback(async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }

    setPhoto(result.uri);
    uploadImage(result);
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
    uploadImage(result);
  }, []);

  return (
    <>
      <Center marginY={4}>
        <TouchableOpacity onPress={onOpen}>
          <Box p={0.5} bg='white' w={48} h={48} rounded='full'>
            {!!photo ? (
              <Image
                rounded='full'
                source={{
                  uri: photo,
                }}
                w='100%'
                h='100%'
                alt='profile photo'
              />
            ) : (
              <Center w='100%' h='100%'>
                <Ionicons size={64} name='person-outline' />
              </Center>
            )}
          </Box>
        </TouchableOpacity>
      </Center>
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

interface IUsernameProps {
  user: IUser;
  isSameUser: boolean;
}
function Username({ isSameUser, user }: IUsernameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.username);
  const usernameRef = useRef<HTMLElement | null>(null);
  const toggleEditing = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      setUsername(name);
    }
  };

  useEffect(() => {
    if (isEditing && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [isEditing]);

  if (isSameUser) {
    return (
      <HStack>
        <Box flex={1} />
        <Input
          ref={usernameRef}
          selectTextOnFocus
          textAlign='center'
          variant='unstyled'
          size='2xl'
          fontSize='3xl'
          fontWeight='bold'
          onChange={(e) => setName(e.nativeEvent.text)}
          defaultValue={name}
          editable={isEditing}
        />
        <Box justifyContent='center' flex={1}>
          <Touchable onPress={toggleEditing}>
            <Ionicons
              size={24}
              color='#000'
              name={isEditing ? "checkmark-outline" : "create-outline"}
            />
          </Touchable>
        </Box>
      </HStack>
    );
  }

  return <Heading textAlign='center'>{user.username}</Heading>;
}

export default function Profile({
  navigation,
  route,
}: NativeStackScreenProps<IRootParamList, "ProfilePage">) {
  const user = useUser(route.params.userId);
  const isSameUser = useSelector<RootState>(
    (state) => state.user.id === route.params.userId
  ) as boolean;
  const theme = useTheme();

  if (!user) {
    return (
      <Center safeArea flex={1}>
        <Spinner accessibilityLabel='Loading profile' />
      </Center>
    );
  }

  return (
    <VStack bg='primary.500' safeArea>
      <VStack paddingX={4}>
        <Header isSameUser={isSameUser} />
        <Photo
          photoUrl={user.image ? `${baseURL}/${user.image}` : user.image}
          isSameUser={isSameUser}
        />
      </VStack>
      <VStack bg='#fff' p={4}>
        <Username user={user} isSameUser={isSameUser} />
      </VStack>
    </VStack>
  );
}
