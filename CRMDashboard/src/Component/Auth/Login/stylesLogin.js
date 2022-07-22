// assets
import fondoLogin from "./assets/images/fondoLogin.jpg";
// mantine
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  containerLogin: {
    margin: "auto",
    height: "auto",
    [`@media (max-width: 1000px)`]: {
      width: "80%",
    },
    [`@media (min-width: 1001px) and (max-width: 1500px)`]: {
      width: "65%",
    },
    [`@media (min-width: 1501px)`]: {
      width: "50%",
    },
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
    gap: theme.other.spacing.p8,
    padding: theme.other.spacing.p12,
    marginTop: theme.other.spacing.p5,
    marginBottom: theme.other.spacing.p5,
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      padding: theme.other.spacing.p8,
    },
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
    gap: theme.other.spacing.p5,
    padding: 0,
  },
  formLogin: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p5,
  },
  buttonForgot: {
    color: "black",
    [`&:hover`]: {
      color: theme.colors.primary[2],
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
