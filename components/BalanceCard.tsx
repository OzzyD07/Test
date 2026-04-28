import React from "react";
import { View, ViewStyle } from "react-native";
import { colors, radius, spacing, shadows } from "../constants/theme";
import { AppText } from "./AppText";

interface BalanceCardProps {
  balance: number;
  label?: string;
  style?: ViewStyle;
}

export function BalanceCard({ balance, label = "Total Balance", style }: BalanceCardProps) {
  return (
    <View style={[styles.container, shadows.md, style]}>
      <AppText variant="caption" color="#FFFFFF99">
        {label}
      </AppText>
      <AppText
        variant="amount"
        color={balance >= 0 ? "#FFFFFF" : "#FFB4AB"}
        style={styles.amount}
      >
        {balance >= 0 ? "+" : ""}{balance.toLocaleString("tr-TR")} ₺
      </AppText>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  } as ViewStyle,
  amount: {
    marginTop: spacing.sm,
  } as ViewStyle,
};
