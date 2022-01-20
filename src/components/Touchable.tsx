import { useTheme } from 'native-base';
import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type TouchableProps = (TouchableOpacityProps & TouchableNativeFeedbackProps) & {
  children: JSX.Element[] | JSX.Element | React.ReactNode;
  android?: TouchableNativeFeedbackProps;
  ios?: TouchableOpacityProps;
  borderless?: boolean;
  rippleColor?: string;
};

export function Touchable({
  children,
  android,
  ios,
  borderless,
  rippleColor,
  ...props
}: TouchableProps) {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity {...props} {...ios}>
        {children}
      </TouchableOpacity>
    );
  }

  const color = useTheme().colors.gray['200'];

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(rippleColor || color, !!borderless)}
      {...props}
      {...android}
    >
      {children}
    </TouchableNativeFeedback>
  );
}
