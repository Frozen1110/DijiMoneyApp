import { NavigationFunctionComponent } from 'react-native-navigation';
import React, { useEffect } from 'react';
import { Box, SafeAreaView, WalletWidget } from '../components';
import { UserWelcome } from '../components/molecules/UserWelcome';
import {
  CurrencyCode,
  useGetMyBasicDetailsQuery,
  useGetMyWalletsQuery,
  useOpenWalletMutation,
} from '../graphql/generated';
import {
  useNavigation,
  useNavigationComponentDidAppear,
} from 'react-native-navigation-hooks/dist';
import { SCREENS } from '../navigation';

export const HomeScreen: NavigationFunctionComponent = () => {
  const { push } = useNavigation();
  const { data: myDetailsData } = useGetMyBasicDetailsQuery({});
  const {
    data: walletsData,
    loading: loadingWallets,
    refetch: refetchWallets,
  } = useGetMyWalletsQuery({});
  const [openWallet] = useOpenWalletMutation();
  const name = myDetailsData?.me?.name || undefined;
  const wallet = walletsData?.myWallets?.items?.[0] || null;
  useNavigationComponentDidAppear(() => {
    refetchWallets();
  });

  useEffect(() => {
    if (!loadingWallets && !wallet) {
      openWallet({ variables: { currency: CurrencyCode.Ugx } })
        .then(() => refetchWallets())
        .catch(console.error);
    }
  }, [refetchWallets, openWallet, loadingWallets, wallet]);

  const handleTopUpPress = async () => {
    if (wallet) {
      await push({
        component: {
          name: SCREENS.TOP_UP.name,
          passProps: { walletId: wallet.id },
        },
      });
    }
  };

  const handleReceivePress = async () => {
    if (wallet) {
      await push({
        component: {
          name: SCREENS.QR.name,
          passProps: { walletId: wallet.id },
        },
      });
    }
  };

  return (
    <SafeAreaView>
      <Box backgroundColor="background" flexGrow={1} padding={6}>
        <Box justifyContent="space-between">
          <UserWelcome name={name} />
          {wallet && (
            <WalletWidget
              currency={wallet.currency}
              balance={wallet.balance}
              onTopUpPress={handleTopUpPress}
              onReceivePress={handleReceivePress}
            />
          )}
        </Box>
        <Box padding={6} />
      </Box>
    </SafeAreaView>
  );
};

HomeScreen.options = {
  topBar: {
    visible: false,
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
    icon: require('../assets/icons/Home.png'),
  },
};
