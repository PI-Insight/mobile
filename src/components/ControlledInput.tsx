import React from "react";
import { IInputProps, Input } from "native-base";
import { Control, FieldValues, useController } from "react-hook-form";

type NativeBaseInputProps = IInputProps & React.RefAttributes<unknown>;

interface IControlledInputProps extends NativeBaseInputProps {
  name: string;
  control: Control<any, object>;
}

export default function ControlledInput({
  control,
  name,
  ...props
}: IControlledInputProps) {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return <Input {...props} value={field.value} onChangeText={field.onChange} />;
}
