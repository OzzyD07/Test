import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { colors, spacing } from "../../constants/theme";
import { Screen } from "../../components/Screen";
import { AppText } from "../../components/AppText";
import { BalanceCard } from "../../components/BalanceCard";
import { SummaryCard } from "../../components/SummaryCard";
import { CategorySpendingCard } from "../../components/CategorySpendingCard";
import { RecentTransactionItem } from "../../components/RecentTransactionItem";
import { mockTransactions } from "../../data/mockTransactions";
import { mockCategories } from "../../data/mockCategories";
import {
  getTransactionSummary,
  getCategoryTotal,
} from "../../utils/transactionHelpers";

const RECENT_LIMIT = 5;

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const summary = getTransactionSummary(mockTransactions);
  const sortedTransactions = [...mockTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recentTransactions = sortedTransactions.slice(0, RECENT_LIMIT);
  const expenseCategories = mockCategories.filter((c) => c.type === "expense");
  const maxExpenseTotal = summary.totalExpense;

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
        <Animated.View entering={FadeIn.duration(400)}>
          <AppText variant="heading" style={styles.greeting}>
            Dashboard
          </AppText>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <BalanceCard balance={summary.balance} style={styles.card} />
        </Animated.View>

        <View style={styles.summaryRow}>
          <Animated.View
            entering={FadeInDown.duration(500).delay(200)}
            style={styles.summaryItem}
          >
            <SummaryCard
              label="Income"
              amount={summary.totalIncome}
              color={colors.secondary}
              icon="📈"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(500).delay(300)}
            style={styles.summaryItem}
          >
            <SummaryCard
              label="Expense"
              amount={summary.totalExpense}
              color={colors.expense}
              icon="📉"
            />
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <View style={styles.section}>
            <AppText variant="title" style={styles.sectionTitle}>
              Category Spending
            </AppText>
            <View style={styles.categoryList}>
              {expenseCategories.map((cat) => (
                <CategorySpendingCard
                  key={cat.id}
                  category={cat}
                  spent={getCategoryTotal(mockTransactions, cat.id)}
                  maxTotal={maxExpenseTotal}
                />
              ))}
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(500)}>
          <View style={styles.section}>
            <AppText variant="title" style={styles.sectionTitle}>
              Recent Transactions
            </AppText>
            <View style={styles.transactionList}>
              {recentTransactions.map((tx) => (
                <RecentTransactionItem
                  key={tx.id}
                  transaction={tx}
                  category={mockCategories.find((c) => c.id === tx.categoryId)}
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </Screen>
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
  greeting: {
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.lg,
  },
  summaryRow: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryItem: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  categoryList: {
    gap: spacing.sm,
  },
  transactionList: {
    gap: spacing.xs,
  },
});
