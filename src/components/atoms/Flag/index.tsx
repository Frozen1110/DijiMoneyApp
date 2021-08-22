import React from 'react';
import { createBox } from '@shopify/restyle';
import { Theme } from '../../../styles/theme';
import { Text } from '../Text';

// country code regex
const CC_REGEX = /^[a-z]{2}$/i;

// offset between uppercase ascii and regional indicator symbols
const MAGIC_NUMBER = 127462 - 65;

const countryCodeToEmoji = (code: string) => {
  if (!code || !CC_REGEX.test(code)) {
    return;
  }

  if (String && String.fromCodePoint) {
    return String.fromCodePoint(...[...code].map(c => MAGIC_NUMBER + c.charCodeAt(0)));
  }
};

export interface FlagProps {
  code: string;
  size?: number;
  lineHeight?: number;
}

const FlagComponent = ({ code, size = 24, lineHeight, ...restProps }: FlagProps) => {
  return (
    <Text fontSize={size} lineHeight={lineHeight} {...restProps}>
      {countryCodeToEmoji(code)}
    </Text>
  );
};

export const Flag = createBox<Theme, FlagProps>(FlagComponent);
