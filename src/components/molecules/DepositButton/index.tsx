import React, { ReactNode } from 'react';
import { FastImageProps } from 'react-native-fast-image';
import { Box, Text, TouchableHighlight, Image } from '../..';

type Props = React.ComponentProps<typeof TouchableHighlight> & {
  label?: ReactNode;
  secondLabel?: ReactNode;
  icon?: FastImageProps['source'];
};

export const DepositButton = ({ label, secondLabel, icon, ...buttonProps }: Props) => {
  return (
    <TouchableHighlight {...buttonProps}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="lightGrey"
        paddingVertical={4}
        paddingHorizontal={6}>
        <Box flexDirection="row" alignItems="center">
          {icon && (
            <Box
              width={40}
              height={40}
              backgroundColor="input"
              borderRadius={30}
              marginRight={3}
              alignItems="center"
              justifyContent="center">
              <Image width={20} height={20} source={icon} />
            </Box>
          )}
          <Box flexDirection="column">
            {label && <Text variant="textXSmall">{label}</Text>}
            {secondLabel && (
              <Text variant="textXSmall" color="mediumGrey">
                {secondLabel}
              </Text>
            )}
          </Box>
        </Box>
        <Image
          width={20}
          height={20}
          source={require('../../../assets/icons/ChevronRight.png')}
        />
      </Box>
    </TouchableHighlight>
  );
};
