import figmaStyles from '../../../../figma-styles.json';

type ColorScheme = {
  main?: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  850?: string;
  900: string;
};

type Colors = {
  [key: string]: ColorScheme;
};

export const colors: Colors = {
  primary: {
    main: figmaStyles.primary['500'],
    ...figmaStyles.primary,
  },
  secondary: {
    main: '#00BCDD',
    ...figmaStyles.Secondary,
  },
  neutral: {
    ...figmaStyles.Neutral,
  },
};
