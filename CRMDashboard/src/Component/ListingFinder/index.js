import { Box, createStyles, Skeleton } from "@mantine/core";
import SpringDiv from "../SpringDiv";

import useGetListingFinder from "./useGetListingFinder";
import VirtualAllListings from "./virtualAllListings";

const useStyles = createStyles((theme, _params, getRef) => {
  const { isSkeleton } = _params;
  return {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: theme.other.spacing.p4,
      height: "100%",
      minHeight: (isSkeleton) ? '350px' : '400px'
    },
    filtersRow: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      gap: theme.other.spacing.p4,
      [`${theme.fn.smallerThan("md")}`]: {
        flexDirection: "column",
      },
      minHeight: (isSkeleton) ? '150px' : '20px'
    },
    listingRow: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      minHeight: (isSkeleton) ? '250px' : 'auto',
    },
    boxInfiniteLoader: {
      width: "100%",
      height: "100%",
      minHeight: "250px",
      maxHeight: "900px",
    }
  }

});
//arrayIdListings
const ListingFinder = ({ arrayIdListings }) => {
  
  const { isSkeleton,
    allListings,
    isLoading,
    totalData, 
    refetchData  } = useGetListingFinder(arrayIdListings);

  const { classes } = useStyles({ isSkeleton });

  return (
    <SpringDiv delay={200} duration={400} fullHeight>
      <Box className={classes.container}>
        <SpringDiv delay={300} duration={400}>
          <Skeleton visible={isSkeleton} className={classes.filtersRow}>
            <Box className={classes.filtersRow}>

            </Box>
          </Skeleton>
        </SpringDiv>

        <SpringDiv delay={600} duration={400} fullHeight>
          <Skeleton visible={isSkeleton} className={classes.listingRow}>
            <Box className={classes.listingRow}>
              <VirtualAllListings
                parentClassname={classes.boxInfiniteLoader}
                name="all_listings"
                data={allListings}
                totalData={totalData}
                refetch={refetchData}
                isLoading={isLoading}
              />
            </Box>
          </Skeleton>
        </SpringDiv>

      </Box>
    </SpringDiv>
  );
};

ListingFinder.defaultProps = {
  arrayIdListings: [],
};

export default ListingFinder;
