import { Image, Keyboard } from 'react-native';
import React, { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from 'react-native-navigation-hooks';
import { Host } from 'react-native-portalize';
import { SCREENS } from '../navigation';
import { useAuth } from '../services/auth';
import {
  ButtonFilled,
  KeyboardAvoidingView,
  SafeAreaView,
  Box,
  Text,
  ScrollView,
  PhoneNumberInput,
  usePhoneNumberInput,
} from '../components';
import { backButton } from '../navigation/navigationButtons';
import { NavigationFunctionComponent } from 'react-native-navigation';

interface LoginScreenProps {
  initialPhoneRawValue?: string;
  initialCountryCode?: string;
  initialCountryCallingCode?: string;
}

export const LoginScreen: NavigationFunctionComponent<LoginScreenProps> = props => {
  const { push } = useNavigation();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    phoneNumber,
    phoneRawValue,
    countryCode,
    countryCallingCode,
    inputProps: phoneNumberInputProps,
  } = usePhoneNumberInput(props);

  const modalizeRef = useRef<Modalize>(null);

  const handleLogin = async () => {
    if (!phoneNumber) {
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    try {
      const user = await signIn(phoneNumber.format('E.164'));
      if (user.challengeName === 'CUSTOM_CHALLENGE') {
        push({
          component: {
            name: SCREENS.LOGIN_CODE.name,
            passProps: { user },
          },
        });
      } else {
        console.log(user);
      }
    } catch (ex) {
      if (ex.code === 'UserNotFoundException') {
        modalizeRef.current?.open();
      } else {
        console.error(ex);
      }
    }
    setLoading(false);
  };

  const showRegisterScreen = async () => {
    modalizeRef.current?.close();
    await push({
      component: {
        name: SCREENS.REGISTER.name,
        passProps: {
          initialCountryCode: countryCode,
          initialCountryCallingCode: countryCallingCode,
          initialPhoneRawValue: phoneRawValue,
        },
      },
    });
  };

  return (
    <Host>
      <SafeAreaView>
        <KeyboardAvoidingView>
          <ScrollView>
            <Box padding={6}>
              <Box maxWidth={340}>
                <Text marginBottom={6} variant="displayLargeBold">
                  Log In
                </Text>
                <Text marginBottom={3} variant="textXSmall">
                  Enter your registered phone number to log in
                </Text>
              </Box>
              <PhoneNumberInput {...phoneNumberInputProps} />
            </Box>
            <Box flexGrow={1} />
            <Box flexDirection="row" padding={6}>
              <ButtonFilled
                label="Login"
                onPress={handleLogin}
                loading={loading}
                flexGrow={1}
                disabled={!phoneNumber || !phoneNumber.isValid()}
              />
            </Box>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Modalize ref={modalizeRef} adjustToContentHeight={true}>
        <Box paddingTop={10} paddingBottom={8} paddingHorizontal={6}>
          <Box flex={1} alignItems="center" marginBottom={5}>
            <Image source={require('../assets/images/UserNotFound.png')} />
          </Box>
          <Text variant="linkMediumBold" textAlign="center" marginBottom={2}>
            Are you new here?
          </Text>
          <Text
            variant="textXSmall"
            textAlign="center"
            paddingHorizontal={3}
            marginBottom={5}>
            The number {phoneNumber?.formatNational()} does not exist or has not been
            registered on Diji. Let's setup a new account in an instant.
          </Text>
          <ButtonFilled label="Register" onPress={showRegisterScreen} />
        </Box>
      </Modalize>
    </Host>
  );
};

LoginScreen.options = {
  topBar: {
    leftButtons: [backButton],
  },
};
