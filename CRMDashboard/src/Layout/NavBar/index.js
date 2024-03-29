import {
  Navbar,
  ScrollArea,
  Box,
  Text,
  Avatar,
  Image,
  MediaQuery,
} from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';

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

const NavBarDashboard = ({ opened, setOpened }) => {

  const {
    actions: { setRoute },
    state: {
      user: { infoUser },
      global: { route: routeInStore },
    },
  } = useClientGlobalStore();

  const matches = useMediaQuery('(max-width: 600px)');

  const { classes, cx } = useStyles();

  const is2XlScreen = useMediaQuery('(min-width: 1500px)');

  const routeActive = getRouteActive(routeInStore);

  const LOGO_ITEM = "_logo_";

  const agentType = get(infoUser, ["agentType"], null);
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
      [classes.activeIcon]: routeItem === routeActive || (ROUTES_NAMES.LEADS_DETAILS === routeActive && routeItem === ROUTES_NAMES.LEADS),
    });
  };

  const _allProps = {
    navbar: {
      hidden: !opened,
      hiddenBreakpoint: "lg",
      width: { lg: 200, xl_2: 260 },
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
        setOpened(false);
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
          setOpened(false);
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
        size: is2XlScreen ? "60px": "25px",
        radius: "_40px",
        src: avatarUrl,
        alt: "Profile Image",
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

  const routesByRole = CRM_ROUTES.filter((val) => val.useInNavbar && (val.roles.length === 0 || val.roles.includes(agentType)));

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
          {routesByRole.map((val, index) => {
              return (
                <Box {..._allProps.itemNav(val.name)} key={index}>
                  {routeActive === val.name && (
                    <div className={classes.activeRoute} />
                  )}
                  <Box {..._allProps.iconNav(val.name)}>{val.icon()}</Box>
                  <Text style={{ fontSize: "18px" }}>{val.label}</Text>
                </Box>
              );
          })}
        </Navbar.Section>
        <Navbar.Section style={{ marginBottom: (matches) ? "100px" : "0px" }}>
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
