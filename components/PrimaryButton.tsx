import React from "react";
import { Pressable, PressableProps, TextStyle, ViewStyle } from "react-native";
import { colors, radius, spacing } from "../constants/theme";
import { AppText } from "./AppText";

interface PrimaryButtonProps extends Omit<PressableProps, "children"> {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  textStyle,
  containerStyle,
  ...rest
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        containerStyle,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <AppText
        variant="button"
        color={disabled ? colors.textMuted : "#FFFFFF"}
        style={textStyle}
      >
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = {
  container: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  disabled: {
    backgroundColor: colors.borderDark,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
    opacity: 0.9,
  },
};
