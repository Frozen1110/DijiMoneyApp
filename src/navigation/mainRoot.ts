import { LayoutRoot } from 'react-native-navigation';
import { SCREENS } from '.';
import { FONT_POPPINS_MEDIUM } from '../styles/text';
import theme from '../styles/theme';

const bottomTabOptions = {
  textColor: theme.colors.body,
  iconColor: theme.colors.body,
  selectedIconColor: theme.colors.primary,
  selectedTextColor: theme.colors.primary,
  fontFamily: FONT_POPPINS_MEDIUM,
  fontSize: 11,
  selectedFontSize: 11,
};

export const mainRoot: LayoutRoot = {
  root: {
    bottomTabs: {
      id: 'MAIN_BOTTOM_TABS_LAYOUT',
      options: {
        bottomTabs: {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.background,
        },
        bottomTab: bottomTabOptions,
      },
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: SCREENS.HOME.name,
                  options: {
                    bottomTab: bottomTabOptions,
                  },
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: SCREENS.SETTINGS.name,
                  options: {
                    bottomTab: bottomTabOptions,
                  },
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: SCREENS.SETTINGS.name,
                  options: {
                    bottomTab: bottomTabOptions,
                  },
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: SCREENS.SETTINGS.name,
                  options: {
                    bottomTab: bottomTabOptions,
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
};
