import React from "react";
import { Input, Text } from "react-native-elements";
import theme from "../theme";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";

export default function RegisterUser() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Input
          containerStyle={{ marginTop: "auto" }}
          autoCompleteType='username'
          autoCapitalize='none'
          placeholder='Username'
        />
        <Input
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
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
          placeholder='Confirm password'
        />
      </View>
      <Button containerStyle={{ marginTop: "auto" }} title='Register' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: theme.colors.background.primary,
  },
});
