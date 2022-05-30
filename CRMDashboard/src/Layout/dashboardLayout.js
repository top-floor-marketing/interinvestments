import { AppShell, Box, createStyles } from "@mantine/core";
import React, { useState } from "react";

import Navbar from "./NavBar";
import Header from "./Header";

/* const useStyles = createStyles((theme, _params, getRef) => ({
  boxContainer: {
    backgroundColor: theme.colors.white[1],
    height: "100%",
    widows: "100%",
    display: "flex",
    flexDirection: "column",
  },
})); */

const DashboardLayout = (props) => {
  // const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint="md"
      navbar={<Navbar opened={opened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.white[1],
        },
      })}
    >
      {props.children}
    </AppShell>
  );
};

export default DashboardLayout;
