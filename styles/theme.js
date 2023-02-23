import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#35A7BB",
      // light: "#98B293",
      // dark: "#3E4A3C",
      light: "#BADCE2",
      transparent: "#35A7BB4a"
    },
    secondary: {
      main: "#4ED4C4"
    },
    dark: {
      main: "#333333",
      light: "#606060"
    },
    light: {
      main: "#F4F6F8",
    },
    info: {
      main: "#606060",
      light: "#EE3EAD"
    },
    error: {
      main: "#ED4A2B"
    },
    success: {
      main: "#2AB570"
    },
    grey: {
      main: "#CECECE",
    },
    gradient: {
      main: "linear-gradient(180deg, rgba(53,167,187,1) 0%, rgba(78,212,196,1) 100%)",
      level: "linear-gradient(90deg, rgba(193,24,225,1) 0%, rgba(193,13,85,1) 100%)"
    }
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif",
    subtitle1: {
      fontWeight: 600,
      fontSize: 14,
      color: "#1a1a1a",
      lineHeight: 1.5
    },
    h1: {
      fontWeight: 600,
      fontSize: 23,
    },
    h2: {
      fontWeight: 600,
      fontSize: 21,
      color: "#6a6a6a",
    },
    h3: {
      fontWeight: 600,
      fontSize: 20,
      color: "#6a6a6a",
    },
    h4: {
      fontWeight: 600,
      fontSize: 18,
      color: "#6a6a6a",
      marginBottom: 12
    },
    h5: {
      fontWeight: 400,
      fontSize: 15,
      color: "#black",
    },
    body1: {
      fontWeight: 600,
      fontSize: 14,
      color: "black",
    },
    body2: {
      fontWeight: 600,
      fontSize: 14,
      color: "#6a6a6a",
    },
    caption: {
      fontWeight: 600,
      fontSize: 13,
      color: "#6a6a6a",
      fontStyle: "italic"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 600
        },
        containedPrimary: {
          color: 'white'
        },
        containedSecondary: {
          color: 'white'
        }
      },
      variants: [
        {
          props: { variant: "rounded" },
          style: {
            borderRadius: 12,
            background: "#35A7BB",
            '&:hover': {
              background: "#216b78",
            },
            color: 'white',
            fontWeight: 600
          },
        },
        {
          props: { variant: "custom" }
        }
      ]
    },
  }
})

export default theme