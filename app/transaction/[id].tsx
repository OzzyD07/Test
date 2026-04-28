import React from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { colors, radius, spacing } from "../../constants/theme";
import { Screen } from "../../components/Screen";
import { AppText } from "../../components/AppText";
import { Card } from "../../components/Card";
import { mockTransactions } from "../../data/mockTransactions";
import { mockCategories } from "../../data/mockCategories";
import { findTransactionById } from "../../utils/transactionHelpers";
import { formatDate } from "../../utils/formatters";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const transaction = findTransactionById(mockTransactions, String(id));
  const category = transaction
    ? mockCategories.find((c) => c.id === transaction.categoryId)
    : undefined;

  const isIncome = transaction?.type === "income";
  const amountColor = isIncome ? colors.secondary : colors.expense;
  const amountPrefix = isIncome ? "+" : "-";

  if (!transaction) {
    return (
      <Screen safe={false}>
        <View
          style={[
            styles.emptyContainer,
            { paddingTop: insets.top + spacing.xxl },
          ]}
        >
          <Animated.View entering={FadeIn.duration(400)}>
            <AppText variant="heading" color={colors.textSecondary}>
              Transaction Not Found
            </AppText>
            <AppText
              variant="body"
              color={colors.textMuted}
              style={styles.emptyText}
            >
              The transaction you are looking for does not exist or has been removed.
            </AppText>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <AppText variant="button" color={colors.surface}>
                Go Back
              </AppText>
            </Pressable>
          </Animated.View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen safe={false}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.md, paddingBottom: spacing.xxl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(500)}>
          <View style={styles.amountCard}>
            <View style={styles.amountHeader}>
              <AppText variant="caption" color="#FFFFFF99">
                {isIncome ? "Income" : "Expense"}
              </AppText>
              {category ? (
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: `${category.color}40` },
                  ]}
                >
                  <AppText variant="caption" color={category.color}>
                    {category.icon} {category.name}
                  </AppText>
                </View>
              ) : null}
            </View>
            <AppText
              variant="amount"
              color={amountColor}
              style={styles.amount}
            >
              {amountPrefix}
              {transaction.amount.toLocaleString("tr-TR")} ₺
            </AppText>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(150)}>
          <View style={styles.detailsSection}>
            <AppText variant="title" style={styles.sectionLabel}>
              Details
            </AppText>
            <Card variant="elevated" style={styles.detailsCard}>
              <DetailViewRow label="Title" value={transaction.title} />
              <DetailViewRow
                label="Type"
                value={isIncome ? "Income" : "Expense"}
                valueColor={amountColor}
              />
              {category && (
                <DetailViewRow
                  label="Category"
                  value={`${category.icon} ${category.name}`}
                />
              )}
              <DetailViewRow
                label="Date"
                value={formatDate(transaction.date)}
              />
              {transaction.description && (
                <DetailViewRow
                  label="Description"
                  value={transaction.description}
                />
              )}
              <DetailViewRow label="Transaction ID" value={transaction.id} muted />
            </Card>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Pressable style={styles.backButtonFull} onPress={() => router.back()}>
            <AppText variant="button" color={colors.primary}>
              ← Back to Transactions
            </AppText>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </Screen>
  );
}

function DetailViewRow({
  label,
  value,
  valueColor,
  muted,
}: {
  label: string;
  value: string;
  valueColor?: string;
  muted?: boolean;
}) {
  return (
    <View style={styles.detailRow}>
      <AppText variant="caption" color={colors.textSecondary}>
        {label}
      </AppText>
      <AppText
        variant="body"
        color={
          valueColor ?? (muted ? colors.textMuted : colors.text)
        }
      >
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    textAlign: "center",
    marginVertical: spacing.lg,
  },
  backButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
  },
  amountCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  amountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  amount: {
    fontSize: 36,
  },
  detailsSection: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    marginBottom: spacing.md,
  },
  detailsCard: {
    gap: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButtonFull: {
    alignItems: "center",
    paddingVertical: spacing.md,
  },
});
