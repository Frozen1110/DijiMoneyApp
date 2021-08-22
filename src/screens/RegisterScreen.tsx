import { Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Host } from 'react-native-portalize';
import { useNavigation } from 'react-native-navigation-hooks';
import { SCREENS } from '../navigation';
import { useAuth } from '../services/auth';
import {
  ButtonFilled,
  KeyboardAvoidingView,
  SafeAreaView,
  Box,
  Text,
  PhoneNumberInput,
  SimpleTextField,
  usePhoneNumberInput,
  ScrollView,
} from '../components';
import { backButton } from '../navigation/navigationButtons';
import { NavigationFunctionComponent } from 'react-native-navigation';

interface RegisterScreenProps {
  initialPhoneRawValue?: string;
  initialCountryCode?: string;
  initialCountryCallingCode?: string;
}

export const RegisterScreen: NavigationFunctionComponent<RegisterScreenProps> = props => {
  const { push } = useNavigation();
  const { signUp, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { phoneNumber, inputProps: phoneNumberInputProps } = usePhoneNumberInput(props);

  const handleEmailChange = (value: string) => {
    setEmail(value.trim().toLowerCase());
  };

  const formCompleted =
    phoneNumber && phoneNumber.isValid() && name !== '' && email !== '';

  const handleRegister = async () => {
    if (!formCompleted || !phoneNumber) {
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    try {
      const formattedPhoneNumber = phoneNumber.format('E.164');
      await signUp(formattedPhoneNumber, name, email);
      const user = await signIn(formattedPhoneNumber);
      push({
        component: {
          name: SCREENS.LOGIN_CODE.name,
          passProps: { user },
        },
      });
    } catch (ex) {
      console.error(ex);
    }
    setLoading(false);
  };

  return (
    <Host>
      <SafeAreaView>
        <KeyboardAvoidingView>
          <ScrollView>
            <Box padding={6} onStartShouldSetResponder={() => true}>
              <Box maxWidth={340}>
                <Text marginBottom={6} variant="displayLargeBold">
                  Register
                </Text>
                <Text marginBottom={5} variant="textXSmall">
                  Please fill in a few details below to create your Diji account
                </Text>
              </Box>
              <Box marginBottom={6}>
                <PhoneNumberInput {...phoneNumberInputProps} />
              </Box>
              <Box marginBottom={6}>
                <SimpleTextField
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                />
              </Box>
              <Box marginBottom={6}>
                <SimpleTextField
                  placeholder="Email"
                  value={email}
                  onChangeText={handleEmailChange}
                />
              </Box>
            </Box>
            <Box flexGrow={1} />
            <Box flexDirection="row" padding={6}>
              <ButtonFilled
                label="Register"
                onPress={handleRegister}
                loading={loading}
                flexGrow={1}
                disabled={!formCompleted}
              />
            </Box>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Host>
  );
};

RegisterScreen.options = {
  topBar: {
    leftButtons: [backButton],
  },
};
