import Amplify from 'aws-amplify';
import { registerNavigation } from './src/navigation';
import { AuthStorage } from './src/services/authStorage';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-UG');
}

Amplify.configure({
  Auth: {
    userPoolId: 'ap-southeast-2_H9Ghv9dg6',
    region: 'ap-southeast-2',
    userPoolWebClientId: '6i8oob4hcmrf7a9ck9mfesvtvg',
    storage: AuthStorage,
  },
});

registerNavigation();
