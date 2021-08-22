import { Navigation, NavigationButtonPressedEvent } from 'react-native-navigation';
import { withNavigationProvider } from 'react-native-navigation-hooks';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {
  HomeScreen,
  LoginScreen,
  SettingsScreen,
  WelcomeScreen,
  LoginCodeScreen,
  TopUpScreen,
  QrScreen,
  InviteScreen,
} from '../screens';

import { getCurrentUser } from '../services/auth';
import theme, { withTheme } from '../styles/theme';
import { loginRoot } from './loginRoot';
import { mainRoot } from './mainRoot';
import backButton from '../assets/icons/BackArrow.png';
import { BACK_BUTTON_ID } from './navigationButtons';
import { RegisterScreen } from '../screens/RegisterScreen';
import { withApollo } from '../services/apollo';

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: theme.colors.background,
    style: 'dark',
  },
  topBar: {
    elevation: 0,
    borderColor: theme.colors.background,
    backButton: {
      visible: false,
      color: theme.colors.black,
      icon: backButton,
      enableMenu: false,
    },
    leftButtonColor: theme.colors.black,
    background: {
      color: theme.colors.background,
    },
  },
});

Navigation.events().registerNavigationButtonPressedListener(
  (event: NavigationButtonPressedEvent) => {
    if (event.buttonId === BACK_BUTTON_ID) {
      Navigation.pop(event.componentId);
    }
  },
);

export const SCREENS = {
  WELCOME: {
    name: 'Welcome',
    component: WelcomeScreen,
  },
  LOGIN: {
    name: 'Login',
    component: LoginScreen,
  },
  LOGIN_CODE: {
    name: 'LoginCode',
    component: LoginCodeScreen,
  },
  REGISTER: {
    name: 'Register',
    component: RegisterScreen,
  },
  HOME: {
    name: 'Home',
    component: HomeScreen,
  },
  SETTINGS: {
    name: 'Settings',
    component: SettingsScreen,
  },
  TOP_UP: {
    name: 'Add Money',
    component: TopUpScreen,
  },
  QR: {
    name: 'Request',
    component: QrScreen,
  },
  //Added by Frozen for invite screen
  INVITE: {
    name: 'Invite',
    component: InviteScreen
  }
};

export const registerNavigation = () => {
  Object.values(SCREENS).forEach(screen => {
    Navigation.registerComponent(screen.name, () =>
      withNavigationProvider(
        withApollo(withTheme(gestureHandlerRootHOC(screen.component as any))),
      ),
    );
  });

  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot((await getCurrentUser()) ? mainRoot : loginRoot);
  });
};
