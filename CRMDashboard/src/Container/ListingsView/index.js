import useGetListings from './hooks/useGetListings';

import SkeletonListing from './skeletonListing';

const ListingFinder = () => {

  const { isSkeleton, isError, allListings } = useGetListings();
  
  return ( 
    <SkeletonListing />
  )
}

/*
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
*/

export default ListingFinder;
