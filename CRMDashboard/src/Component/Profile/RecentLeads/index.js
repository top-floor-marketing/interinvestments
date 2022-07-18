import { Box, Card, createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
  cardContainer: {
    width: "33.3%",
    minHeight: "200px",
    boxShadow: theme.shadows.sm,
    height: "auto",
    [`${theme.fn.smallerThan("md")}`]: {
      width: "100%",
    }
  },
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
}));

const RecentLeads = (props) => {
  const { classes } = useStyles();

  return (
      <Card className={classes.cardContainer}>
        <Box className={classes.boxContainer}>Recent leads</Box>
      </Card>
  );
};

export default RecentLeads;
