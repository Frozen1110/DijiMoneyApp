export * from './lavender';
export * from './grey';
export * from './ocean';

export type ColorType = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type ColorSelection = {
  default: string;
  background: string;
  light: string;
  dark: string;
  darkMode: string;
};

export const createColorSelection = (color: ColorType) => {
  const selection: ColorSelection = {
    background: color[50],
    light: color[100],
    default: color[500],
    dark: color[800],
    darkMode: color[200],
  };
  return selection;
};
