import { createBox } from '@shopify/restyle';
import { Theme } from '../../../styles/theme';

import FastImage, { FastImageProps } from 'react-native-fast-image';
export const Image = createBox<Theme, FastImageProps>(FastImage);
