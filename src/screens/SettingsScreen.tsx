import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '../services/auth';
import { setRoot } from 'react-native-navigation-hooks/dist';
import { loginRoot } from '../navigation/loginRoot';
import theme from '../styles/theme';
import { ButtonFilled } from '../components';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { backButton } from '../navigation/navigationButtons';

export const SettingsScreen: NavigationFunctionComponent = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await setRoot(loginRoot);
    await signOut();
  };

  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
      <ButtonFilled label="Logout" onPress={handleLogout} />
    </View>
  );
};

SettingsScreen.options = {
  topBar: {
    visible: false,
    title: {
      text: 'Settings',
    },
    leftButtons: [backButton],
  },
  bottomTab: {
    text: 'Settings',
    icon: require('../assets/icons/Home.png'),
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
