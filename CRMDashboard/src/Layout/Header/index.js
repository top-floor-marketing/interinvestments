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

import { LogoutIcon } from "../../Component/ActionButtons";

import { COLOR_SCHEME_DARK } from "../../Store/themeSlice";

import { useDispatch } from "react-redux";
import { ROUTES_NAMES } from "../../Route/routes";
import { setNavigation } from "../../Store/userSlice";

const useStyles = createStyles((theme, _params, getRef) => ({
  headerContainer: {
    backgroundColor: theme.colors.white[0],
    color:
      theme.colorScheme === COLOR_SCHEME_DARK
        ? theme.colors.white[0]
        : theme.colors.black[0],
    paddingLeft: theme.other.spacing.p5,
    paddingRight: theme.other.spacing.p5,
    boxShadow: theme.shadows.md,
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      padding: 0,
    },
  },
  boxContainer: {
    display: "flex",
    flexDirection: "row",
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
    "&:hover": {
      cursor: "pointer",
    },
  },
  imageContainer: {
    paddingLeft: theme.other.spacing.p5,
    paddingRight: theme.other.spacing.p5,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    marginLeft: "auto",
    padding: theme.other.spacing.p5,
    color: theme.colors.black[0],
  },
}));

const HeaderDashboard = ({ opened, setOpened }) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <Header className={classes.headerContainer} height={80}>
      <Box className={classes.boxContainer}>
        <MediaQuery largerThan="lg" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="lg"
            color={theme.colors.dark[8]}
          />
        </MediaQuery>
        <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
          <Box className={classes.logoContainer}>
            <Box
              className={classes.imageContainer}
              onClick={() => dispatch(setNavigation(ROUTES_NAMES.HOME))}
            >
              <Image src={LogoInter} alt="Logo interinvestments" />
            </Box>
          </Box>
        </MediaQuery>
        <Box className={classes.content}>
          <LogoutIcon  size={24} color="dark" />
        </Box>
      </Box>
    </Header>
  );
};

export default HeaderDashboard;
