import React from 'react';
import { createBox } from '@shopify/restyle';
import { ComponentProps, PropsWithChildren } from 'react';
import { SafeAreaView as BaseSafeAreaView, ViewProps } from 'react-native';
import { Theme } from '../../../styles/theme';

const BaseComponent = createBox<Theme, PropsWithChildren<ViewProps>>(BaseSafeAreaView);

export const SafeAreaView = (props: ComponentProps<typeof BaseComponent>) => {
  return <BaseComponent backgroundColor="background" flex={1} {...props} />;
};
