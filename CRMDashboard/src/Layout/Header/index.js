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

import { COLOR_SCHEME_DARK } from "../../GlobalStore/useActionsTheme";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

const URL_QUERY_ID_NAME = "agent-id";
const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const useStyles = createStyles((theme, _params, getRef) => ({
  headerContainer: {
    backgroundColor: theme.colors.white[0],
    color:
      theme.colorScheme === COLOR_SCHEME_DARK
        ? theme.colors.white[0]
        : theme.colors.black[0],
    paddingLeft: theme.other.spacing.p4,
    paddingRight: theme.other.spacing.p4,
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
    gap: theme.other.spacing.p4,
  },
  logoContainer: {
    paddingLeft: theme.other.spacing.p4,
    paddingRight: theme.other.spacing.p4,
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    height: "100%",
    width: "280px",
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
    'img': {
      maxWidth: "250px !important",
      marginLeft: "auto !important",
      marginRight: "auto !important"
    }
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    marginLeft: "auto",
    padding: theme.other.spacing.p4,
    color: theme.colors.black[0],
  },
}));

const HeaderDashboard = ({ opened, setOpened }) => {

  const { state: { user: { infoUser: { databaseId } } } } = useClientGlobalStore();

  const theme = useMantineTheme();
  const { classes } = useStyles();

  const urlLogo = () => {
    let uriForLogo = '';
    if(databaseId) {
      uriForLogo = `${DOMAIN_URL}?${URL_QUERY_ID_NAME}=${databaseId}&shared=true`;
      window.open(uriForLogo, '_blank');
    }
  }

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
          <Box className={classes.logoContainer} onClick={() => urlLogo()}>
              <Image src={LogoInter} alt="Logo interinvestments" />
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
