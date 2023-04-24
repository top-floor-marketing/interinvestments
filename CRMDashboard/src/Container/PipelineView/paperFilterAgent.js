import { createStyles, Paper, Text, getStylesRef } from "@mantine/core";
import { INPUT_BORDER_BOTTOM } from "../../MatineProvider/stylesProvider";

import SelectAgent from "../../Component/DrawerAddLeads/Steps/SelectAgent";

import get from 'lodash/get';

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
        width: "350px",
        ...INPUT_BORDER_BOTTOM,
        [`${theme.fn.largerThan(2100)}`]: {
            width: "400px !important",
        },
        [`${theme.fn.smallerThan(600)}`]: {
            width: "70% !important",
        },
    },
}));

const PaperFilterAgent = ({ idAgent, setIdAgent, refecthAll }) => {

    const { classes } = useStyles();

    const verifyRefetchAllPipeline = (val) => {
        const idAgent = get(val, ["id"], null);
        if(!idAgent) {
            refecthAll();
        }
        setIdAgent(val)
    }

    return (
        <Paper className={classes.container}>
            <Text className={classes.textFilter}>Filter by agent:</Text>
            <SelectAgent cssClass={classes.selectNei} useLabel={false}
                localOnChange={verifyRefetchAllPipeline}
                localValue={idAgent}
            />
        </Paper>
    );
}

export default PaperFilterAgent;
