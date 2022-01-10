import { FormControl, IInputProps, Input } from 'native-base';
import React from 'react';
import { Control, useController } from 'react-hook-form';

type NativeBaseInputProps = IInputProps & React.RefAttributes<unknown>;

export interface IControlledInputProps extends NativeBaseInputProps {
  name: string;
  control: Control<any, object>;
  label?: string;
  helper?: string;
  error?: string;
}

export function ControlledInput({
  control,
  name,
  label,
  helper,
  error,
  ...props
}: IControlledInputProps) {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <FormControl>
      {!!label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        w="100%"
        bg="#F6F6F6"
        fontSize={14}
        h={12}
        {...props}
        value={field.value}
        onChangeText={field.onChange}
      />
      {!!helper && <FormControl.HelperText>{helper}</FormControl.HelperText>}
      {!!error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
}
