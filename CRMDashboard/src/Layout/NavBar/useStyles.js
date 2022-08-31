import { createStyles } from "@mantine/core";
import { COLOR_SCHEME_DARK } from "../../GlobalStore/useActionsTheme";

// Navbar createStyles
export default createStyles((theme, _params, getRef) => ({
  navBarContainer: {
    backgroundColor:
      theme.colorScheme === COLOR_SCHEME_DARK
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
    boxShadow: theme.shadows.md,
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
    position: "relative",
    color: theme.colors.white[0],
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: theme.other.spacing.p4,
    padding: theme.other.spacing.p4,
    alignItems: "center",
    transition: "all",
    transitionDuration: 700,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      cursor: "pointer",
    },
    [`&:hover .${getRef("iconContainer")}`]: {
      backgroundColor: theme.colors.primary[6],
    },
  },
  activeRoute: {
    position: "absolute",
    width: "7px",
    height: "35%",
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
    left: 0,
    backgroundColor: theme.colors.white[0],
  },
  activeIcon: {
    backgroundColor: theme.colors.primary[0],
  },
  perfilContainer: {
    position: "relative",
    color: theme.colors.white[0],
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: theme.other.spacing.p2,
    padding: theme.other.spacing.p4,
    alignItems: "center",
    transition: "all",
    transitionDuration: 700,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    marginTop: "auto",
    alignSelf: "flex-end",
    borderTop: `1px solid ${theme.colors.gray[2]}`,
    "&:hover": {
      cursor: "pointer",
      [`&:hover .${getRef("avatarFilter")}`]: {
        backgroundColor: theme.fn.rgba(theme.colors.white[1], 0.1),
        display: "block",
      },
    },
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
