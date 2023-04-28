// assets
import fondoLogin from "./assets/images/fondoLogin.jpg";
// mantine
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
  containerLogin: {
    margin: "auto",
    height: "auto",
    padding: "0 !important",
    display: "flex",
    minHeight: "450px",
    [`@media (max-width: 1000px)`]: {
      width: "85%",
    },
    [`@media (min-width: 1001px) and (max-width: 1500px)`]: {
      width: "70%",
    },
    [`@media (min-width: 1501px)`]: {
      width: "55%",
    },
  },
  logo: {
    cursor: 'pointer',
     "&:hover": {
      transform: "scale(1.005)"
    }
  },
  contentLogin: {
    display: "grid",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
  contentFom: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.other.spacing.p12,
    padding: theme.other.spacing.p8,
    width: "100% !important",
    maxWidth: "400px !important",
    justifySelf: "center",
    alignSelf: "center",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      padding: theme.other.spacing.p6,
    },
  },
  groupBackHome: {
    cursor: 'pointer',
    alignSelf: "flex-start",
    justifyItems: "center",
    gap: theme.other.spacing.p2,
    'span': {
       "&:hover": {
        color: theme.colors.primary[6]
      }
    }
  },
  titleForm: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "40px",
  },
  containerSocialMedia: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    gridGap: "1rem",
    marginTop: "0.70rem",
    marginBottom: "0.70rem",
  },
  InputForm: {
    '.mantine-TextInput-withIcon': {
      padding: "1px 2px !important",
      paddingLeft: "36px !important"
    }
  },
  containerForm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    padding: 0,
  },
  formLogin: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
  },
  buttonForgot: {
    color: "black",
    [`&:hover`]: {
      color: theme.colors.primary[6],
    },
  },
  imageLogin: {
    position: "relative",
    width: "100%",
  },
  ParallaxCroma: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    zIndex: 1,
    opacity: 0.1,
  },

  ParallaxContain: {
    height: "100%",
    width: "100%",
    background: `url(${fondoLogin})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLogin: {
    width: "100%",
    fontSize: "20px",
    lineHeight: "1.7em",
    borderWidth: "1px",
    padding: "0.3em 1em",
  },
}));

export default useStyles;
