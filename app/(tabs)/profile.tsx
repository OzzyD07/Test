import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { colors, radius, spacing } from "../../constants/theme";
import { Screen } from "../../components/Screen";
import { AppText } from "../../components/AppText";
import { Card } from "../../components/Card";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

const APP_VERSION = "1.0.0";

function SettingsRow({ icon, label, subtitle }: { icon: string; label: string; subtitle?: string }) {
  return (
    <View style={styles.settingsRow}>
      <View style={styles.settingsIconContainer}>
        <AppText variant="body">{icon}</AppText>
      </View>
      <View style={styles.settingsInfo}>
        <AppText variant="subtitle">{label}</AppText>
        {subtitle ? <AppText variant="caption" color={colors.textSecondary}>{subtitle}</AppText> : null}
      </View>
      <AppText variant="body" color={colors.textMuted}>›</AppText>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

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
          <AppText variant="heading" style={styles.heading}>
            Profile
          </AppText>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Card variant="elevated" style={styles.card}>
            <View style={styles.avatarContainer}>
              <AppText variant="heading" style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() ?? "?"}
              </AppText>
            </View>
            <AppText variant="title" style={styles.userName}>
              {user?.name ?? "Guest"}
            </AppText>
            <AppText variant="body" color={colors.textSecondary}>
              {user?.email ?? "No email"}
            </AppText>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Card variant="elevated" style={styles.card}>
            <SettingsRow icon="👤" label="Account" subtitle="Manage your account" />
            <View style={styles.divider} />
            <SettingsRow icon="⚙️" label="Preferences" subtitle="App settings" />
            <View style={styles.divider} />
            <SettingsRow icon="📱" label="Version" subtitle={APP_VERSION} />
            <View style={styles.divider} />
            <SettingsRow icon="🚀" label="Status" subtitle="MVP" />
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <PrimaryButton
            title="Logout"
            onPress={handleLogout}
            containerStyle={styles.logoutButton}
          />
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
  heading: {
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: spacing.sm,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    color: colors.surface,
  },
  userName: {
    textAlign: "center",
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  settingsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsInfo: {
    flex: 1,
    gap: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  logoutButton: {
    backgroundColor: colors.expense,
    marginTop: spacing.sm,
  },
});
