import React from "react";
import { Text, TextStyle } from "react-native";
import { colors, typography } from "../constants/theme";

type AppTextVariant = "heading" | "title" | "subtitle" | "body" | "caption" | "button" | "amount";

interface AppTextProps {
  children: React.ReactNode;
  variant?: AppTextVariant;
  style?: TextStyle | TextStyle[];
  color?: string;
}

const variantStyles: Record<AppTextVariant, TextStyle> = {
  heading: typography.heading,
  title: typography.title,
  subtitle: typography.subtitle,
  body: typography.body,
  caption: typography.caption,
  button: typography.button,
  amount: typography.amount,
};

export function AppText({
  children,
  variant = "body",
  style,
  color = colors.text,
}: AppTextProps) {
  return (
    <Text style={[variantStyles[variant], { color }, style]}>
      {children}
    </Text>
  );
}
