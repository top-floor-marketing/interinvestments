import { Navbar, createStyles, ScrollArea, Box, Text } from "@mantine/core";

import { COLOR_SCHEME_DARK } from "../../Store/themeSlice";

import { CRM_ROUTES } from "../../Route/routes";

import { useSelector, useDispatch } from "react-redux";

import filter from "lodash/filter";

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
    color: theme.colors.white[0],
  },
  iconContainer: {
    // assign reference to selector
    ref: getRef("iconContainer"),
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.sm,
    padding: theme.other.spacing.p2,
    backgroundColor: theme.colors.secondary[0],
  },
  itemNav: {
    color: theme.colors.white[0],
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p5,
    padding: theme.other.spacing.p5,
    alignItems: "center",
    transition: "all",
    transitionDuration: 700,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      cursor: "link",
      fontWeight: 700,
    },
    [`&:hover .${getRef("iconContainer")}`]: {
      backgroundColor: theme.colors.primary[6],
    },
  },
  activeRoute: {
    //borderLeftStyle: "inset",
  },
  activeIcon: {
    backgroundColor: theme.colors.primary[0],
  },
}));

const NavBarDashboard = ({ opened }) => {
  const { route: routeInStore } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const routeActive = filter(CRM_ROUTES, (o) => {
    return o.name === routeInStore;
  });
  const { classes, cx } = useStyles();
  const getClassItemNav = (routeItem) => {
    return cx(classes.itemNav, {
      [classes.activeRoute]: routeItem === routeActive[0]?.name,
    });
  };
  const getClassIcon = (routeItem) => {
    return cx(classes.iconContainer, {
      [classes.activeIcon]: routeItem === routeActive[0]?.name,
    });
  };
  return (
    <Navbar
      hidden={!opened}
      hiddenBreakpoint="lg"
      width={{ lg: 300 }}
      className={classes.navBarContainer}
    >
      <Box className={classes.boxContainer}>
        <Navbar.Section grow component={ScrollArea}>
          {CRM_ROUTES.map((val, index) => {
            if (val.useInNavbar)
              return (
                <Box className={getClassItemNav(val.name)} key={index}>
                  <Box className={getClassIcon(val.name)}>{val.icon()}</Box>
                  <Text size="24px">{val.label}</Text>
                </Box>
              );
            return null;
          })}
        </Navbar.Section>
        <Navbar.Section>
          <Box>asdasdasdds</Box>
        </Navbar.Section>
      </Box>
    </Navbar>
  );
};

export default NavBarDashboard;
