import React from "react";
import { Input, Text } from "react-native-elements";
import theme from "../theme";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../types";
import Button from "../components/Button";

export default function LoginUser({ navigation }: ScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Input
          containerStyle={{ marginTop: "auto" }}
          autoCompleteType='email'
          autoCapitalize='none'
          placeholder='Email'
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
          placeholder='Password'
        />
      </View>
      <Button containerStyle={styles.button} title='Entrar' />
      <Button
        containerStyle={styles.forgetPassword}
        type='clear'
        title='Forgot your password?'
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: "auto",
  },
  forgetPassword: {
    marginTop: 8,
    marginBottom: 32,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: theme.colors.background.primary,
  },
});
