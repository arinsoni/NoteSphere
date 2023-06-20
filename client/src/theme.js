import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF", //used
    10: "#f8f9fa", 
    50: "#F0F0F0",
    100: "#ffffffcc", //used
    200: "#f8f9fa",

    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#344767", //used
    100: "#202940", //used
    200: "#7b809A", //used
    300: "#f8f9fa", //used
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#202940", //userd
  },

};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            dark: colorTokens.primary[100], //used
            main: colorTokens.primary[900], //used
            light: colorTokens.primary[100],
          },
          neutral: {
            dark: colorTokens.grey[10],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[300],
            medium: colorTokens.grey[400],
            light: colorTokens.grey[700],
          },
          background: {
            default: colorTokens.grey[900],
            alt: colorTokens.grey[800],
          },
          font: {
            main: colorTokens.grey[0], // used
            light: colorTokens.grey[100] // used
          }
        }
        : {
          // palette values for light mode
          primary: {
            dark: colorTokens.grey[0], //used
            main: colorTokens.primary[300], // used
            light: colorTokens.primary[50], 
          },
          neutral: {
            dark: colorTokens.grey[700],
            main: colorTokens.grey[500],
            mediumMain: colorTokens.grey[400],
            medium: colorTokens.grey[300],
            light: colorTokens.grey[50],
          },
          background: {
            default: colorTokens.grey[10],
            alt: colorTokens.grey[0],
          },
          font: {
            main: colorTokens.primary[50], // used
            light: colorTokens.primary[200] //used
          }
        }),
    },
    typography: {
      fontFamily: ['Montserrat', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
        fontSize: 20,
        fontWeight:500
        
      },
      h5: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
        fontSize: 16,
        fontWeight: 500
        
      },
      h6: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};