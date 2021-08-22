import React, { useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useNavigation } from 'react-native-navigation-hooks/dist';
import {
  Box,
  SafeAreaView,
  Text,
  SimpleTextField,
  DepositButton,
  KeyboardAvoidingView,
  DepositModal,
  ScrollView,
} from '../components';
import {
  useDepositCardMutation,
  useDepositMobileMoneyMutation,
  useDepositStatusMutation,
} from '../graphql/generated';
import { backButton } from '../navigation/navigationButtons';

interface Props {
  walletId: string;
}

export const TopUpScreen: NavigationFunctionComponent<Props> = ({ walletId }) => {
  const [amountError, setAmountError] = useState<undefined | string>();
  const [amount, setAmount] = useState<undefined | number>();
  const [depositUrl, setDepositUrl] = useState<undefined | string>();
  const [redirectUrl, setRedirectUrl] = useState<undefined | string>();
  const [depositCard] = useDepositCardMutation();
  const [depositMobileMoney] = useDepositMobileMoneyMutation();
  const [depositStatus] = useDepositStatusMutation();
  const modalizeRef = useRef<Modalize>(null);
  const { pop } = useNavigation();

  const handleAmountChange = (value: string) => {
    setAmountError(undefined);
    setAmount(parseInt(value, 10) || 0);
  };

  const handleMobileMoneyDeposit = async () => {
    if (!amount) {
      setAmountError('Please enter a valid amount');
      return;
    }

    Keyboard.dismiss();

    modalizeRef?.current?.open();
    const result = await depositMobileMoney({
      variables: {
        amount,
        walletId,
      },
    });

    setDepositUrl(result.data?.depositMobileMoney?.proceedUrl);
    setRedirectUrl(result.data?.depositMobileMoney?.redirectUrl);
  };

  const handleCardDeposit = async () => {
    if (!amount) {
      setAmountError('Please enter a valid amount');
      return;
    }

    Keyboard.dismiss();

    modalizeRef?.current?.open();
    const result = await depositCard({
      variables: {
        amount,
        walletId,
      },
    });

    setDepositUrl(result.data?.depositCard?.proceedUrl);
    setRedirectUrl(result.data?.depositCard?.redirectUrl);
  };

  const handleDepositComplete = async (
    status: string,
    depositId: string,
    transactionId?: string,
  ) => {
    modalizeRef?.current?.close();
    if (status === 'successful' && transactionId) {
      const result = await depositStatus({
        variables: {
          depositId,
          transactionId,
        },
      });

      if (result.data?.depositStatus?.completed) {
        pop();
      }
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <Box paddingHorizontal={6} onStartShouldSetResponder={() => true}>
            <Box maxWidth={300}>
              <Text variant="displayLargeBold" marginBottom={4}>
                Add money
              </Text>
              <Text variant="textXSmall" marginBottom={4}>
                Enter an amount or use a preselected amount to top
              </Text>
            </Box>
            <Text variant="textXSmall" marginBottom={2}>
              Enter amount
            </Text>
            <SimpleTextField
              keyboardType="number-pad"
              error={amountError}
              value={amount?.toString()}
              onChangeText={handleAmountChange}
            />
            <Text variant="textXSmall" color="mediumGrey" marginTop={6}>
              Payment options
            </Text>
            <DepositButton
              label="Mobile money"
              secondLabel="Deposit using your phone"
              icon={require('../assets/icons/Hashtag-White.png')}
              marginTop={6}
              onPress={handleMobileMoneyDeposit}
            />
            <DepositButton
              label="Credit/Debit Card"
              secondLabel="Quick and secure top up"
              icon={require('../assets/icons/Card-White.png')}
              marginTop={6}
              onPress={handleCardDeposit}
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      <DepositModal
        modalRef={modalizeRef}
        depositUrl={depositUrl}
        redirectUrl={redirectUrl}
        onComplete={handleDepositComplete}
      />
    </SafeAreaView>
  );
};

TopUpScreen.options = {
  topBar: {
    leftButtons: [backButton],
  },
  bottomTabs: {
    visible: false,
  },
};
