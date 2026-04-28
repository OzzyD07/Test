import React, { useState, useCallback } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { colors, spacing } from "../../constants/theme";
import { Screen } from "../../components/Screen";
import { AppText } from "../../components/AppText";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";

export default function LoginScreen() {
  const router = useRouter();
  const { login, error, clearError, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    clearError();
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password, login, clearError, router]);

  return (
    <Screen>
      <View style={styles.content}>
        <AppText variant="heading">Welcome Back</AppText>
        <AppText variant="body" color={colors.textSecondary} style={styles.subtitle}>
          Sign in to continue
        </AppText>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {error ? <AppText variant="body" color={colors.expense} style={styles.error}>{error}</AppText> : null}

        <PrimaryButton
          title={isSubmitting || isLoading ? "Signing in..." : "Sign In"}
          onPress={handleSubmit}
          disabled={isSubmitting || isLoading || !email.trim() || !password}
          containerStyle={styles.button}
        />

        <Pressable style={styles.footerLink} onPress={() => router.replace("/auth/register")}>
          <AppText variant="body" color={colors.primary}>
            New here? Sign up
          </AppText>
        </Pressable>
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
  error: {
    marginTop: -spacing.sm,
  },
  button: {
    marginTop: spacing.sm,
  },
  footerLink: {
    alignItems: "center",
    marginTop: spacing.md,
  },
});
