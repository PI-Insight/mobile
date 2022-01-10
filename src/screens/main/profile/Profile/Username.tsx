import { Box, Heading, HStack, Input } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IUser, setDisplayname } from '~/api/user';
import { Touchable } from '~/components';

interface IUsernameProps {
  user: IUser;
  setUser: (user: IUser) => void;
  isSameUser: boolean;
}
export function Username({ isSameUser, user, setUser }: IUsernameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.displayname);
  const usernameRef = useRef<HTMLElement | null>(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (isEditing && name !== user.displayname) {
      setDisplayname(name)
        .then(() => {
          setUser({ ...user, displayname: name });
        })
        .catch((e) => {
          setName(user.displayname);
          Alert.alert('Erro', e.message);
        });
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
          textAlign="center"
          variant="unstyled"
          size="2xl"
          fontSize="3xl"
          fontWeight="bold"
          onChange={(e) => setName(e.nativeEvent.text)}
          defaultValue={name}
          editable={isEditing}
        />
        <Box justifyContent="center" flex={1}>
          <Touchable onPress={toggleEditing}>
            <Ionicons
              size={24}
              color="#000"
              name={isEditing ? 'checkmark-outline' : 'create-outline'}
            />
          </Touchable>
        </Box>
      </HStack>
    );
  }

  return <Heading textAlign="center">{user.displayname}</Heading>;
}
