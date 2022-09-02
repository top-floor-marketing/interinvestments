import {
  Navbar,
  ScrollArea,
  Box,
  Text,
  Avatar,
  Image,
  MediaQuery,
} from "@mantine/core";

import { ChevronRight } from "tabler-icons-react";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";
import { CRM_ROUTES, ROUTES_NAMES } from "../../Route/routes";

import { getRouteActive } from "../../GlobalStore/utils";

import LogoInter from "../../Assets/logo-inter.svg";

import get from "lodash/get";

import useStyles from "./useStyles";

const URL_QUERY_ID_NAME = "agent-id";
const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const NavBarDashboard = ({ opened }) => {

  const { actions: { setRoute }, state: { user: { route: routeInStore, infoUser } } } = useClientGlobalStore();

  const { classes, cx } = useStyles();

  const routeActive = getRouteActive(routeInStore);

  const LOGO_ITEM = "_logo_";

  const avatarUrl = get(infoUser, ["avatarProfile"], null);
  const email = get(infoUser, ["email"], null);
  const fullName = get(infoUser, ["firstName"], "").concat(
    ` ${get(infoUser, ["lastName"], "")}`
  );
  const databaseId = get(infoUser, ["databaseId"], null);
  const getClassItemNav = (routeItem) => {
    return cx(classes.itemNav, {
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
      width: { lg: 280 },
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
      onClick: () => {
        setRoute(ROUTES_NAMES.PROFILE);
      },
    },
    itemNav: (name) => {
      let uriForLogo = '';
      if(databaseId && name === LOGO_ITEM) {
        uriForLogo = `${DOMAIN_URL}?${URL_QUERY_ID_NAME}=${databaseId}&shared=true`
      }
      return {
        className: getClassItemNav(name),
        onClick: () => {
          if (uriForLogo !== '') window.open(uriForLogo, '_blank');
          else setRoute(name);
        },
      };
    },
    iconNav: (name) => {
      return {
        className: getClassIcon(name),
      };
    },
    avatar: (avatarUrl) => {
      return {
        radius: "_40px",
        size: "lg",
        src: avatarUrl,
        alt: "Profile Image",
        className: classes.avatar,
      };
    },
    avatarContainer: {
      className: classes.avatarContainer,
      onClick: () => {
        setRoute(ROUTES_NAMES.PROFILE);
      },
    },
    avatarFilter: {
      className: classes.avatarFilter,
    },
    chevronRight: {
      size: "lg",
      className: classes.chevron,
      onClick: () => {
        setRoute(ROUTES_NAMES.PROFILE);
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
                  {routeActive === val.name && (
                    <div className={classes.activeRoute} />
                  )}
                  <Box {..._allProps.iconNav(val.name)}>{val.icon()}</Box>
                  <Text style={{ fontSize: "18px" }}>{val.label}</Text>
                </Box>
              );
            return null;
          })}
        </Navbar.Section>
        <Navbar.Section>
          <Box {..._allProps.perfilContainer}>
            {routeActive === ROUTES_NAMES.PROFILE && (
              <div className={classes.activeRoute} />
            )}
            <Box {..._allProps.avatarContainer}>
              <Avatar {..._allProps.avatar(avatarUrl)} />
              <Box {..._allProps.avatarFilter} />
            </Box>
            <Box>
              <Text style={{ fontSize: "14px" }} weight={700} lineClamp={1} title={fullName}>
                {fullName}
              </Text>
              <Text style={{ fontSize: "10px" }} weight={400} lineClamp={1} title={email}>
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
