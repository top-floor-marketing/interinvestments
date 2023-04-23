import { AppShell, Box, createStyles } from "@mantine/core";
import React, { useState } from "react";

import Navbar from "./NavBar";
import Header from "./Header";

const useStyles = createStyles((theme, _params, getRef) => ({
  boxContainer: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
    display: "flex",
    minHeight: "400px",
    flexDirection: "column",
    padding: theme.other.spacing.p4,
  },
}));

const DashboardLayout = (props) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding={0}
      navbar={<Navbar opened={opened}  setOpened={setOpened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Box className={classes.boxContainer}>
        {props.children}
      </Box>
    </AppShell>
  );
};

export default DashboardLayout;
