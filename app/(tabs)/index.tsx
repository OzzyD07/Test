import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing } from "../../constants/theme";
import { Screen } from "../../components/Screen";
import { AppText } from "../../components/AppText";
import { Card } from "../../components/Card";

export default function DashboardScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        <AppText variant="heading">Dashboard</AppText>

        <View style={styles.cards}>
          <Card variant="elevated">
            <AppText variant="caption" color={colors.textMuted}>Balance</AppText>
            <AppText variant="amount" color={colors.primary}>-</AppText>
          </Card>
          <Card variant="elevated">
            <AppText variant="caption" color={colors.textMuted}>Income</AppText>
            <AppText variant="amount" color={colors.secondary}>-</AppText>
          </Card>
          <Card variant="elevated">
            <AppText variant="caption" color={colors.textMuted}>Expense</AppText>
            <AppText variant="amount" color={colors.expense}>-</AppText>
          </Card>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: spacing.lg,
    gap: spacing.xl,
  },
  cards: {
    gap: spacing.md,
  },
});
