import { Box, Heading, HStack, Stack, Text } from 'native-base';
import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Touchable } from '~/components';
import { setUser } from '~/store/slices/user';

interface IHeaderProps {
  isSameUser: boolean;
}
export function Header({ isSameUser }: IHeaderProps) {
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    Alert.alert(
      'Tem certeza que deseja sair?',
      'Para entrar no aplicativo novamente, terá que reinserir seus dados.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => dispatch(setUser({ token: '' })),
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
        {/* <Touchable borderless onPress={() => {}}>
          <Stack p={0.5} mr="auto" rounded="full">
            <Ionicons size={32} color="#fff" name="settings-outline" />
          </Stack>
        </Touchable> */}
      </Stack>
      <Heading size="xl" textAlign="center" flex={1} color="#fff">
        Perfil
      </Heading>
      {isSameUser ? (
        <HStack alignItems="center" justifyContent="flex-end" flex={1}>
          <Touchable onPress={logout}>
            <Text color="#fff">Logout</Text>
          </Touchable>
        </HStack>
      ) : (
        <Box flex={1} />
      )}
    </HStack>
  );
}
