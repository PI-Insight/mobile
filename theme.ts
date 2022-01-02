import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      100: '#ff96c4',
      200: '#ff7cab',
      300: '#ff6193',
      400: '#fb447c',
      50: '#ffa3d0',
      500: '#df2266',
      600: '#c30051',
      700: '#a7003c',
      800: '#8b0029',
      900: '#700017',
    },
  },
  fontSizes: {
    '2xs': 12,
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
});

export default theme;
