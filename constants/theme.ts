export const colors = {
  primary: "#4F46E5",
  primaryDark: "#3730A3",
  secondary: "#10B981",
  secondaryDark: "#059669",
  expense: "#F43F5E",
  expenseDark: "#E11D48",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#0F172A",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  borderDark: "#CBD5E1",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const typography = {
  heading: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500" as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 24,
  },
  amount: {
    fontSize: 24,
    fontWeight: "700" as const,
    lineHeight: 32,
  },
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
};
