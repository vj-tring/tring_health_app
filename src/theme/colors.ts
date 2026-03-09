/**
 * Light and dark color palettes for the app.
 */

export const lightColors = {
  // Backgrounds
  background: '#ffffff',
  backgroundSecondary: '#f3f4f6',
  surface: '#ffffff',
  surfaceElevated: '#f9fafb',

  // Text
  text: '#111827',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',

  // Brand / Primary (vibrant purple-blue)
  primary: '#6366f1',
  primaryForeground: '#ffffff',
  primaryMuted: '#e0e7ff',

  // Secondary / Accent
  secondary: '#64748b',
  secondaryForeground: '#ffffff',

  // Borders & dividers
  border: '#e5e7eb',
  borderFocus: '#6366f1',

  // Status
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
  info: '#0284c7',

  // Input (light grey field, distinct from page background)
  inputBackground: '#f3f4f6',
  inputBorder: '#e5e7eb',
  placeholder: '#9ca3af',
} as const;

export const darkColors = {
  // Backgrounds
  background: '#111827',
  backgroundSecondary: '#1f2937',
  surface: '#1f2937',
  surfaceElevated: '#374151',

  // Text
  text: '#f9fafb',
  textSecondary: '#d1d5db',
  textMuted: '#9ca3af',

  // Brand / Primary (vibrant purple-blue)
  primary: '#818cf8',
  primaryForeground: '#ffffff',
  primaryMuted: '#3730a3',

  // Secondary / Accent
  secondary: '#94a3b8',
  secondaryForeground: '#0f172a',

  // Borders & dividers
  border: '#374151',
  borderFocus: '#818cf8',

  // Status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#0ea5e9',

  // Input
  inputBackground: '#1f2937',
  inputBorder: '#4b5563',
  placeholder: '#6b7280',
} as const;

export type ColorPalette = typeof lightColors;
