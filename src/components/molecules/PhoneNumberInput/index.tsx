import parsePhoneNumber, { PhoneNumber } from 'libphonenumber-js';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { Box } from '../../atoms/Box';
import { SimpleTextField } from '../../atoms/SimpleTextField';
import { CountrySelectModal } from '../CountrySelectModal';
import { FlagButton } from '../FlagButton';

interface PhoneNumberInputProps {
  value: string;
  countryCode: string;
  countryCallingCode?: string;
  onValueChange?: (value: string) => void;
  onCountryChange?: (values: [string, string]) => void;
  onPhoneNumberChange?: (value?: PhoneNumber) => void;
}

export const PhoneNumberInput = ({
  value,
  countryCode,
  countryCallingCode,
  onValueChange,
  onCountryChange,
  onPhoneNumberChange,
}: PhoneNumberInputProps) => {
  const countryModalRef = useRef<Modalize>(null);

  const handlePhoneNumberChange = (newValue: string) => {
    onValueChange?.(newValue);
    const parsedPhoneNumber = parsePhoneNumber(newValue, countryCode as any);

    const newCountryCode = parsedPhoneNumber?.country;
    const newCountryCallingCode = parsedPhoneNumber?.countryCallingCode;

    if (
      newCountryCode &&
      newCountryCode !== countryCode &&
      newCountryCallingCode &&
      newCountryCallingCode !== countryCallingCode
    ) {
      onCountryChange?.([newCountryCode, newCountryCallingCode.toString()]);
    }

    onPhoneNumberChange?.(parsedPhoneNumber);
  };

  return (
    <>
      <Box flexDirection="row" alignItems="center">
        <FlagButton
          countryCode={countryCode}
          countryCallingCode={`+${countryCallingCode}`}
          onPress={() => {
            countryModalRef.current?.open();
          }}
        />
        <SimpleTextField
          value={value}
          onChangeText={handlePhoneNumberChange}
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Phone number"
        />
      </Box>
      <Portal>
        <CountrySelectModal
          modalRef={countryModalRef}
          onSelect={country => {
            onCountryChange?.([country.code, country.phone]);
          }}
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    marginLeft: 12,
  },
});

export interface PhoneNumberInputDefaultValues {
  initialPhoneRawValue?: string;
  initialCountryCode?: string;
  initialCountryCallingCode?: string;
}

export const usePhoneNumberInput = ({
  initialCountryCode,
  initialCountryCallingCode,
  initialPhoneRawValue,
}: PhoneNumberInputDefaultValues) => {
  const [phoneNumber, setPhoneNumber] = useState<undefined | PhoneNumber>();
  const [phoneRawValue, setPhoneRawValue] = useState('');
  const [countryCode, setCountryCode] = useState('UG');
  const [countryCallingCode, setCountryCallingCode] = useState('256');

  useEffect(() => {
    if (initialCountryCode && initialCountryCallingCode) {
      setCountryCode(initialCountryCode);
      setCountryCallingCode(initialCountryCallingCode);
    }
  }, [initialCountryCode, initialCountryCallingCode]);

  useEffect(() => {
    if (initialPhoneRawValue) {
      setPhoneRawValue(initialPhoneRawValue);
      const parsedPhoneNumber = parsePhoneNumber(
        initialPhoneRawValue,
        countryCode as any,
      );
      handlePhoneNumberChange(parsedPhoneNumber);
    }
  }, [initialPhoneRawValue, countryCode]);

  const handleCountryChange = ([newCountryCode, newCountryCallingCode]: string[]) => {
    setCountryCode(newCountryCode);
    setCountryCallingCode(newCountryCallingCode);
  };

  const handlePhoneNumberChange = (newNumber?: PhoneNumber) => {
    setPhoneNumber(newNumber && newNumber.isValid() ? newNumber : undefined);
  };

  return {
    inputProps: {
      value: phoneRawValue,
      onValueChange: setPhoneRawValue,
      onPhoneNumberChange: handlePhoneNumberChange,
      countryCode: countryCode,
      countryCallingCode: countryCallingCode,
      onCountryChange: handleCountryChange,
    },
    phoneNumber,
    phoneRawValue,
    countryCode,
    countryCallingCode,
  };
};
