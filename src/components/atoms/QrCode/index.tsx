import React from 'react';
import BaseQrCode from 'react-native-qrcode-svg';
import { Box } from '../Box';
import { Text } from '../Text';
import { Image } from '../Image';

export interface QrCodeProps {
  value: string;
  phoneNumber?: string;
  name?: string;
}

export const QrCode = ({ value, name, phoneNumber }: QrCodeProps) => {
  return (
    <Box
      width={'100%'}
      maxWidth={400}
      height={380}
      borderRadius={12}
      alignItems="center"
      justifyContent="center"
      overflow="hidden">
      <Box
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        alignItems="center"
        justifyContent="center">
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../../../assets/images/QrBackground.jpg')}
        />
      </Box>
      <Box
        alignItems="flex-start"
        width="100%"
        paddingHorizontal={6}
        paddingTop={0}
        paddingBottom={6}>
        {name && (
          <Text
            variant="linkLargeBold"
            color="white"
            textShadowOffset={{ height: 2, width: 0 }}
            textShadowColor="ash">
            {name}
          </Text>
        )}
        {phoneNumber && (
          <Text variant="linkMediumBold" color="white">
            {phoneNumber}
          </Text>
        )}
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
        borderRadius={12}
        width={250}
        height={250}
        padding={2}>
        <BaseQrCode
          size={200}
          value={value}
          color="#021964"
          backgroundColor="#ffffff"
          ecl="M"
          logo={require('../../../assets/icons/QrLogo.png')}
          logoSize={42}
        />
      </Box>
    </Box>
  );
};
