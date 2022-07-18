import { Box, Card, createStyles, Text } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
  cardContainer: {
    width: "100%",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows.sm,
    height: "auto",
  },
  titleCard: {
    fontSize: "18px",
    fontWeight: 700,
  },
}));

const FeaturedListing = (props) => {
  const { classes } = useStyles();

  return (
      <Card className={classes.cardContainer}>
        <Text className={classes.titleCard}>Featured listings</Text>
      </Card>
  );
};

export default FeaturedListing;
