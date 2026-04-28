import React from "react";
import { View, ViewStyle } from "react-native";
import { colors, radius, spacing, shadows } from "../constants/theme";
import { AppText } from "./AppText";
import { Category } from "../types/category";

interface CategorySpendingCardProps {
  category: Category;
  spent: number;
  maxTotal: number;
  style?: ViewStyle;
}

export function CategorySpendingCard({ category, spent, maxTotal, style }: CategorySpendingCardProps) {
  const percentage = maxTotal > 0 ? Math.min((spent / maxTotal) * 100, 100) : 0;

  return (
    <View style={[styles.container, shadows.sm, style]}>
      <View style={styles.header}>
        <AppText variant="body">{category.icon}</AppText>
        <AppText variant="subtitle">{category.name}</AppText>
        <AppText variant="subtitle" color={category.color}>
          {spent.toLocaleString("tr-TR")} ₺
        </AppText>
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: category.color }]} />
      </View>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  } as ViewStyle,
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  } as ViewStyle,
  barContainer: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: radius.full,
    overflow: "hidden",
  } as ViewStyle,
  bar: {
    height: "100%",
    borderRadius: radius.full,
  } as ViewStyle,
};
