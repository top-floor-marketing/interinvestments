import { Box, Card, createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "67%",
    minHeight: "200px",
    boxShadow: theme.shadows.sm,
    height: "100%",
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

const ProfileCard = (props) => {
  const { classes } = useStyles();

  return (
      <Card className={classes.cardContainer}>
        <Box className={classes.boxContainer}>ProfileList</Box>
      </Card>
  );
};

export default ProfileCard;
