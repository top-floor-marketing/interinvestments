import { Box, createStyles } from "@mantine/core";
import SpringDiv from "../SpringDiv";
// components
import ProfileCard from "./ProfileCard";
import Contacts from "./Contacts";
import MyListings from "./MyListings";

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p5
  },
  infoAndLeadsRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p5,
    [`${theme.fn.smallerThan("md")}`]: {
      flexDirection: "column",
    }
  },
  leadsRow: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p5
  }
}));

const Profile = () => {
  const { classes } = useStyles();
  return (
    <SpringDiv delay={200} duration={400}>
      <Box className={classes.container}>

        <SpringDiv delay={300} duration={400}>
          <Box className={classes.infoAndLeadsRow}>
            <ProfileCard />
            <MyListings />
          </Box>
        </SpringDiv>

        <SpringDiv delay={600} duration={400}>
          <Box className={classes.leadsRow}>
            <Contacts />
          </Box>
        </SpringDiv>

      </Box>
    </SpringDiv>
  );
};

export default Profile;
