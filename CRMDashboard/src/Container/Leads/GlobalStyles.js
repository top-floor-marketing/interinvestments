// mantine
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.other.spacing.p4,
        [theme.fn.smallerThan('md')]: {
            flexDirection: 'column',
            height: '230px',
            [`.${getRef('containerInputSearch')}`]: {
                width: '100%'
            },
            [`.${getRef('ButtonAddLead')}`]: {
                width: '100%',
                marginLeft: 'none'
            },
            [`.${getRef('containerBadge')}`]: {
                width: '100% !important'
            }
        },
        [theme.fn.smallerThan('xl')]: {
            [`.${getRef('containerBadge')}`]: {
                width: '37%'
            }
        }
    },
    ButtonAddLead: {
        ref: getRef('ButtonAddLead'),
        marginLeft: 'auto'
    },
    containerInputSearch: {
        ref: getRef('containerInputSearch'),
        width: '40%'
    },
    containerBadge: {
        ref: getRef('containerBadge'),
        width: '25%',
        display: 'flex',
        justifyContent: 'start'
    },
    cardLeads: {
        height: '100%'
    },
    containerTimeLine: {
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: theme.other.spacing.p4
    },
    contentInfoLeads: {
        width: '25%',
        padding: theme.other.spacing.p4
    },
    contentTimeLIne: {
        width: '75%',
        padding: theme.other.spacing.p4
    },
    textContactInfo: {
        fontSize: '18px',
        fontWeight: '600'
    },
    containerContactInfo: {
        marginTop: '18px',
        marginBottom: '18px'
    }
}));

export default useStyles