import React from "react";
import { View, ViewStyle } from "react-native";
import { colors, radius, spacing, shadows } from "../constants/theme";
import { AppText } from "./AppText";

interface SummaryCardProps {
  label: string;
  amount: number;
  color: string;
  icon: string;
  style?: ViewStyle;
}

export function SummaryCard({ label, amount, color, icon, style }: SummaryCardProps) {
  return (
    <View style={[styles.container, shadows.sm, style]}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <AppText variant="body">{icon}</AppText>
      </View>
      <View style={styles.info}>
        <AppText variant="caption" color={colors.textSecondary}>{label}</AppText>
        <AppText variant="title" color={color}>{amount.toLocaleString("tr-TR")} ₺</AppText>
      </View>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  } as ViewStyle,
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  info: {
    flex: 1,
    gap: 2,
  } as ViewStyle,
};
