import { VStack, Button, HStack, Center, Text } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../api/authentication";
import ControlledInput from "../../components/ControlledInput";
import { setToken } from "../../store/slices/token";
import { setUser } from "../../store/slices/user";
import { ScreenProps } from "../../types";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ResponseError } from "../../api/base";

interface IFormValues {
  username: string;
  password: string;
}

export default function LoginUser({ navigation }: ScreenProps) {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState } = useForm<IFormValues>();
  const { isSubmitting } = formState;

  async function onSubmit(values: IFormValues) {
    try {
      const response = await login(values.username, values.password);

      dispatch(setUser(response.user));
      dispatch(setToken(response.token));
    } catch (e: any) {
      const error = e as ResponseError;
      Alert.alert(error.status, error.message);
    }
  }

  return (
    <VStack bg='#FFFFFF' p={4} flex={1}>
      <HStack w='100%' h={24}>
        <Center h='100%'>
          <Ionicons
            color='#BDBDBD'
            onPress={() => navigation.goBack()}
            name='close'
            size={24}
          />
        </Center>
        <Center h={24} position='absolute' w='100%'>
          <Text bold fontSize={32} color='black'>
            Login
          </Text>
        </Center>
      </HStack>

      <VStack pb={4} w='100%'>
        <ControlledInput
          name='username'
          control={control}
          bg='#F6F6F6'
          w='100%'
          placeholder='Username'
        />
      </VStack>
      <VStack w='100%'>
        <ControlledInput
          name='password'
          control={control}
          bg='#F6F6F6'
          w='100%'
          placeholder='Senha'
          secureTextEntry
        />
      </VStack>

      <Button
        isLoading={isSubmitting}
        mt='auto'
        onPress={handleSubmit(onSubmit)}
      >
        {isSubmitting ? "" : "Entrar"}
      </Button>
      <Button mt={2} variant='link' onPress={() => {}}>
        Esqueceu sua senha?
      </Button>
    </VStack>
  );
}
