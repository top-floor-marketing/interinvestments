import {
  Navbar,
  createStyles,
  ScrollArea,
  Box,
  Text,
  Avatar,
  Image,
  MediaQuery,
} from "@mantine/core";

import { ChevronRight } from "tabler-icons-react";

import { COLOR_SCHEME_DARK } from "../../Store/themeSlice";

import { CRM_ROUTES, ROUTES_NAMES } from "../../Route/routes";

import { useSelector, useDispatch } from "react-redux";
import { setNavigation } from "../../Store/userSlice";

import { getRouteActive } from "../../Store/utils";

import LogoInter from "../../Assets/logo-inter.svg";

import get from "lodash/get";

const useStyles = createStyles((theme, _params, getRef) => ({
  navBarContainer: {
    backgroundColor:
      theme.colorScheme === COLOR_SCHEME_DARK
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
  },
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    color: theme.colors.white[0],
    width: "100%",
    height: "100%",
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
    width: "100%",
    flexDirection: "row",
    gap: theme.other.spacing.p5,
    padding: theme.other.spacing.p5,
    alignItems: "center",
    transition: "all",
    transitionDuration: 700,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      cursor: "pointer",
      fontWeight: 600,
    },
    [`&:hover .${getRef("iconContainer")}`]: {
      backgroundColor: theme.colors.primary[6],
    },
  },
  activeIcon: {
    backgroundColor: theme.colors.primary[0],
  },
  perfilContainer: {
    color: theme.colors.white[0],
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: theme.other.spacing.p5,
    padding: theme.other.spacing.p5,
    alignItems: "center",
    transition: "all",
    transitionDuration: 700,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    marginTop: "auto",
    alignSelf: "flex-end",
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },
  chevron: {
    maxWidth: "40px",
    backgroundColor: "transparent",
    padding: "10px",
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: theme.colors.primary[6],
      color: theme.colors.white[0],
      borderRadius: "30px",
      cursor: "pointer",
    },
  },
  avatarContainer: {
    position: "relative",
    "&:hover": {
      cursor: "pointer",
      [`&:hover .${getRef("avatarFilter")}`]: {
        backgroundColor: theme.fn.rgba(theme.colors.gray[6], 0.3),
        display: "block",
      },
    },
  },
  avatarFilter: {
    ref: getRef("avatarFilter"),
    width: "56px",
    height: "56px",
    borderRadius: "30px",
    position: "absolute",
    top: 0,
    display: "none",
  },
  logoItemContainer: {
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
  },
}));

const NavBarDashboard = ({ opened }) => {
  const { route: routeInStore, infoUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { classes, cx } = useStyles();

  const routeActive = getRouteActive(routeInStore);

  const LOGO_ITEM = "_logo_";

  const avatarUrl = get(infoUser, ["avatar", "url"], null);
  const email = get(infoUser, ["email"], null);
  const fullName = get(infoUser, ["firstName"], "").concat(
    ` ${get(infoUser, ["lastName"], "")}`
  );
  const getClassItemNav = (routeItem) => {
    return cx(classes.itemNav, {
      [classes.activeRoute]: routeItem === routeActive,
      [classes.logoItemContainer]: routeItem === LOGO_ITEM,
    });
  };
  const getClassIcon = (routeItem) => {
    return cx(classes.iconContainer, {
      [classes.activeIcon]: routeItem === routeActive,
    });
  };

  const _allProps = {
    navbar: {
      hidden: !opened,
      hiddenBreakpoint: "lg",
      width: { lg: 320 },
      className: classes.navBarContainer,
    },
    boxContainer: {
      className: classes.boxContainer,
    },
    navbarSection: {
      grow: true,
      component: ScrollArea,
    },
    perfilContainer: {
      className: classes.perfilContainer,
    },
    itemNav: (name) => {
      return {
        className: getClassItemNav(name),
      };
    },
    iconNav: (name) => {
      return {
        className: getClassIcon(name),
      };
    },
    avatar: (avatarUrl) => {
      return {
        radius: "xxl",
        size: "lg",
        src: avatarUrl,
        alt: "Profile Image",
        className: classes.avatar,
      };
    },
    avatarContainer: {
      className: classes.avatarContainer,
      onClick: () => {
        dispatch(setNavigation(ROUTES_NAMES.PROFILE));
      },
    },
    avatarFilter: {
      className: classes.avatarFilter,
    },
    chevronRight: {
      size: "lg",
      className: classes.chevron,
      onClick: () => {
        dispatch(setNavigation(ROUTES_NAMES.PROFILE));
      },
    },
  };

  return (
    <Navbar {..._allProps.navbar}>
      <Box {..._allProps.boxContainer}>
        <Navbar.Section {..._allProps.navbarSection}>
          <MediaQuery largerThan="lg" styles={{ display: "none" }}>
            <Box {..._allProps.itemNav(LOGO_ITEM)}>
              <Image
                style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                src={LogoInter}
                alt="Logo interinvestments"
              />
            </Box>
          </MediaQuery>
          {CRM_ROUTES.map((val, index) => {
            if (val.useInNavbar)
              return (
                <Box {..._allProps.itemNav(val.name)} key={index}>
                  <Box {..._allProps.iconNav(val.name)}>{val.icon()}</Box>
                  <Text style={{ fontSize: "18px" }}>{val.label}</Text>
                </Box>
              );
            return null;
          })}
        </Navbar.Section>
        <Navbar.Section>
          <Box {..._allProps.perfilContainer}>
            <Box {..._allProps.avatarContainer}>
              <Avatar {..._allProps.avatar(avatarUrl)} />
              <Box {..._allProps.avatarFilter} />
            </Box>
            <Box>
              <Text style={{ fontSize: "16px" }} weight={700}>
                {fullName}
              </Text>
              <Text style={{ fontSize: "12px" }} weight={400}>
                {email}
              </Text>
            </Box>
            <ChevronRight {..._allProps.chevronRight} />
          </Box>
        </Navbar.Section>
      </Box>
    </Navbar>
  );
};

export default NavBarDashboard;
