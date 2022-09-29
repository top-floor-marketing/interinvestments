import { Box, Card, createStyles, Skeleton } from "@mantine/core";

import useGetProfileInfo from "./useGetProfileInfo";

import MyProfileActions from "./myProfileActions";
import InfoAgent from "./infoAgent";

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => ({
  cardContainer: {
    width: "100%",
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
    gap: theme.other.spacing.p4
  },
}));

const ProfileCard = ({ idAgent }) => {
  const { classes } = useStyles();

  const { isLoading, dataAgent, isSkeleton, refetchData } = useGetProfileInfo({ idAgent });

  return (
    <Skeleton visible={isSkeleton} className={classes.cardContainer}>
      <Card className={classes.cardContainer}>
        <Box className={classes.boxContainer}>
          {
            (!idAgent)
            &&
            <MyProfileActions
              dataAgent={dataAgent}
              id={get(dataAgent, ["id"], null)}
              isLoading={isLoading}
              refetchData={refetchData}
            />
          }
          <InfoAgent dataAgent={dataAgent} />
        </Box>
      </Card>
    </Skeleton>
  );
};

export default ProfileCard;
