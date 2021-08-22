import React from 'react';
import { Box, Text, CurrencyFormatter } from '../../';
import { ButtonOutlined } from '../../atoms/Button';

interface Props {
  currency: string;
  balance: number;
  onTopUpPress?: () => void;
  onReceivePress?: () => void;
}

export const WalletWidget = ({
  currency,
  balance,
  onTopUpPress,
  onReceivePress,
}: Props) => {
  return (
    <Box padding={6} marginTop={6} borderRadius={8} backgroundColor="lightGrey">
      <Text variant="textXSmall" color="mediumGrey" marginBottom={1}>
        Current Balance
      </Text>
      <Text variant="displayMediumBold" color="primary" marginBottom={4}>
        <CurrencyFormatter currency={currency} value={balance} />
      </Text>
      <Box flexDirection="row">
        <ButtonOutlined label="Top Up" marginRight={2} onPress={onTopUpPress} />
        <ButtonOutlined label="Receive" marginRight={2} onPress={onReceivePress} />
        <ButtonOutlined label="Send" onPress={onReceivePress} />
      </Box>
    </Box>
  );
};
