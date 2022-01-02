import { Box, Button, VStack } from 'native-base';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../api/authentication';
import { ResponseError } from '../../api/base';
import { ControlledInput, Logo } from '~/components';
import { setUser } from '~/store/slices/user';

interface IFormValues {
  username: string;
  password: string;
}

export function LoginUser() {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState } = useForm<IFormValues>();
  const { isSubmitting } = formState;

  async function onSubmit(values: IFormValues) {
    try {
      const response = await login(values.username, values.password);
      dispatch(setUser({ ...response.user, token: response.token }));
    } catch (e: any) {
      const error = e as ResponseError;
      Alert.alert(error.status, error.message);
    }
  }

  return (
    <Box justifyContent="center" p={4} flex={1}>
      <VStack space={8}>
        <Logo />
        <VStack space={4}>
          <ControlledInput
            name="username"
            control={control}
            placeholder="Nome de usuário"
          />
          <ControlledInput
            name="password"
            control={control}
            placeholder="Senha"
            secureTextEntry
          />
          <Button rounded={32} h={12} isLoading={isSubmitting} onPress={handleSubmit(onSubmit)}>
            {isSubmitting ? '' : 'Entrar'}
          </Button>
          <Button  variant="link" onPress={() => {}}>
            Esqueceu sua senha?
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
