import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: theme.other.spacing.p3,
        justifyContent: "space-between",
        alignContent: "center"
    },
    titleCard: {
        fontSize: "18px",
        fontWeight: 700,
    },
    shareButton: {
        marginLeft: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        borderRadius: "10px",
    },
    editButton: {
        marginTop: "auto",
        marginBottom: "auto"
    },
    boxTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: theme.other.spacing.p2,
    },
    titleModal: {
        margin: "0px !important",
        padding: "0px !important",
        color: theme.colors.dark[0],
        fontSize: "18px",
        lineHeight: "20px",
        fontWeight: 700,
    },
    containerForm: {
        paddingRight: "5px !important",
        width: "100%",
        display: "grid",
        maxHeight: "1500px",
        height: "calc(85vh - 100px)",
        [`${theme.fn.largerThan(1600)}`]: {
            height: "calc(90vh - 100px)",
        },
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: theme.other.spacing.p4,
        marginBottom: theme.other.spacing.p4,
        [`${theme.fn.smallerThan(750)}`]: {
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            height: "calc(80vh - 100px)",
        },
        [`${theme.fn.smallerThan(400)}`]: {
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            height: "calc(75vh - 100px)",
        },
        ".mantine-RichTextEditor-toolbar": {
            display: "none !important"
        }
    },
    buttonSubmit: {
        marginTop: "auto !important",
        marginLeft: "auto !important"
    },
    avatarHover: {
        ref: getRef('avatarHover'),
        display: 'none',
        position: 'absolute',
        zIndex: 1,
        borderRadius: '50px',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.dark[9],
        opacity: '0.4'
    },
    containerAvatar: {
        '&:hover': {
            cursor: 'pointer'
        },
        [`&:hover .${getRef('avatarHover')}`]: {
            display: 'block'
        },
        [`&:hover .${getRef('overlayLabel')}`]: {
            display: 'block'
        }
    },
    inputAvatar: {
        display: 'none',
    },
    overlayLabel: {
        ref: getRef('overlayLabel'),
        color: theme.colors.white,
        fontSize: '17px',
        width: 'min-content',
        lineHeight: '20px',
        fontWeight: '600',
        display: 'none',
        position: 'absolute',
        zIndex: 1,
    },
    contentAvatar: {
        position: 'relative',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarForm: {
        marginTop: '1rem',
        '.mantine-Indicator-indicator': {
            padding: '0px !important',
            'svg': {
                padding: '5px'
            }
        }
    },
    gridColumnFull: {
        gridColumn: "1 / -1",
        width: "100%"
    },
    labelAboutMe: {
        display: "inline-block",
        fontSize: "14px",
        fontWeight: 500,
        color: "#1b1b1b",
        wordBreak: "break-word",
        cursor: "col-resize"
    }
}));

export default useStyles