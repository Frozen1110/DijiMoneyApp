import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  LayoutRectangle,
  ScaledSize,
  ActivityIndicator,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { Box } from '../../';

const { height: initialHeight } = Dimensions.get('window');
const { height: initialScreenHeight } = Dimensions.get('screen');

const handleRedirectUrl = (
  value: string,
  callback?: (s: string, r: string, i?: string) => void,
) => {
  const url = new URL(value);

  const status = url.searchParams.get('status');
  const txRef = url.searchParams.get('tx_ref');
  const txId = url.searchParams.get('transaction_id') || undefined;
  if (status && txRef) {
    callback?.(status, txRef, txId);
  }

  const resp = url.searchParams.get('resp');
  const decodedResp = resp && JSON.parse(decodeURIComponent(resp));
  if (decodedResp && decodedResp.data) {
    const { status: respStatus, txRef: respTxRef, id: respId } = decodedResp.data;
    if (respStatus && respTxRef) {
      callback?.(respStatus, respTxRef, respId || undefined);
    }
  }
};
interface CountrySelectModalProps {
  modalRef?: RefObject<Modalize>;
  depositUrl?: string;
  redirectUrl?: string;
  onComplete?: (status: string, ref: string, id?: string) => void;
}

export const DepositModal = ({
  modalRef,
  depositUrl,
  redirectUrl,
  onComplete,
}: CountrySelectModalProps) => {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [layoutHeight, setLayoutHeight] = useState(initialHeight);
  const height = layoutHeight;
  const [screenHeight, setScreenHeight] = useState(initialScreenHeight);
  const handledUrl = useRef<string>();

  const onScreenChange = ({ screen }: { screen: ScaledSize }) => {
    setScreenHeight(screen.height);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onScreenChange);
    return () => {
      Dimensions.removeEventListener('change', onScreenChange);
    };
  });

  const handleNavigationStateChange = useCallback(
    ({ url }: WebViewNavigation) => {
      webViewRef.current?.injectJavaScript(
        '(function() { document.body.style.padding = "0 24px"; })();',
      );

      if (redirectUrl && url.startsWith(redirectUrl)) {
        if (handledUrl.current !== url) {
          handledUrl.current = url;
          handleRedirectUrl(url, onComplete);
        }
      }
    },
    [redirectUrl, onComplete],
  );

  const handleLayout = ({ layout }: { layout: LayoutRectangle }) => {
    setLayoutHeight(layout.height);
  };

  return (
    <Modalize
      ref={modalRef}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      onLayout={handleLayout}
      modalTopOffset={screenHeight * 0.2}>
      <WebView
        ref={webViewRef}
        source={depositUrl ? { uri: depositUrl } : undefined}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        showsVerticalScrollIndicator={false}
        containerStyle={s.webview}
        style={{ height }}
      />
      {loading && (
        <Box
          zIndex={10}
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          borderTopLeftRadius={12}
          borderTopRightRadius={12}
          alignItems="center"
          justifyContent="center">
          <ActivityIndicator animating={true} color="grey" size="large" />
        </Box>
      )}
    </Modalize>
  );
};

const s = StyleSheet.create({
  webview: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 10,
  },
});
