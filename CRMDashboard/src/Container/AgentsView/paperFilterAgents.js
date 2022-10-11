import { createStyles, Paper, Text, TextInput } from "@mantine/core";
import { INPUT_BORDER_BOTTOM } from "../../MatineProvider/stylesProvider";
import { Search } from "tabler-icons-react";

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
    inputSearch: {
        width: "250px !important",
        ...INPUT_BORDER_BOTTOM,
        [`${theme.fn.smallerThan(600)}`]: {
            width: "70% !important",
        },
    },
}));

const PaperFilterAgents = ({ isLoading, searchProps }) => {

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
        </Paper>
    );
}

export default PaperFilterAgents;
