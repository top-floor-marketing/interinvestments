import { Text, createStyles, Paper, Select, SegmentedControl, TextInput } from "@mantine/core";
import { useElementSize } from '@mantine/hooks';

import { BuildingCommunity, Search } from 'tabler-icons-react';
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import { INPUT_BORDER_BOTTOM } from "../../MatineProvider/stylesProvider";

const useStyles = createStyles((theme, _params, getRef) => ({
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
      [`.${getRef('selectNei')}`]: {
        minWidth: "250px",
        maxWidth: "250px",
      },
      [`.${getRef('inputSearch')}`]: {
        minWidth: "250px",
        maxWidth: "250px",
      }
    }
  },
  textFilter: {
    ref: getRef('textFilter'),
    fontWeight: 700,
    fontSize: "18px",
    minWidth: "50px",
    height: "fit-content"
  },
  selectNei: {
    ref: getRef('selectNei'),
    minWidth: "200px",
    maxWidth: "200px",
    ...INPUT_BORDER_BOTTOM
  },
  inputSearch: {
    ref: getRef('inputSearch'),
    minWidth: "200px",
    maxWidth: "200px",
    ...INPUT_BORDER_BOTTOM
  }
}));

const FilterOptions = ({ categoryProps, searchProps, neiProps, isLoading }) => {

  const { classes } = useStyles();

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
        transitionDuration={0}
        orientation={(width>450) ? 'horizontal' : 'vertical'}
        />
      <Select value={neiProps.value}
        onChange={neiProps.onChange}
        data={listingNei}
        disabled={isLoading}
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        placeholder="Neighborhood"
        icon={<BuildingCommunity size={14} />}
        className={classes.selectNei}
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
