import { createStyles, Paper, TextInput, Box } from "@mantine/core";

import SelectStateLeads from "../../Component/SelectStateLeads";

import { Search } from "tabler-icons-react";

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
    [`${theme.fn.smallerThan(700)}`]: {
      flexDirection: "column",
    },
  },
  inputSearch: {
    width: "250px !important",
    ...INPUT_BORDER_BOTTOM,
    [`${theme.fn.smallerThan(600)}`]: {
      width: "70% !important",
    },
  },
  filterState: {
    width: "250px !important",
    [`${theme.fn.smallerThan(600)}`]: {
      width: "70% !important",
    },
  },
}));

const FilterOptions = ({
  searchProps,
  selectStateProps,
  isLoading,
}) => {

  const { classes } = useStyles();

  return (
    <Paper className={classes.container}>
      <TextInput
        disabled={isLoading}
        className={classes.inputSearch}
        rightSection={<Search size={14} />}
        placeholder="Search"
        value={searchProps.value}
        onChange={searchProps.onChange}
      />
      <Box className={classes.filterState}>
        <SelectStateLeads
          {...selectStateProps}
          disabled={isLoading}
          placeholder="Filter by status"
          isFilter
        />
      </Box>
    </Paper>
  );
};

export default FilterOptions;
