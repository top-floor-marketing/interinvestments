// mantine
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
    containerMain: {
        width: "100%",
        height: '100%',
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4
    },
    containerFilterLeads: {
        width: "100%",
        minHeight: "50px",
        display: "flex",
        flexDirection: "column",
    },
    containerLeads: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardFilters: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.other.spacing.p4
    },
    containerInputSearch: {
        width: '40%'
    },
    containerBadge: {
        width: '25%',
        display: 'flex',
        justifyContent: 'start'
    },
    selectBadge: {
        background: theme.colors.blue[4]
    },
    cardLeads: {
        height: '100%'
    }
}));

export default useStyles