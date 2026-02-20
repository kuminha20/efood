import tokens from './tokens'

export const lightTheme = {
  colors: {
    ...tokens.colors,
    background: tokens.colors.background,
    surface: tokens.colors.surface,
    text: tokens.colors.text
  },
  fonts: tokens.fonts,
  spacing: tokens.spacing,
  radii: tokens.radii
}

export const darkTheme = {
  colors: {
    primary: '#FF8A5B',
    secondary: '#FFB58A',
    background: '#0b1020',
    surface: '#0f1724',
    muted: '#111827',
    text: '#f8fafc'
  },
  fonts: tokens.fonts,
  spacing: tokens.spacing,
  radii: tokens.radii
}

export default { lightTheme, darkTheme }
