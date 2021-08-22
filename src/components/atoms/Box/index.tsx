import { createBox } from '@shopify/restyle';
import { ComponentProps } from 'react';
import { Animated } from 'react-native';
import { Theme } from '../../../styles/theme';

export const Box = createBox<Theme>();

export type BoxProps = ComponentProps<typeof Box>;

export const AnimatedBox = Animated.createAnimatedComponent(Box);

export type AnimatedBoxProps = ComponentProps<typeof AnimatedBox>;
