export const theme = {
  colors: {
    0: '#ecedf9',
    100: '#c6c8e8',
    200: '#a0a4d9',
    300: '#7a7fcc',
    400: '#565bbf',
    500: '#3d41a6',
    600: '#303381',
    700: '#23255b',
    800: '#141536',
    900: '#060713',
    danger: '#d92916',
  },
  borderRadius: 8,
  bigBorderRadius: 24,
  spacing: {
    small: 8,
    medium: 16,
    large: 32,
  },
  text: {
    small: 12,
    normal: 16,
    big: 20,
    huge: 26,
  },
}

export default {
  light: {
    text: theme.colors[800],
    background: theme.colors[0],
    tint: theme.colors[700],
    tabIconDefault: '#ccc',
    tabIconSelected: theme.colors[700],
  },
  dark: {
    text: theme.colors[0],
    background: theme.colors[800],
    tint: theme.colors[100],
    tabIconDefault: '#ccc',
    tabIconSelected: theme.colors[100],
  },
}
