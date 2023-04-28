import { createStyles, Paper, TextInput, Box, Button, Text, getStylesRef } from "@mantine/core";

import SelectStateLeads from "../../Component/SelectStateLeads";

import { Search, Plus } from "tabler-icons-react";

import { INPUT_BORDER_BOTTOM } from "../../MatineProvider/stylesProvider";

import { HoccDraewerAL } from "../../Component/DrawerAddLeads";

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
  buttonAdd: {
    marginLeft: "auto !important",
    [`${theme.fn.smallerThan(600)}`]: {
      width: "70% !important",
      marginLeft: "0 !important",
    },
  },
  textFilter: {
    ref: getStylesRef("textFilter"),
    fontWeight: 700,
    fontSize: "18px",
    minWidth: "50px",
    height: "fit-content",
  },
}));

const FilterOptions = ({
  searchProps,
  selectStateProps,
  isLoading,
  refetch
}) => {

  const { classes } = useStyles();

  return (
    <Paper className={classes.container}>
       <Text className={classes.textFilter}>Filter:</Text>
      <TextInput
        disabled={isLoading}
        className={classes.inputSearch}
        rightSection={<Search size={14} />}
        placeholder="Search"
        defaultValue={searchProps.value}
        onChange={searchProps.onChange}
      />
      <Box className={classes.filterState}>
        <SelectStateLeads
          {...selectStateProps}
          disabled={isLoading}
          placeholder="Status"
          isFilter
        />
      </Box>
      <HoccDraewerAL
       title='Add New Leads'
       onSuccessAddLeads={() => refetch()}
     >
      <Button
           className={classes.buttonAdd}
            color="dark"
            leftIcon={<Plus size={12} />}
          >
            Add Lead
          </Button>
     </HoccDraewerAL>

    </Paper>
  );
};

export default FilterOptions;
