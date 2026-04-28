import React from "react";
import {
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { colors, radius, spacing } from "../constants/theme";
import { AppText } from "./AppText";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  containerStyle,
  inputStyle,
  placeholder,
  ...rest
}: InputProps) {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <AppText variant="subtitle" color={colors.textSecondary}>{label}</AppText> : null}
      <TextInput
        style={[
          styles.input,
          inputStyle,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        {...rest}
      />
      {error ? <AppText variant="caption" color={colors.expense}>{error}</AppText> : null}
    </View>
  );
}

const styles = {
  wrapper: {
    gap: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.expense,
  },
};
