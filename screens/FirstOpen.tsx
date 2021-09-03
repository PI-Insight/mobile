import React from "react";
import { Text } from "react-native-elements";
import theme from "../theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../types";
import Button from "../components/Button";

export default function FirstOpen({ navigation }: ScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.primaryText} h1>
        INSIGHT
      </Text>
      <Text style={styles.secondaryText}>Mantra vem aqui</Text>
      <Button
        containerStyle={{ marginTop: 16, width: "90%" }}
        onPress={() => navigation.navigate("RegisterUser")}
        title='Cadastro'
      />
      <Text style={{ margin: 12, color: theme.colors.text.secondary }}>
        Já tem uma conta?
      </Text>
      <Button
        containerStyle={{ width: "90%" }}
        onPress={() => navigation.navigate("LoginUser")}
        title='Login'
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  primaryText: {
    color: theme.colors.text.primary,
  },
  secondaryText: {
    color: theme.colors.text.secondary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background.primary,
  },
});
