// constants/colors.ts

export const colors = {
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceDark: "#249D8F0D", // teal 5%

  primary: "#249D8F",
  primaryHover: "#000000",
  primaryLight: "#249D8F1A", // teal 10%

  text: "#249D8F",
  textSecondary: "#249D8F",
  textMuted: "#00000080", // black 50%

  border: "#249D8F33", // teal 20%
  borderStrong: "#249D8F66", // teal 40%

  white: "#FFFFFF",
  black: "#000000",
} as const;

export type Colors = typeof colors;