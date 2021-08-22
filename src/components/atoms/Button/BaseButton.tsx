import React, { ReactNode } from 'react';
import { Text, TextProps } from '../Text';
import { Box, BoxProps } from '../Box';
import { TouchableHighlight, TouchableHighlightProps } from '../TouchableHighlight';
import { WaveIndicator } from '../Indicator';
import { Theme } from '../../../styles/theme';
import { textVariants } from '../../../styles/text';

export interface BaseButtonProps extends TouchableHighlightProps {
  labelProps?: TextProps;
  containerProps?: BoxProps;
}

export interface ButtonProps {
  label?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  color?: keyof Theme['colors'];
}

export const BaseButton = ({
  label,
  labelProps,
  onPress,
  disabled,
  loading,
  containerProps,
  size = 'medium',
  ...touchableProps
}: BaseButtonProps & ButtonProps) => {
  const paddingHorizontal = size === 'large' ? 5 : size === 'small' ? 3 : 4;
  const paddingVertical = size === 'large' ? 3 : size === 'small' ? 1 : 2;
  const variant =
    size === 'large'
      ? 'linkLargeBold'
      : size === 'small'
      ? 'linkSmallBold'
      : 'linkMediumBold';

  return (
    <TouchableHighlight
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      {...touchableProps}
      onPress={!disabled ? onPress : undefined}>
      <Box flexDirection="row" {...containerProps}>
        {!loading && typeof label === 'string' && (
          <Text {...labelProps} variant={variant}>
            {label}
          </Text>
        )}
        {!loading && typeof label !== 'string' && label}
        {loading ? (
          <WaveIndicator
            color={labelProps?.color}
            size={12}
            width={48}
            height={textVariants[variant].lineHeight}
            count={4}
          />
        ) : null}
      </Box>
    </TouchableHighlight>
  );
};

BaseButton.defaultProps = {
  borderRadius: 10,
  overflow: 'hidden',
  flexDirection: 'row',
  justifyContent: 'center',
};
