import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { colors, radius, spacing } from "../../constants/theme";
import { Screen } from "../../components/Screen";
import { AppText } from "../../components/AppText";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { PrimaryButton } from "../../components/PrimaryButton";
import { mockCategories } from "../../data/mockCategories";
import { Transaction, TransactionType } from "../../types/transaction";

const today = new Date().toISOString().split("T")[0];

type FormErrors = Record<string, string>;

function mergeStyle(base: ViewStyle, override: ViewStyle): ViewStyle {
  return { ...base, ...override };
}

export default function AddTransactionScreen() {
  const insets = useSafeAreaInsets();

  const [type, setType] = useState<TransactionType>("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const filteredCategories = mockCategories.filter((c) => c.type === type);

  const handleTypeChange = useCallback(
    (newType: TransactionType) => {
      setType(newType);
      setCategoryId("");
      setErrors((prev) => ({ ...prev, type: "", categoryId: "" }));
    },
    []
  );

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = "Enter a valid amount greater than 0";
    }

    if (!type) {
      newErrors.type = "Please select a type";
    }

    if (!categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, amount, type, categoryId, date]);

  const handleSubmit = useCallback(() => {
    if (!validate()) {
      return;
    }

    const transaction: Transaction = {
      id: String(Date.now()),
      title: title.trim(),
      amount: parseFloat(amount),
      type,
      categoryId,
      date,
      description: description.trim() || undefined,
    };

    console.log("Created transaction:", transaction);
    setSubmitted(true);

    setTitle("");
    setAmount("");
    setCategoryId("");
    setDate(today);
    setDescription("");
    setErrors({});

    setTimeout(() => setSubmitted(false), 3000);
  }, [title, amount, type, categoryId, date, description, validate]);

  if (submitted) {
    return (
      <Screen safe={false}>
        <Animated.View
          style={[styles.successContainer, { paddingTop: insets.top + spacing.xxl }]}
          entering={FadeIn.duration(400)}
        >
          <AppText variant="heading" color={colors.secondary}>
            {"\u2713"}
          </AppText>
          <AppText variant="title" color={colors.secondary}>
            Transaction Added
          </AppText>
          <AppText variant="body" color={colors.textSecondary} style={styles.successText}>
            Your transaction has been recorded successfully.
          </AppText>
        </Animated.View>
      </Screen>
    );
  }

  return (
    <Screen safe={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            { paddingTop: insets.top + spacing.md, paddingBottom: spacing.xxl },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeIn.duration(400)}>
            <AppText variant="heading" style={styles.heading}>
              Add Transaction
            </AppText>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <Card variant="elevated" style={styles.card}>
              <AppText variant="subtitle" color={colors.textSecondary} style={styles.label}>
                Transaction Type
              </AppText>
              <View style={styles.typeRow}>
                <View
                  style={[
                    styles.typeButton,
                    type === "expense" && styles.typeButtonExpenseActive,
                  ]}
                >
                  <PrimaryButton
                    title="Expense"
                    onPress={() => handleTypeChange("expense")}
                    containerStyle={mergeStyle(
                      styles.typePressable,
                      type === "expense"
                        ? { backgroundColor: colors.expense }
                        : { backgroundColor: "transparent" }
                    )}
                    textStyle={{
                      color: type === "expense" ? colors.surface : colors.expense,
                    }}
                  />
                </View>
                <View
                  style={[
                    styles.typeButton,
                    type === "income" && styles.typeButtonIncomeActive,
                  ]}
                >
                  <PrimaryButton
                    title="Income"
                    onPress={() => handleTypeChange("income")}
                    containerStyle={mergeStyle(
                      styles.typePressable,
                      type === "income"
                        ? { backgroundColor: colors.secondary }
                        : { backgroundColor: "transparent" }
                    )}
                    textStyle={{
                      color: type === "income" ? colors.surface : colors.secondary,
                    }}
                  />
                </View>
              </View>
              {errors.type ? <AppText variant="caption" color={colors.expense}>{errors.type}</AppText> : null}
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <Card variant="elevated" style={styles.card}>
              <Input
                label="Title"
                placeholder="e.g. Grocery shopping"
                value={title}
                onChangeText={(t) => {
                  setTitle(t);
                  if (errors.title) setErrors((p) => ({ ...p, title: "" }));
                }}
                error={errors.title}
              />

              <Input
                label="Amount"
                placeholder="0"
                value={amount}
                onChangeText={(a) => {
                  setAmount(a);
                  if (errors.amount) setErrors((p) => ({ ...p, amount: "" }));
                }}
                error={errors.amount}
                keyboardType="numeric"
                inputMode="decimal"
              />

              <Input
                label="Date"
                placeholder="YYYY-MM-DD"
                value={date}
                onChangeText={(d) => {
                  setDate(d);
                  if (errors.date) setErrors((p) => ({ ...p, date: "" }));
                }}
                error={errors.date}
              />

              <Input
                label="Description (optional)"
                placeholder="Add a note..."
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(300)}>
            <Card variant="elevated" style={styles.card}>
              <AppText variant="subtitle" color={colors.textSecondary} style={styles.label}>
                Category
              </AppText>
              <View style={styles.categoryRow}>
                {filteredCategories.map((cat) => (
                  <View
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      categoryId === cat.id && {
                        backgroundColor: cat.color + "20",
                        borderColor: cat.color,
                      },
                    ]}
                  >
                    <PrimaryButton
                      title={cat.icon + " " + cat.name}
                      onPress={() => {
                        setCategoryId(cat.id);
                        if (errors.categoryId) setErrors((p) => ({ ...p, categoryId: "" }));
                      }}
                      containerStyle={mergeStyle(
                        styles.categoryPressable,
                        categoryId === cat.id
                          ? { backgroundColor: "transparent" }
                          : {}
                      )}
                      textStyle={{
                        fontSize: 13,
                        fontWeight: "500",
                        color: categoryId === cat.id ? cat.color : colors.textSecondary,
                      }}
                    />
                  </View>
                ))}
              </View>
              {errors.categoryId ? <AppText variant="caption" color={colors.expense}>{errors.categoryId}</AppText> : null}
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(400)}>
            <PrimaryButton
              title="Add Transaction"
              onPress={handleSubmit}
              containerStyle={styles.submitButton}
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  heading: {
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  typeRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  typeButton: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  typeButtonExpenseActive: {
    borderColor: colors.expense,
  },
  typeButtonIncomeActive: {
    borderColor: colors.secondary,
  },
  typePressable: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 0,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  categoryChip: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  categoryPressable: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 0,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  successText: {
    textAlign: "center",
    marginTop: spacing.sm,
  },
});
