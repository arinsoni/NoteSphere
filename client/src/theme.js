import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import { pxToRem } from "./assets/functions/pxToRem";

// color design tokens export
export const colorTokens = {
  colors: {
    0: "#FFFFFF",
    10: "#FF0000",
    20: "#00FF00",
    30: "#0000FF",
  },
  secondary: {
    0: "#FFFF00",
    10: "#FF00FF",
    20: "#00FFFF",
  },

  grey: {
    0: "#F8F9FA",
    100: "#FFFFFFCC",
    200: "#A3A3A3",
    300: "#858585",
    400: "#666666",
    500: "#4D4D4D",
    600: "#333333",
    700: "#1A1A1A",
    800: "#0A0A0A",
    900: "#000000",
  },

  primary: {
    0: "#202940",
    100: "#00353F",
    200: "#006B7D",
    300: "#00A0BC",
    400: "#00D5FA",
    500: "#7B809A",
    600: "#344767",
    700: "#33DDFB",
    900: "#1a2035",
    1000: "#1f283e"
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
              light: colorTokens.primary[1000],// #1f283e
              main: colorTokens.primary[0], //#202940
            },
            secondary:{
              dark: colorTokens.grey[0], //#FFFFFF
              main: colorTokens.primary[900]//#1a2035
            },
            alt:{
              main:colorTokens.colors[0], //#FFFFFF
              light: colorTokens.primary[0],   //#202940
            },
            font: {

              main: colorTokens.colors[0],  //#FFFFFF
              light: colorTokens.grey[100] //#FFFFFFCC
            },
          }
        : {
            // palette values for light mode
            primary: {
              
              main: colorTokens.colors[0],  //#FFFFFF,
            },
            secondary:{
              dark: colorTokens.primary[0], //#202940
              main: colorTokens.colors[0], //#FFFFFF
            },
            alt:{
              main:colorTokens.colors[0], //#FFFFFF
              light:colorTokens.grey[0],//#F8f9fa
            },
            font: {
              main: colorTokens.primary[600], //#344767
              light: colorTokens.primary[500], //#7B809A
            },
          }),
    },
    typography: {
      heading: {
        fontSize: 18,
        fontWeight: 700,
      },
      subHeading: {
        fontSize: 14,
        fontWeight: 500,
      },
      para: {
        fontSize: 12,
        fontWeight: 400,
      },
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 500,
      },
      h5: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 500,
      },
      h6: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 10,
        fontWeight: 500,
      },
    },
  };
};
