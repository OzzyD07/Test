import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors, spacing } from "../../constants/theme";
import { Screen } from "../../components/Screen";
import { AppText } from "../../components/AppText";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Input } from "../../components/Input";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.content}>
        <AppText variant="heading">Login</AppText>
        <AppText variant="body" color={colors.textSecondary} style={styles.subtitle}>
          Sign in to your account
        </AppText>

        <View style={styles.form}>
          <Input label="Email" placeholder="your@email.com" keyboardType="email-address" autoCapitalize="none" />
          <Input label="Password" placeholder="••••••••" secureTextEntry />
        </View>

        <PrimaryButton title="Sign In" onPress={() => router.push("/(tabs)")} containerStyle={styles.button} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.lg,
  },
  subtitle: {
    marginTop: -spacing.sm,
  },
  form: {
    gap: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
  },
});
