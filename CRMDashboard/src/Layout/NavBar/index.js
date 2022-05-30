import { Navbar, createStyles, ScrollArea, Box } from "@mantine/core";

import { COLOR_SCHEME_DARK } from "../../Store/themeSlice";
const useStyles = createStyles((theme, _params, getRef) => ({
  navBarContainer: {
    backgroundColor:
      theme.colorScheme === COLOR_SCHEME_DARK
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
  },
  boxContainer: {
    minHeight: "calc(100vh)",
    display: "flex",
    flexDirection: "column",
  },
}));

const NavBarDashboard = ({ opened }) => {
  const { classes } = useStyles();
  return (
    <Navbar
      p="xl"
      hidden={!opened}
      hiddenBreakpoint="md"
      width={{ lg: 350 }}
      className={classes.navBarContainer}
    >
      <Box className={classes.boxContainer}>
        <Navbar.Section grow component={ScrollArea}>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
        </Navbar.Section>
        <Navbar.Section>{/* Footer with user */}</Navbar.Section>
      </Box>
    </Navbar>
  );
};

export default NavBarDashboard;
