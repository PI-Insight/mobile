import React from "react";
import { ScreenProps } from "../../types";
import { Center, Text, Button } from "native-base";

export default function FirstOpen({ navigation }: ScreenProps) {
  return (
    <Center p={8} bg='white' safeArea flex={1}>
      <Text color='black' fontSize='5xl' bold>
        INSIGHT
      </Text>
      <Text mb={8} color='gray.800' fontSize='md'>
        Mantra vem aqui
      </Text>
      <Button
        h='48px'
        mb={2}
        rounded={24}
        w='100%'
        onPress={() => navigation.navigate("RegisterUser")}
        bg='primary.500'
      >
        Cadastro
      </Button>
      <Text mb={2} color='gray.500'>
        Já tem uma conta?
      </Text>
      <Button
        h='48px'
        rounded={24}
        w='100%'
        onPress={() => navigation.navigate("LoginUser")}
        bg='primary.500'
      >
        Login
      </Button>
    </Center>
  );
}
