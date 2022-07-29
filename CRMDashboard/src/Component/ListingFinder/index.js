import { Box, createStyles } from "@mantine/core";
import SpringDiv from "../SpringDiv";
// components

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    height: "100%",
    backgroundColor: theme.colors.success[5]
  },
  filtersRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p4,
    [`${theme.fn.smallerThan("md")}`]: {
      flexDirection: "column",
    }
  },
  listingRow: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
}));

const ListingFinder = () => {
  const { classes } = useStyles();
  return (
    <SpringDiv delay={200} duration={400} fullHeight>
      <Box className={classes.container}>

        <SpringDiv delay={300} duration={400}>
          <Box className={classes.infoAndLeadsRow}>
            
          </Box>
        </SpringDiv>

        <SpringDiv delay={600} duration={400} fullHeight>
          <Box className={classes.featuredListingRow}>
            
          </Box>
        </SpringDiv>

      </Box>
    </SpringDiv>
  );
};

export default ListingFinder;
