import { Box, createStyles, Skeleton, SegmentedControl, Text, Select } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';

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
      gap: theme.other.spacing.p8,
      height: "100%",
      minHeight: (isSkeleton) ? '350px' : '400px'
    },
    filtersRow: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      gap: theme.other.spacing.p4,
      alignContent: "center",
      [`${theme.fn.smallerThan("md")}`]: {
        flexDirection: "column",
      },
      minHeight: (isSkeleton) ? '30px' : '20px'
    },
    textSearch: {
      height: "auto",
      alignSelf: "center",
      fontWeight: 700,
      fontSize: "14px"
    },
    listingRow: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      minHeight: (isSkeleton) ? '100px' : 'auto',
    },
    boxInfiniteLoader: {
      width: "100%",
      height: "100%",
      minHeight: "250px",
      maxHeight: "900px",
    }
  }

});

const ListingFinder = ({ arrayIdListings, useTagFeatured }) => {

  const { isSkeleton,
    allListings,
    isLoading,
    totalData,
    allCategories,
    onChangeCategory,
    categorySelect,
    allNei,
    neiSelect,
    onChangeNei,
    refetchData } = useGetListingFinder(arrayIdListings);

  const { classes } = useStyles({ isSkeleton });

  const matches = useMediaQuery('(max-width: 640px)');

  return (
    <SpringDiv delay={200} duration={400} fullHeight>
      <Text> ==== {JSON.stringify(isSkeleton)}</Text>
      <Box className={classes.container}>
        <SpringDiv delay={300} duration={400}>
          <Skeleton visible={isSkeleton} className={classes.filtersRow}>
            <Box className={classes.filtersRow}>
              <Text className={classes.textSearch} >Search for properties </Text>
              {
                (allCategories.length && categorySelect?.length) &&
                <SegmentedControl
                  disabled={isLoading}
                  fullWidth
                  orientation={matches ? 'vertical' : 'horizontal'}
                  value={categorySelect}
                  onChange={(val) => onChangeCategory(val)}
                  data={allCategories}
                  transitionDuration={0}
                />
              }
              {
                (allNei.length && neiSelect?.length) &&
                <Select
                  placeholder="Neighborhood"
                  value={neiSelect}
                  onChange={(val) => onChangeNei(val)} data={allNei} />
              }
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
                isAddListing={true}
                useTagFeatured={useTagFeatured}
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
  useTagFeatured: false
};

export default ListingFinder;
