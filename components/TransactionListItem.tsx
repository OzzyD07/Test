import React from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { colors, radius, spacing } from "../constants/theme";
import { AppText } from "./AppText";
import { Transaction } from "../types/transaction";
import { Category } from "../types/category";
import { formatShortDate } from "../utils/formatters";

interface TransactionListItemProps {
  transaction: Transaction;
  category?: Category;
  onPress?: () => void;
  style?: ViewStyle;
}

export function TransactionListItem({
  transaction,
  category,
  onPress,
  style,
}: TransactionListItemProps) {
  const isIncome = transaction.type === "income";
  const amountColor = isIncome ? colors.secondary : colors.expense;
  const amountPrefix = isIncome ? "+" : "-";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        style,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${category?.color ?? colors.border}15` },
        ]}
      >
        <AppText variant="body">
          {category?.icon ?? (isIncome ? "💰" : "💸")}
        </AppText>
      </View>
      <View style={styles.info}>
        <AppText variant="subtitle">{transaction.title}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {category?.name ?? "Diğer"} • {formatShortDate(transaction.date)}
        </AppText>
      </View>
      <AppText variant="subtitle" color={amountColor}>
        {amountPrefix}
        {transaction.amount.toLocaleString("tr-TR")} ₺
      </AppText>
    </Pressable>
  );
}

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  } as ViewStyle,
  containerPressed: {
    backgroundColor: colors.border,
    opacity: 0.7,
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
