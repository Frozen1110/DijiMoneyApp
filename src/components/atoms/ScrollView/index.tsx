import React from 'react';
import { createBox } from '@shopify/restyle';
import { ComponentProps, PropsWithChildren } from 'react';
import { ScrollView as BaseScrollView, ScrollViewProps } from 'react-native';
import { Theme } from '../../../styles/theme';

const BaseComponent = createBox<Theme, PropsWithChildren<ScrollViewProps>>(
  BaseScrollView,
);

export const ScrollView = (props: ComponentProps<typeof BaseComponent>) => {
  return <BaseComponent backgroundColor="background" flex={1} {...props} />;
};
