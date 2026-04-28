import React from "react";
import { View, ViewStyle } from "react-native";
import { colors, radius, spacing } from "../constants/theme";
import { AppText } from "./AppText";
import { Transaction } from "../types/transaction";
import { Category } from "../types/category";
import { formatShortDate } from "../utils/formatters";

interface RecentTransactionItemProps {
  transaction: Transaction;
  category?: Category;
  style?: ViewStyle;
}

export function RecentTransactionItem({ transaction, category, style }: RecentTransactionItemProps) {
  const isIncome = transaction.type === "income";
  const amountColor = isIncome ? colors.secondary : colors.expense;
  const amountPrefix = isIncome ? "+" : "-";

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: `${category?.color ?? colors.border}15` }]}>
        <AppText variant="body">{category?.icon ?? (isIncome ? "💰" : "💸")}</AppText>
      </View>
      <View style={styles.info}>
        <AppText variant="subtitle">{transaction.title}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {category?.name ?? "Diğer"} • {formatShortDate(transaction.date)}
        </AppText>
      </View>
      <AppText variant="subtitle" color={amountColor}>
        {amountPrefix}{transaction.amount.toLocaleString("tr-TR")} ₺
      </AppText>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
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
