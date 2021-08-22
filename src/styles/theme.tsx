import { createTheme, ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { createColorSelection, lavender, grey, ocean } from './colors';
import { textVariants } from './text';

const palette = {
  lavender,
  grey,
  ocean,
  primary: createColorSelection(lavender),
};

const theme = createTheme({
  palette: {
    primary: palette.primary,
  },
  colors: {
    transparent: 'transparent',
    white: palette.grey[50],
    black: palette.grey[900],
    background: palette.grey[100],
    body: palette.grey[700],
    ash: palette.grey[800],
    lightGrey: palette.grey[200],
    mediumGrey: palette.grey[500],
    input: palette.grey[400],
    inputDisabled: palette.grey[300],
    primary: palette.primary.default,
    primaryDark: palette.primary.dark,
    primaryButtonColor: palette.primary.default,

    //Colors added by Frozen
    highlightColor: palette.ocean[100],
    highlightTextColor: palette.ocean[500],
    buttonColor: palette.ocean[700],
    textGrayColor: palette.ocean[50],
    greyBackground: palette.ocean[100]
  },
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants,
});

export const withTheme = <P extends {}>(
  WrappedComponent: React.ComponentType<P> & Record<string, any>,
) => {
  const ThemeProviderContainer: React.ComponentType<P> & Record<string, any> = (
    props: P,
  ) => (
    <ThemeProvider theme={theme}>
      <WrappedComponent {...props} />
    </ThemeProvider>
  );

  Object.keys(WrappedComponent).forEach(key => {
    ThemeProviderContainer[key] = WrappedComponent[key];
  });
  return ThemeProviderContainer;
};

export type Theme = typeof theme;

export default theme;
