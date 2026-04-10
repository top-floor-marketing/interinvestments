import { Text, createStyles, Paper, Select, SegmentedControl, TextInput, getStylesRef } from "@mantine/core";
import { useElementSize } from '@mantine/hooks';

import { BuildingCommunity, Search } from 'tabler-icons-react';
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import { INPUT_BORDER_BOTTOM } from "../../MatineProvider/stylesProvider";

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p4,
    height: "auto",
    minHeight: "50px",
    alignItems: "center",
    flexWrap: "wrap",
    [`${theme.fn.smallerThan("md")}`]: {
      flexDirection: "column",
      gap: theme.other.spacing.p2,
    },
    [`${theme.fn.smallerThan("lg")}`]: {
      gap: theme.other.spacing.p2,
    },
    [`${theme.fn.largerThan(1800)}`]: {
      [`.${getStylesRef("selectNei")}`]: {
        minWidth: "250px",
        maxWidth: "250px",
      },
      [`.${getStylesRef("inputSearch")}`]: {
        minWidth: "250px",
        maxWidth: "250px",
      },
    },
  },
  textFilter: {
    ref: getStylesRef("textFilter"),
    fontWeight: 700,
    fontSize: "18px",
    minWidth: "50px",
    height: "fit-content",
  },
  selectNei: {
    ref: getStylesRef("selectNei"),
    width: _params?.usingCheck ? "150px" : "200px",
    ...INPUT_BORDER_BOTTOM,
    [`${theme.fn.largerThan(2100)}`]: {
      width: "250px !important",
    },
    [`${theme.fn.smallerThan(600)}`]: {
      width: "70% !important",
    },
  },
  inputSearch: {
    ref: getStylesRef("inputSearch"),
    width: _params?.usingCheck ? "150px" : "200px",
    ...INPUT_BORDER_BOTTOM,
    [`${theme.fn.largerThan(2100)}`]: {
      width: "250px !important",
    },
    [`${theme.fn.smallerThan(600)}`]: {
      width: "70% !important",
    },
  },
  segmentedControl: {
    [`${theme.fn.smallerThan(600)}`]: {
      width: "70% !important",
    },
  },
}));

const FilterOptions = ({ categoryProps, searchProps, neiProps, isLoading, isCheck }) => {

  const { classes } = useStyles({usingCheck: isCheck});

  const { state: { user: { listingCategories, listingNei } } } = useClientGlobalStore();

  const { ref, width } = useElementSize();

  return (
    <Paper ref={ref} className={classes.container}>
      <Text className={classes.textFilter}>Filter:</Text>
      <SegmentedControl
        disabled={isLoading}
        value={categoryProps.value}
        onChange={categoryProps.onChange}
        data={listingCategories}
        fullWidth
        transitionProps={{ transition: 'pop-top-left', duration: 0, timingFunction: 'ease' }}
        orientation={width > 600 ? "horizontal" : "vertical"}
        className={classes.segmentedControl}
      />
      <Select
        value={neiProps.value}
        onChange={neiProps.onChange}
        data={listingNei}
        disabled={isLoading}
        transition="pop-top-left"
        transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
        transitionTimingFunction="ease"
        placeholder="Neighborhood"
        icon={<BuildingCommunity size={14} />}
        className={classes.selectNei}
        clearable 
      />
      <TextInput
        disabled={isLoading}
        className={classes.inputSearch}
        rightSection={<Search size={14} />}
        placeholder="Search"
        value={searchProps.value}
        onChange={searchProps.onChange}
      />
    </Paper>
  );
};

export default FilterOptions;
