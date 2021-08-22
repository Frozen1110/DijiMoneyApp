import React, { useEffect, useState } from 'react';
import { createBox } from '@shopify/restyle';
import { ComponentProps, PropsWithChildren } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView as BaseKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Theme } from '../../../styles/theme';

export const BaseComponent = createBox<
  Theme,
  PropsWithChildren<KeyboardAvoidingViewProps>
>(BaseKeyboardAvoidingView);

export const KeyboardAvoidingView = (props: ComponentProps<typeof BaseComponent>) => {
  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);

  useEffect(() => {
    Navigation.constants().then(values => {
      setKeyboardVerticalOffset(values.topBarHeight + values.statusBarHeight);
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BaseComponent
        keyboardVerticalOffset={keyboardVerticalOffset}
        flex={1}
        flexDirection="column"
        justifyContent="center"
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        {...props}
      />
    </TouchableWithoutFeedback>
  );
};
