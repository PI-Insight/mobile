import { VStack, Button, HStack, Center, Text } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { register } from "../../api/authentication";
import { ResponseError } from "../../api/base";
import ControlledInput from "../../components/ControlledInput";
import { setToken } from "../../store/slices/token";
import { setUser } from "../../store/slices/user";
import { ScreenProps } from "../../types";

interface IFormValues {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

export default function RegisterUser({ navigation }: ScreenProps) {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState } = useForm<IFormValues>();
  const { isSubmitting } = formState;

  async function onSubmit(values: IFormValues) {
    try {
      const response = await register(
        values.email,
        values.username,
        values.password
      );

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
        <Center flex={1}>
          <Text bold fontSize={32} color='black'>
            Cadastro
          </Text>
        </Center>
        <Center h='100%'>
          <Text
            onPress={() => navigation.navigate("LoginUser")}
            fontSize={16}
            color='primary.500'
          >
            Login
          </Text>
        </Center>
      </HStack>

      <VStack mb={4} w='100%'>
        <ControlledInput
          name='username'
          control={control}
          bg='#F6F6F6'
          w='100%'
          placeholder='Nome de usuário'
        />
      </VStack>
      <VStack mb={4} w='100%'>
        <ControlledInput
          name='email'
          control={control}
          bg='#F6F6F6'
          w='100%'
          placeholder='Email'
        />
      </VStack>
      <VStack mb={4} w='100%'>
        <ControlledInput
          secureTextEntry
          name='password'
          control={control}
          bg='#F6F6F6'
          w='100%'
          placeholder='Senha'
        />
      </VStack>
      <VStack w='100%'>
        <ControlledInput
          secureTextEntry
          name='confirmPassword'
          control={control}
          bg='#F6F6F6'
          w='100%'
          placeholder='Repetir Senha'
        />
      </VStack>

      <Button
        isLoading={isSubmitting}
        mt='auto'
        onPress={handleSubmit(onSubmit)}
      >
        Cadastrar-se
      </Button>
    </VStack>
  );
}
