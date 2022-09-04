import { Box, createStyles, Paper, Text, LoadingOverlay } from "@mantine/core";
import { DatabaseOff } from 'tabler-icons-react';
import SpringDiv from "../../Component/SpringDiv";

import PropTypes from 'prop-types'

import useGetListings from './hooks/useGetListings';
import SkeletonListing from './skeletonListing';
import FilterOptions from './filterOptions';

import { ListingVirtual } from "../../Component/VirtualListContainer";

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    position: "relative",
    '.mantine-Overlay-root': {
      borderRadius: "10px !important"
    }
  },
  containerListings: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative"
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
    alignItems: "center",
    padding: theme.other.spacing.p8
  }
}));

const ListingFinder = ({ usingAddAndRemove, isCheck }) => {

  const { classes } = useStyles();

  const { isLoading, isOverlay, isSkeleton, allListings, categoryProps, neiProps, searchProps, totalData, refetchData, onConfirmAdd,
    onConfirmRemove } = useGetListings();

  return isSkeleton ? (
    <SkeletonListing />
  ) : (
    <Box className={classes.container}>
      <LoadingOverlay
        overlayOpacity={0.05}
        visible={isOverlay}
        overlayBlur={0.05}
      />
      <SpringDiv delay={100} duration={300}>
        <FilterOptions
          isCheck={isCheck}
          isLoading={isLoading}
          searchProps={searchProps}
          categoryProps={categoryProps}
          neiProps={neiProps}
        />
      </SpringDiv>
      <SpringDiv delay={300} duration={300} fullHeight>
        <Paper className={classes.containerListings}>
          {isLoading && !isOverlay && (
            <LoadingOverlay
              overlayOpacity={0.05}
              visible={isLoading}
              overlayBlur={0.05}
            />
          )}
          {totalData ? (
            <ListingVirtual
              usingAddAndRemove={usingAddAndRemove}
              isCheck={isCheck}
              data={allListings}
              totalData={totalData}
              refetch={refetchData}
              isLoading={isLoading}
              onConfirmAdd={onConfirmAdd}
              onConfirmRemove={onConfirmRemove}
            />
          ) : (
            <div className={classes.noData}>
              <Text component="h4">No data found</Text>
              <DatabaseOff size={36} />
            </div>
          )}
        </Paper>
      </SpringDiv>
    </Box>
  );
}

ListingFinder.defaultProps = {
  isCheck: false,
  usingAddAndRemove: true
}

ListingFinder.propTypes = {
  isCheck: PropTypes.bool,
  usingAddAndRemove: PropTypes.bool
};

export default ListingFinder;
