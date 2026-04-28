import React from "react";
import {
  View,
  ViewStyle,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { colors, spacing } from "../constants/theme";

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safe?: boolean;
  contentContainerStyle?: ViewStyle;
}

export function Screen({
  children,
  style,
  safe = true,
  contentContainerStyle,
}: ScreenProps) {
  const content = (
    <View style={[styles.container, style, contentContainerStyle]}>
      {children}
    </View>
  );

  if (safe) {
    return (
      <SafeAreaView style={[styles.safeContainer, style]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        {content}
      </SafeAreaView>
    );
  }

  return content;
}

const styles = {
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  } as ViewStyle,
};
