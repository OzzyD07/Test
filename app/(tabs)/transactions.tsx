import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { colors, spacing } from "../../constants/theme";
import { Screen } from "../../components/Screen";
import { AppText } from "../../components/AppText";
import { TransactionListItem } from "../../components/TransactionListItem";
import { mockTransactions } from "../../data/mockTransactions";
import { mockCategories } from "../../data/mockCategories";

export default function TransactionsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const sortedTransactions = [...mockTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handlePress = (id: string) => {
    router.push(`/transaction/${id}`);
  };

  const renderItem = ({ item, index }: { item: typeof mockTransactions[number]; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <TransactionListItem
        transaction={item}
        category={mockCategories.find((c) => c.id === item.categoryId)}
        onPress={() => handlePress(item.id)}
      />
    </Animated.View>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <AppText variant="title" color={colors.textSecondary}>
        No Transactions
      </AppText>
      <AppText variant="body" color={colors.textMuted}>
        Your transactions will appear here once added.
      </AppText>
    </View>
  );

  return (
    <Screen safe={false}>
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + spacing.md, paddingBottom: spacing.md },
        ]}
      >
        <AppText variant="heading">Transactions</AppText>
      </View>
      <FlatList
        data={sortedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={EmptyState}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xxl,
  },
});
