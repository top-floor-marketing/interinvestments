import { Box, createStyles, Skeleton, SegmentedControl, Text, Select } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';

import SpringDiv from "../SpringDiv";

import useGetListingFinder from "./useGetListingFinder";
import VirtualAllListings from "./virtualAllListings";

import { WrapperAgentListing } from '../Wrappers';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: theme.other.spacing.p8,
      height: "100%",
      minHeight: '400px' 
    }
  }
});

const ListingFinder = (props) => {
  console.log("props ", props);
  const { classes } = useStyles();
  return (
    <Box className={classes.container}>

    </Box>
  )
}

export default ListingFinder;
