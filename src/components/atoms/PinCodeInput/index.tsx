import { useTheme } from '@shopify/restyle';
import React, { ComponentProps, useState } from 'react';
import { TextInput, KeyboardTypeOptions } from 'react-native';
import { Theme } from '../../../styles/theme';
import { Box } from '../Box';

const inputCellLength = 1;

const getDigits = (inputCount: number, text: string) => {
  const digits = text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || [];
  return digits.slice(0, inputCount);
};

interface Props extends ComponentProps<typeof Box> {
  value: string;
  disabled?: boolean;
  inputCount: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export const PinCodeInput = (props: Props) => {
  const {
    inputCount,
    value,
    disabled,
    keyboardType = 'numeric',
    onChange,
    onComplete,
    ...viewProps
  } = props;

  const inputs: TextInput[] = [];
  const theme = useTheme<Theme>();
  const [focusedInput, setFocusedInput] = useState(-1);
  const digits = getDigits(inputCount, value);

  const basicValidation = (text: string) => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };

  const handleTextChange = (text: string, i: number) => {
    if (text && !basicValidation(text)) {
      return;
    }

    const cloned = [...digits];
    cloned[i] = text;

    const newValue = cloned.join('');
    onChange?.(newValue);

    if (newValue.length === inputCount && i === inputCount - 1) {
      onComplete?.(newValue);
    }

    if (text.length === inputCellLength && i !== inputCount - 1) {
      inputs[i + 1].focus();
    }
  };

  const handleInputFocus = (i: number) => {
    const prevIndex = i - 1;

    if (prevIndex > -1 && !digits[prevIndex] && !digits.join('')) {
      inputs[prevIndex].focus();
      return;
    }

    setFocusedInput(i);
  };

  const handleInputBlur = (_: number) => {
    setFocusedInput(-1);
  };

  const handleKeyPress = (e: any, i: number) => {
    const val = digits[i] || '';

    if (e.nativeEvent.key === 'Backspace' && i !== 0 && !val.length) {
      onChange?.([...digits.splice(0, i - 1)].join(''));
      inputs[i - 1].focus();
    }
  };

  const TextInputs = [];

  const baseInputStyle = {
    height: 50,
    width: 50,
    borderBottomWidth: 4,
    margin: 5,
    textAlign: 'center' as 'center',
    color: theme.colors.body,
  };

  for (let i = 0; i < inputCount; i += 1) {
    const inputStyle = {
      ...baseInputStyle,
      ...theme.textVariants.linkLargeBold,
      borderColor: theme.colors.input,
      ...(focusedInput === i && {
        borderColor: theme.colors.primary,
      }),
    };

    TextInputs.push(
      <TextInput
        ref={e => {
          if (e) {
            inputs[i] = e as TextInput;
          }
        }}
        key={i}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoFocus={false}
        value={digits[i] || ''}
        style={inputStyle}
        maxLength={inputCellLength}
        onFocus={() => handleInputFocus(i)}
        onBlur={() => handleInputBlur(i)}
        onChangeText={text => handleTextChange(text, i)}
        multiline={false}
        editable={!disabled}
        onKeyPress={e => handleKeyPress(e, i)}
        selectTextOnFocus={true}
      />,
    );
  }

  return (
    <Box flexDirection="row" justifyContent="space-between" {...viewProps}>
      {TextInputs}
    </Box>
  );
};
