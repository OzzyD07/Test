import React, { useState, useCallback } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { colors, spacing } from "../../constants/theme";
import { Screen } from "../../components/Screen";
import { AppText } from "../../components/AppText";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterScreen() {
  const router = useRouter();
  const { register, error, clearError, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    clearError();
    setIsSubmitting(true);
    try {
      await register(name, email, password);
      router.replace("/(tabs)");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, password, register, clearError, router]);

  return (
    <Screen>
      <View style={styles.content}>
        <AppText variant="heading">Create Account</AppText>
        <AppText variant="body" color={colors.textSecondary} style={styles.subtitle}>
          Sign up to get started
        </AppText>

        <View style={styles.form}>
          <Input
            label="Name"
            placeholder="Your full name"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
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
          title={isSubmitting || isLoading ? "Creating..." : "Sign Up"}
          onPress={handleSubmit}
          disabled={isSubmitting || isLoading || !name.trim() || !email.trim() || !password}
          containerStyle={styles.button}
        />

        <Pressable style={styles.footerLink} onPress={() => router.replace("/auth/login")}>
          <AppText variant="body" color={colors.primary}>
            Already have an account? Sign in
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
