import { Box, createStyles, TextInput, Button } from "@mantine/core";

import { Search, Plus } from "tabler-icons-react";

import usePipelineStore from "../PipelineStore/usePipelineStore";

import get from 'lodash/get';

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: theme.other.spacing.p5
    },
    searchInput: {
        minWidth: "250px"
    },
    buttonAdd: {
        "&:hover": {
            backgroundColor: theme.fn.rgba(theme.colors.dark[0], 0.9)
        }
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
            <Button className={classes.buttonAdd} color="dark" leftIcon={<Plus/>} size="sm">
                Add Lead
            </Button>
        </Box>
    );
};

export default SearchBox;
