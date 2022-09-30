import { Box, Paper, createStyles, Skeleton } from "@mantine/core";

import useGetProfileInfo from "./useGetProfileInfo";

import MyProfileActions from "./myProfileActions";
import InfoAgent from "./infoAgent";
import LeadsAgent from "./leadsAgent";

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minHeight: "200px",
    boxShadow: theme.shadows.sm,
    height: "100%",
    gap: theme.other.spacing.p4,
    [theme.fn.smallerThan(700)]: {
      flexDirection: "column",
    }
  },
  boxInfoAgent: {
    display: "flex",
    flexDirection: "column",
    width: (_params?.idAgent) ? "60%" : "100%",
    [theme.fn.smallerThan(700)]: {
      width: "100%",
    },
    height: "100%",
    gap: theme.other.spacing.p4
  },
  boxLeadsAgent: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    [theme.fn.smallerThan(700)]: {
      width: "100%",
    },
    height: "100%",
  }
}));

const ProfileCard = ({ idAgent = null }) => {

  const { classes } = useStyles({ idAgent });

  const { isLoading, dataAgent, isSkeleton, refetchData } = useGetProfileInfo({ idAgent });

  return (
    <Skeleton visible={isSkeleton} className={classes.cardContainer}>
      <Box className={classes.container}>
        <Paper className={classes.boxInfoAgent}>
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
        </Paper>
        {
          (idAgent)
          &&
          <Paper className={classes.boxLeadsAgent}>
            <LeadsAgent idAgent={idAgent} />
          </Paper>
        }
      </Box>
    </Skeleton>
  );
};

export default ProfileCard;
