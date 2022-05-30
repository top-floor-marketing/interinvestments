import React, { useState } from "react";
import {
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box,
  createStyles,
} from "@mantine/core";

import { COLOR_SCHEME_DARK } from "../../Store/themeSlice";

const useStyles = createStyles((theme, _params, getRef) => ({
  headerContainer: {
    backgroundColor: theme.colors.white[0],
    color:
      theme.colorScheme === COLOR_SCHEME_DARK
        ? theme.colors.white[0]
        : theme.colors.black[0],
  },
  boxContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  logoHeaderContainer: {
    display: "none",
    width: "0px",
    height: "100%",
    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      width: "349px",
      borderRight:
        theme.colorScheme === COLOR_SCHEME_DARK
          ? `1px solid ${theme.colors.dark[9]}`
          : `1px solid ${theme.colors.gray[2]}`,
      backgroundColor:
        theme.colorScheme === COLOR_SCHEME_DARK
          ? theme.colors.dark[8]
          : theme.colors.gray[1],
    },
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
    <Header className={classes.headerContainer} height={70}>
      <Box className={classes.boxContainer}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="md"
            color={theme.colors.dark[8]}
            mr="xl"
          />
        </MediaQuery>
        <Box className={classes.logoHeaderContainer}>
          <Box p="xl">LOGO</Box>
        </Box>
        <Box className={classes.content}>
          <Box p="xl">HEADER</Box>
        </Box>
      </Box>
    </Header>
  );
};

export default HeaderDashboard;
