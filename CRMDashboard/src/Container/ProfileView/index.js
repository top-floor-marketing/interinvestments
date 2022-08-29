import { Box, createStyles } from "@mantine/core";
import SpringDiv from "../../Component/SpringDiv";
// components
import ProfileCard from "./ProfileCard";
import RecentLeads from "./RecentLeads";
import FeaturedListing from "./FeaturedListing";

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    height: "100%"
  },
  infoAndLeadsRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p4,
    [`${theme.fn.smallerThan("md")}`]: {
      flexDirection: "column",
    }
  },
  featuredListingRow: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
}));

const Profile = () => {
  const { classes } = useStyles();
  return (
    <SpringDiv delay={100} duration={200} fullHeight>
      <Box className={classes.container}>
        <SpringDiv delay={300} duration={300}>
          <Box className={classes.infoAndLeadsRow}>
            <ProfileCard />
            <RecentLeads />
          </Box>
        </SpringDiv>
        <SpringDiv delay={600} duration={300} fullHeight>
          <Box className={classes.featuredListingRow}>
            <FeaturedListing />
          </Box>
        </SpringDiv>
      </Box>
    </SpringDiv>
  );
};

export default Profile;
