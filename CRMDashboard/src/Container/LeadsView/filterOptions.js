import {
  Text,
  createStyles,
  Paper,
  Select,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";

import { BuildingCommunity, Search } from "tabler-icons-react";
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
  },
  inputSearch: {
    width: "250px !important",
    ...INPUT_BORDER_BOTTOM,
    [`${theme.fn.smallerThan(600)}`]: {
      width: "100%",
    },
  },
}));

const FilterOptions = ({
  searchProps,
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
    </Paper>
  );
};

export default FilterOptions;
