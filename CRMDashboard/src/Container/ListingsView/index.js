import { Box, createStyles, Paper, Text } from "@mantine/core";
import { DatabaseOff } from 'tabler-icons-react';
import SpringDiv from "../../Component/SpringDiv";

//import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";
// import { ROUTES_NAMES } from "../../Route/routes";

import useGetListings from './hooks/useGetListings';
import SkeletonListing from './skeletonListing';
import FilterOptions from './filterOptions';
import VirtualAllListings from './virtualAllListings';

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "100%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
  },
  containerListings: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  virtualAllListings: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  noData: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center"
  }
}));

const ListingFinder = () => {

  const { classes } = useStyles();

  //const { state: { route } } = useClientGlobalStore();

  const { isLoading, isSkeleton, allListings, categoryProps, neiProps, searchProps,  totalData, refetchData } = useGetListings();

  return (
    (isSkeleton)
      ?
      <SkeletonListing />
      :
      <Box className={classes.container}>
        <SpringDiv delay={100} duration={300} >
          <FilterOptions 
          isLoading={isLoading}
          searchProps={searchProps}
          categoryProps={categoryProps}
          neiProps={neiProps} />
        </SpringDiv>
        <SpringDiv delay={300} duration={300} fullHeight>
          <Paper className={classes.containerListings}>
            {
              (totalData) ?
                <VirtualAllListings
                  parentClassname={classes.virtualAllListings}
                  name="all_listings"
                  data={allListings}
                  totalData={totalData}
                  refetch={refetchData}
                  isLoading={isLoading}
                /> :
                <div className={classes.noData}>
                  <Text component="h4">No data found</Text>
                  <DatabaseOff size={36} />
                </div>
            }
          </Paper>
        </SpringDiv>
      </Box>
  )
}

export default ListingFinder;