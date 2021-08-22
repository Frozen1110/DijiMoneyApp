import { useTheme } from '@shopify/restyle';
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  // @ts-ignore
  LogBox,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { Theme } from '../../../styles/theme';
import { Text } from '../Text';

export interface SimpleTextFieldMethods {
  /**
   * Requests focus for the given input or view. The exact behavior triggered will depend on the platform and type of view.
   */
  focus: () => void;
  /**
   * Removes focus from an input or view. This is the opposite of focus()
   */
  blur: () => void;
  /**
   * Returns current focus of input.
   */
  isFocused: Boolean;
  /**
   * Removes all text from the TextInput.
   */
  clear: () => void;
}

export interface SimpleTextFieldProps extends TextInputProps {
  placeholder?: string;
  error?: string;
  trailingIcon?: React.FC;
  characterCount?: number;
  assistiveText?: string;
  grow?: boolean;
}

const SimpleTextFieldComponent = forwardRef<SimpleTextFieldMethods, SimpleTextFieldProps>(
  (props, ref) => {
    const theme = useTheme<Theme>();
    const {
      error,
      assistiveText,
      characterCount,
      placeholder,
      trailingIcon,
      style,
      value: _providedValue = '',
      onChangeText,
      grow = false,
      ...inputProps
    } = props;

    const inactiveColor = theme.colors.input;
    const activeColor = theme.colors.primary;
    const errorColor = 'red';
    const paddingHorizontal = theme.spacing[2];
    const paddingVertical = theme.spacing[2];

    const [value, setValue] = useState(_providedValue);

    // animation vars
    const inputRef = useRef<TextInput>(null);
    const placeholderMap = useSharedValue(_providedValue ? 1 : 0);
    const placeholderSize = useSharedValue(0);
    const colorMap = useSharedValue(0);

    // helper functions
    const focus = () => inputRef.current?.focus();
    const blur = () => inputRef.current?.blur();
    const isFocused = () => Boolean(inputRef.current?.isFocused());
    const clear = () => {
      Boolean(inputRef.current?.clear());
      setValue('');
    };

    const errorState = useCallback(() => error !== null && error !== undefined, [error]);

    const handleFocus = () => {
      placeholderMap.value = withTiming(1); // focused
      if (!errorState()) {
        colorMap.value = withTiming(1);
      } // active
      focus();
    };

    const handleBlur = () => {
      if (!value) {
        placeholderMap.value = withTiming(0);
      } // blur
      if (!errorState()) {
        colorMap.value = withTiming(0);
      } // inactive
      blur();
    };

    const handleChangeText = (text: string) => {
      onChangeText && onChangeText(text);
      setValue(text);
    };

    const handlePlaceholderLayout = useCallback(
      ({ nativeEvent }) => {
        const { width } = nativeEvent.layout;
        placeholderSize.value = width;
      },
      [placeholderSize],
    );

    const renderTrailingIcon = useCallback(() => {
      if (trailingIcon) {
        return trailingIcon({});
      }
      return null;
    }, [trailingIcon]);

    // handle value update
    useEffect(() => {
      if (_providedValue.length) {
        placeholderMap.value = withTiming(1);
      } // focused;
      setValue(_providedValue);
    }, [_providedValue, placeholderMap]);

    // error handling
    useEffect(() => {
      if (errorState()) {
        colorMap.value = 2; // error -- no animation here, snap to color immediately
      } else {
        colorMap.value = isFocused() ? 1 : 0; // to active or inactive color if focused
      }
    }, [error, colorMap, errorState]);

    const animatedPlaceholderStyles = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            placeholderMap.value,
            [0, 1],
            [0, -(paddingVertical + theme.textVariants.inputText.fontSize * 0.7)],
          ),
        },
        {
          scale: interpolate(placeholderMap.value, [0, 1], [1, 0.7]),
        },
        {
          translateX: interpolate(
            placeholderMap.value,
            [0, 1],
            [0, -placeholderSize.value * 0.2],
          ),
        },
      ],
    }));

    const animatedPlaceholderTextStyles = useAnimatedStyle(() => ({
      color: interpolateColor(
        colorMap.value,
        [0, 1, 2],
        [inactiveColor, activeColor, errorColor],
      ),
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
      borderColor:
        placeholderSize.value > 0
          ? interpolateColor(
              colorMap.value,
              [0, 1, 2],
              [inactiveColor, activeColor, errorColor],
            )
          : inactiveColor,
    }));

    useImperativeHandle(ref, () => ({
      focus: handleFocus,
      blur: handleBlur,
      isFocused: isFocused(),
      clear: clear,
    }));

    const styles = StyleSheet.create({
      container: {
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: theme.spacing[10],
        flexGrow: grow ? 1 : undefined,
      },
      inputContainer: {
        paddingVertical,
        paddingRight: paddingHorizontal,
        paddingBottom: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      input: {
        flex: 1,
        color: theme.colors.body,
        padding: 0,
        margin: 0,
        ...theme.textVariants.inputText,
      },
      placeholder: {
        position: 'absolute',
        top: paddingVertical,
      },
      placeholderText: {
        ...theme.textVariants.inputText,
      },
      trailingIcon: {
        position: 'absolute',
        right: paddingHorizontal,
        alignSelf: 'center',
      },
      errorText: {
        color: errorColor,
        left: 0,
      },
      counterText: {
        color: errorState() ? errorColor : theme.colors.input,
        right: 0,
      },
      assistiveText: {
        color: theme.colors.body,
        left: 0,
      },
      helpText: {
        position: 'absolute',
        ...theme.textVariants.inputHelpText,
        bottom: -theme.textVariants.inputHelpText.fontSize - theme.spacing[2],
      },
    });

    const placeholderStyle = useMemo(() => {
      return [styles.placeholder, animatedPlaceholderStyles];
    }, [styles.placeholder, animatedPlaceholderStyles]);

    return (
      <Animated.View style={[styles.container, animatedContainerStyle, style]}>
        <TouchableWithoutFeedback onPress={handleFocus}>
          <View style={styles.inputContainer}>
            <TextInput
              {...inputProps}
              ref={inputRef}
              style={styles.input}
              pointerEvents="none"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={handleChangeText}
              maxLength={characterCount ? characterCount : undefined}
              selectionColor={errorState() ? errorColor : activeColor}
              placeholder=""
              value={value}
            />
          </View>
        </TouchableWithoutFeedback>
        {trailingIcon && <View style={styles.trailingIcon}>{renderTrailingIcon()}</View>}
        <Animated.View
          style={placeholderStyle}
          onLayout={handlePlaceholderLayout}
          pointerEvents="none">
          <Animated.Text style={[styles.placeholderText, animatedPlaceholderTextStyles]}>
            {placeholder}
          </Animated.Text>
        </Animated.View>
        {characterCount && (
          <Text
            style={[
              styles.helpText,
              styles.counterText,
            ]}>{`${value.length} / ${characterCount}`}</Text>
        )}
        {errorState() ? (
          <Text style={[styles.helpText, styles.errorText]}>{error}</Text>
        ) : (
          assistiveText && (
            <Text style={[styles.helpText, styles.assistiveText]}>{assistiveText}</Text>
          )
        )}
      </Animated.View>
    );
  },
);

const SimpleTextField = SimpleTextFieldComponent;
export { SimpleTextField };

// color issue
LogBox.ignoreLogs(['You are setting the style `{ color: ... }` as a prop.']);
