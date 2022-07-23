import { Box, createStyles, TextInput, Button } from "@mantine/core";

import { Search, Plus } from "tabler-icons-react";

import useLeadsStore from "../LeadsStore/useLeadsStore";

import get from 'lodash/get';
import { is } from "@react-spring/shared";

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: theme.other.spacing.p4
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
    const { state: { filter, isLoading }, actions: { setFilter } } = useLeadsStore();
    return (
        <Box className={classes.container}>
            <TextInput
                loading={isLoading}
                disabled={isLoading}
                placeholder="Search"
                rightSection={<Search />}
                value={get(filter, ["search"], "")}
                onChange={(e) => setFilter({ ...filter, search: e.currentTarget.value })}
                className={classes.searchInput}
            />
            <Button loading={isLoading} disabled={isLoading} className={classes.buttonAdd} color="dark" leftIcon={<Plus/>} size="sm">
                Add Lead
            </Button>
        </Box>
    );
};

export default SearchBox;
