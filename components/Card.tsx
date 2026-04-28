import React from "react";
import { View, ViewStyle } from "react-native";
import { colors, radius, shadows } from "../constants/theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "elevated";
}

export function Card({ children, style, variant = "default" }: CardProps) {
  const shadow = variant === "elevated" ? shadows.md : shadows.sm;

  return (
    <View style={[styles.container, shadow, style]}>{children}</View>
  );
}

const styles = {
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 16,
  },
};
