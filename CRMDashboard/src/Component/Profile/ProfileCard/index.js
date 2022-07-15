import { Box, Card, createStyles, Text } from "@mantine/core";

import { ShareAgent, EditModal } from "../../ActionButtons";

import useGetProfileInfo from "./useGetProfileInfo";

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
    gap: theme.other.spacing.p5
  },
  myProfileActions: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: theme.other.spacing.p3,
    justifyContent: "space-between",
    alignContent: "center"
  },
  titleCard: {
    fontSize: "16px",
    fontWeight: 700,
  },
  shareButton: {
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    borderRadius: "10px",
  },
  editButton: {
    marginTop: "auto",
    marginBottom: "auto"
  }
}));

const ProfileCard = (props) => {
  const { classes } = useStyles();

  const { isLoading } = useGetProfileInfo();

  return (
      <Card className={classes.cardContainer}>
        <Box className={classes.boxContainer}>
          <Box className={classes.myProfileActions}>
            <Text className={classes.titleCard}>My profile</Text>
            <ShareAgent className={classes.shareButton} />
            <EditModal className={classes.editButton}/>
          </Box>
        </Box>
      </Card>
  );
};

export default ProfileCard;
