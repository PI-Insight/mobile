import { FormControl, IInputProps, TextArea } from 'native-base';
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

export function ControlledTextArea({
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
      <TextArea bg="#F6F6F6" {...props} value={field.value} onChangeText={field.onChange} />
      {!!helper && <FormControl.HelperText>{helper}</FormControl.HelperText>}
      {!!error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
}
