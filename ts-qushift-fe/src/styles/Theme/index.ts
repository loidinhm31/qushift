import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Styles } from "@chakra-ui/theme-tools";

import { cardTheme } from "@/styles/Theme/components/Card";
import { containerTheme } from "@/styles/Theme/components/Container";
import { colors } from "@/styles/Theme/colors";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
  disableTransitionOnChange: false,
};

const components = {
  Container: containerTheme,
  Card: cardTheme,
};

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const fonts = {
  heading: "",
  body: "",
};

const styles: Styles = {
  global: (props) => ({
    "*": {
      transition: "background-color 200ms cubic-bezier(0.4, 0, 1, 1)",
      // bg: props.colorMode === "light" ? colors.light.bg : colors.dark.bg,
      // color: props.colorMode === "light" ? colors.light.text : colors.dark.text,
    },
    ".basic-theme": {
      bg: props.colorMode === "light" ? colors.light.bg : colors.dark.bg,
      color: props.colorMode === "light" ? colors.light.text : colors.dark.text,
    },
  }),
};

export const theme = extendTheme({ colors, config, fonts, styles, components, breakpoints });
