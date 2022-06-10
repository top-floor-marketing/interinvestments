import { Box, createStyles, TextInput } from "@mantine/core";

import { Search } from "tabler-icons-react";

import usePipelineStore from "../PipelineStore/usePipelineStore";

import get from 'lodash/get';

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        minHeight: "100px",
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        gap: theme.other.spacing.p5
    },
    searchInput: {
        minWidth: "300px"
    }
}));

const SearchBox = () => {
    const { classes } = useStyles();
    const { state: { filter }, actions: { setFilter } } = usePipelineStore();
    return (
        <Box className={classes.container}>
            <TextInput
                placeholder="Search"
                rightSection={<Search />}
                value={get(filter, ["search"], "")}
                onChange={(e) => setFilter({ ...filter, search: e.currentTarget.value })}
                className={classes.searchInput}
            />
        </Box>
    );
};

export default SearchBox;
