import React from "react";
import {
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box,
  Image,
  createStyles,
} from "@mantine/core";

import LogoInter from "../../Assets/logo-inter.svg";

import { COLOR_SCHEME_DARK } from "../../Store/themeSlice";

const useStyles = createStyles((theme, _params, getRef) => ({
  headerContainer: {
    backgroundColor: theme.colors.white[0],
    color:
      theme.colorScheme === COLOR_SCHEME_DARK
        ? theme.colors.white[0]
        : theme.colors.black[0],
    paddingLeft: theme.other.spacing.p5,
    paddingRight: theme.other.spacing.p5,
    boxShadow: theme.shadows.xl,
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      padding: 0,
    },
  },
  boxContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    gap: theme.other.spacing.p5,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    height: "100%",
    width: "300px",
    borderRight:
      theme.colorScheme === COLOR_SCHEME_DARK
        ? `1px solid ${theme.colors.dark[9]}`
        : `1px solid ${theme.colors.gray[2]}`,
    backgroundColor:
      theme.colorScheme === COLOR_SCHEME_DARK
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "130px",
      borderRight: 0,
    },
  },
  imageContainer: {
    paddingLeft: theme.other.spacing.p5,
    paddingRight: theme.other.spacing.p5,
  },
  content: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    color: theme.colors.black[0],
  },
}));

const HeaderDashboard = ({ opened, setOpened }) => {
  const theme = useMantineTheme();

  const { classes } = useStyles();
  return (
    <Header className={classes.headerContainer} height={80}>
      <Box className={classes.boxContainer}>
        <MediaQuery largerThan="lg" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="md"
            color={theme.colors.dark[8]}
          />
        </MediaQuery>
        <Box className={classes.logoContainer}>
          <Box className={classes.imageContainer}>
            <Image src={LogoInter} alt="Logo interinvestments" />
          </Box>
        </Box>
        <Box className={classes.content}></Box>
      </Box>
    </Header>
  );
};

export default HeaderDashboard;
