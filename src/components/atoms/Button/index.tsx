import React from 'react';
import { BaseButton, ButtonProps } from './BaseButton';
import { BoxProps } from '../Box';
import theme from '../../../styles/theme';

export const ButtonFilled = (props: ButtonProps & BoxProps) => {
  const color = props.disabled ? 'inputDisabled' : props.color || 'primaryButtonColor';
  return (
    <BaseButton
      backgroundColor={color}
      underlayColor={theme.colors[color]}
      alignItems="center"
      labelProps={{
        color: 'white',
      }}
      {...props}
    />
  );
};

export const ButtonOutlined = (props: ButtonProps & BoxProps) => {
  const color = props.disabled ? 'inputDisabled' : props.color || 'primaryButtonColor';
  return (
    <BaseButton
      backgroundColor="transparent"
      underlayColor="transparent"
      borderWidth={1}
      borderColor={color}
      alignItems="center"
      labelProps={{
        color,
      }}
      {...props}
    />
  );
};

export const ButtonSubtle = (props: ButtonProps & BoxProps) => {
  const color = props.disabled ? 'inputDisabled' : props.color || 'primaryButtonColor';
  return (
    <BaseButton
      backgroundColor="transparent"
      underlayColor="transparent"
      alignItems="center"
      labelProps={{
        color,
      }}
      {...props}
    />
  );
};
