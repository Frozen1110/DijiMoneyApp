import { NavigationFunctionComponent } from 'react-native-navigation';
import React from 'react';
import { Box, SafeAreaView, Text, QrCode, ScrollView } from '../components';
import { backButton } from '../navigation/navigationButtons';
import { useGetMyBasicDetailsQuery } from '../graphql/generated';

interface Props {
  walletId: string;
}

export const QrScreen: NavigationFunctionComponent<Props> = ({ walletId }) => {
  const { data: myDetailsData } = useGetMyBasicDetailsQuery({});
  return (
    <SafeAreaView>
      <ScrollView>
        <Box paddingHorizontal={6}>
          <Box maxWidth={300} marginBottom={6}>
            <Text variant="displayLargeBold" marginBottom={4}>
              Receive money
            </Text>
            <Text variant="textXSmall" color="mediumGrey">
              Use the QR code below to receive money from anyone or provide your phone
              number.
            </Text>
          </Box>
          <Box alignItems="center">
            <QrCode
              value={`https://app.dijiapp.dev/send?wallet=${walletId}`}
              name={myDetailsData?.me?.name || undefined}
              // phoneNumber={myDetailsData?.me?.name || undefined}
            />
          </Box>
          <Box padding={6} />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

QrScreen.options = {
  topBar: {
    leftButtons: [backButton],
  },
  bottomTabs: {
    visible: false,
  },
};
