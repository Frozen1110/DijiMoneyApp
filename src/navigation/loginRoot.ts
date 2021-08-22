import { LayoutRoot } from 'react-native-navigation';
import { SCREENS } from '.';

export const loginRoot: LayoutRoot = {
  root: {
    stack: {
      children: [
        {
          component: {
            name: SCREENS.WELCOME.name,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  },
};
