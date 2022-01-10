import React from "react";
import { Button as NButton, ButtonProps } from "react-native-elements";

export default function Button(props: ButtonProps) {
  const containerStyle: object = {
    ...styles.containerStyle[props.type || "solid"],
    ...((props.containerStyle as object) ?? {}),
  };

  const buttonStyle: object = {
    ...styles.buttonStyle[props.type || "solid"],
    ...((props.buttonStyle as object) ?? {}),
  };

  const titleStyle: object = {
    ...styles.titleStyle[props.type || "solid"],
    ...((props.titleStyle as object) ?? {}),
  };

  return (
    <NButton
      {...props}
      containerStyle={containerStyle}
      buttonStyle={buttonStyle}
      titleStyle={titleStyle}
    />
  );
}

const styles = {
  containerStyle: {
    solid: {
      width: "100%",
      borderRadius: 32,
    },
    clear: {},
    outline: {},
  },
  buttonStyle: {
    solid: {
      height: 48,
      width: "100%",
      backgroundColor: "#DF2266",
    },
    clear: {},
    outline: {},
  },
  titleStyle: {
    solid: {
      color: "#FFFFFF",
    },
    clear: {
      color: "#DF2266",
    },
    outline: {},
  },
};
