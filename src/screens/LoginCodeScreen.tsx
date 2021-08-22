import React, { useEffect, useState } from 'react';
import {
  ButtonFilled,
  PinCodeInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Box,
} from '../components';
import { useAuth, getCurrentUser } from '../services/auth';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { setRoot } from 'react-native-navigation-hooks';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { mainRoot } from '../navigation/mainRoot';
import { backButton } from '../navigation/navigationButtons';

interface Props {
  user: CognitoUser;
}

export const LoginCodeScreen: NavigationFunctionComponent<Props> = ({
  user: userProp,
}) => {
  const { answerChallenge } = useAuth();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<CognitoUser>(userProp);

  useEffect(() => {
    setUser(userProp);
  }, [userProp]);

  const handleSubmit = async (newCode?: string) => {
    setLoading(true);
    try {
      setUser(await answerChallenge(user, newCode || code));
      if (await getCurrentUser()) {
        setRoot(mainRoot);
      }
    } catch (ex) {
      console.error(ex);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <Box padding={6} onStartShouldSetResponder={() => true}>
            <Box width={240}>
              <Text marginBottom={6} variant="displayLargeBold">
                OTP
              </Text>
              <Text marginBottom={3} variant="textXSmall">
                Enter OTP code sent to your mobile phone to log in
              </Text>
            </Box>
            <Box flexDirection="row">
              <PinCodeInput
                disabled={loading}
                inputCount={6}
                value={code}
                onChange={setCode}
                onComplete={handleSubmit}
              />
            </Box>
          </Box>
          <Box flexGrow={1} />
          <Box flexDirection="row" padding={6}>
            <ButtonFilled
              disabled={code.length < 6}
              label="Submit"
              onPress={() => handleSubmit()}
              loading={loading}
              flexGrow={1}
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

LoginCodeScreen.options = {
  topBar: {
    leftButtons: [backButton],
  },
};
