import React from "react";
import { FormControl, IInputProps, Input, TextArea } from "native-base";
import { Control, FieldValues, useController } from "react-hook-form";

type NativeBaseInputProps = IInputProps & React.RefAttributes<unknown>;

interface IControlledInputProps extends NativeBaseInputProps {
  name: string;
  control: Control<any, object>;
  label?: string;
  helper?: string;
  error?: string;
}

export default function ControlledTextArea({
  control,
  name,
  label,
  helper,
  error,
  ...props
}: IControlledInputProps) {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <FormControl>
      {!!label && <FormControl.Label>{label}</FormControl.Label>}
      <TextArea {...props} value={field.value} onChangeText={field.onChange} />
      {!!helper && <FormControl.HelperText>{helper}</FormControl.HelperText>}
      {!!error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
}
