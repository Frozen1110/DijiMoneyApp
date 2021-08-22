import { Image } from 'react-native';
import React from 'react';
import { useNavigation } from 'react-native-navigation-hooks';
import { SCREENS } from '../navigation';
import { ButtonFilled, SafeAreaView, Box, Text, ScrollView } from '../components';

export const WelcomeScreen = () => {
  const { push } = useNavigation();
  const showLogin = () => {
    push({
      component: {
        name: SCREENS.INVITE.name,
      },
    });
  };

  const showRegister = () => {
    push({
      component: {
        name: SCREENS.REGISTER.name,
      },
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Box flex={1} justifyContent="space-between" padding={6}>
          <Box flexDirection="column" marginTop={3}>
            <Image source={require('../assets/images/Logo.png')} />
            <Box height={10} />
            <Image source={require('../assets/images/Welcome.png')} />
          </Box>
          <Box flexDirection="column">
            <Text variant="displaySmallBold" marginBottom={3}>
              Welcome to Diji
            </Text>
            <Text variant="textXSmall" marginBottom={5}>
              The digital wallet to simplify your payments and reward you for spending.
              Register now and do not miss out!
            </Text>
            <Box flexDirection="row" justifyContent="space-between" marginBottom={4}>
              <ButtonFilled
                label="Login"
                flexGrow={1}
                marginRight={4}
                onPress={showLogin}
              />
              <ButtonFilled label="Register" flexGrow={1} onPress={showRegister} />
            </Box>
            <Text variant="textSmall" fontSize={12} lineHeight={20}>
              By logging in or registering, you agree to our Terms of Service and Privacy
              Policy
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
