import React from 'react';
import { Box, Image, Text } from '../..';

interface Props {
  name?: string;
}

export const UserWelcome = ({ name }: Props) => {
  const firstName = name?.split(' ')[0];
  return (
    <Box flexDirection="row">
      <Image
        width={40}
        height={40}
        borderRadius={40}
        marginRight={3}
        source={{
          uri: `https://ui-avatars.com/api/?size=80&font-size=0.33&name=${encodeURIComponent(
            name || '',
          )}`,
        }}
      />
      <Box flexDirection="column">
        <Text>Hello</Text>
        <Text variant="linkMediumBold">{firstName}</Text>
      </Box>
    </Box>
  );
};
