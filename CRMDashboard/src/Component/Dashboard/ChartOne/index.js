import { Card, createStyles, Text } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "100%",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p5,
    boxShadow: theme.shadows.md,
  },
  titleCard: {
    fontSize: "20px",
    fontWeight: "700",
  },
}));

const ChartOne = (props) => {
  const { classes } = useStyles();

  return (
      <Card className={classes.cardContainer}>
        <Text className={classes.titleCard}>Listing Stats</Text>
      </Card>
  );
};

export default ChartOne;
