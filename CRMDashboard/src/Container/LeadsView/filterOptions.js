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
    [`${theme.fn.smallerThan("md")}`]: {
      flexDirection: "column",
      gap: theme.other.spacing.p2,
    },
    [`${theme.fn.smallerThan("lg")}`]: {
      gap: theme.other.spacing.p2,
    },
    [`${theme.fn.largerThan(1800)}`]: {
      [`.${getRef("selectNei")}`]: {
        minWidth: "250px",
        maxWidth: "250px",
      },
      [`.${getRef("inputSearch")}`]: {
        minWidth: "250px",
        maxWidth: "250px",
      },
    },
  },
  textFilter: {
    ref: getRef("textFilter"),
    fontWeight: 700,
    fontSize: "18px",
    minWidth: "50px",
    height: "fit-content",
  },
  selectNei: {
    ref: getRef("selectNei"),
    width: _params?.usingCheck ? "150px" : "200px",
    ...INPUT_BORDER_BOTTOM,
    [`${theme.fn.largerThan(2100)}`]: {
      width: "250px !important",
    },
    [`${theme.fn.smallerThan(600)}`]: {
      width: "100%",
    },
  },
  inputSearch: {
    ref: getRef("inputSearch"),
    width: _params?.usingCheck ? "150px" : "200px",
    ...INPUT_BORDER_BOTTOM,
    [`${theme.fn.largerThan(2100)}`]: {
      width: "250px !important",
    },
    [`${theme.fn.smallerThan(600)}`]: {
      width: "100%",
    },
  },
  segmentedControl: {
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
