import { ComponentProps, PropsWithChildren } from 'react';
import {
  TouchableHighlight as BaseComponent,
  TouchableHighlightProps as BaseProps,
} from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from '../../../styles/theme';

export const TouchableHighlight = createBox<Theme, PropsWithChildren<BaseProps>>(
  BaseComponent,
);

export type TouchableHighlightProps = ComponentProps<typeof TouchableHighlight>;
