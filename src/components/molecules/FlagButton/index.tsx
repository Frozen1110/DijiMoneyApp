import React, { ComponentProps } from 'react';
import { Box } from '../../atoms/Box';
import { ButtonOutlined } from '../../atoms/Button';
import { Flag } from '../../atoms/Flag';
import { Text } from '../../atoms/Text';

export interface FlagButtonProps extends ComponentProps<typeof ButtonOutlined> {
  countryCode: string;
  countryCallingCode?: string;
}

export const FlagButton = ({
  countryCode,
  countryCallingCode,
  ...restProps
}: FlagButtonProps) => {
  return (
    <ButtonOutlined
      {...restProps}
      paddingVertical={0}
      paddingHorizontal={1}
      color="ash"
      label={
        <Box flexDirection="row" alignItems="center" height={40}>
          <Box
            width={32}
            height={32}
            overflow="hidden"
            flexDirection="row"
            alignItems="center"
            justifyContent="center">
            <Flag code={countryCode} size={20} />
          </Box>
          {countryCallingCode && (
            <Text variant="textXSmall" fontWeight="normal" marginHorizontal={1}>
              {countryCallingCode}
            </Text>
          )}
        </Box>
      }
    />
  );
};
