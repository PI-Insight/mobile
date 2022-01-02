import React from 'react';
import { Box, Button, VStack } from 'native-base';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '~/api/authentication';
import { ResponseError } from '~/api/base';
import { ControlledInput, Logo } from '~/components';
import { setUser } from '~/store/slices/user';

interface IFormValues {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

export function RegisterUser() {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState } = useForm<IFormValues>();
  const { isSubmitting } = formState;

  async function onSubmit(values: IFormValues) {
    try {
      const response = await register(
        values.email,
        values.username,
        values.password,
      );

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
          <ControlledInput name="email" control={control} placeholder="Email" />
          <ControlledInput
            secureTextEntry
            name="password"
            control={control}
            placeholder="Senha"
          />
          <ControlledInput
            secureTextEntry
            name="confirmPassword"
            control={control}
            placeholder="Repetir Senha"
          />
          <Button rounded={32} h={12} isLoading={isSubmitting} onPress={handleSubmit(onSubmit)}>
            Cadastrar-se
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
