import { createTheme  } from "@material-ui/core/styles";
import { blue, pink } from "@material-ui/core/colors";

const Theme = createTheme ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: blue,
    secondary: pink,
  },
  typography: {
    h6: { fontWeight: 700 },
  },

  overrides: {
    "@global": {},
    MuiCardHeader: {
      title: {
        fontWeight: 700,
      },
    },
  },
});

export default Theme;
