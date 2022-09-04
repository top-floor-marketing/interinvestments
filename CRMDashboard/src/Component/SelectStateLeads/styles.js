// mantine
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
    dropdownSelect: {
        borderRadius: "10px",
        padding: '8px',
        cursor: "pointer !important"
    },
    select: {
        '.mantine-Select-rightSection': {
            'svg': {
                width: '24px',
                height: '24px',
                color: `${theme.colors.white[0]} !important`
            }
        }
    },
    primary: {
        '&[data-selected]': {
            backgroundColor: theme.colors.primary[8],
            color: theme.colors.white[0],
        },
        '&[data-hovered]': {
            backgroundColor: theme.colors.primary[8],
            color: theme.colors.white[0],
        },
        '&:hover': {
            backgroundColor: theme.colors.primary[8],
            color: theme.colors.white[0],
        }
    },
    error: {
        '&[data-selected]': {
            backgroundColor: theme.colors.error[8],
            color: theme.colors.white[0],
        },
        '&[data-hovered]': {
            borderColor: theme.colors.error[8],
            backgroundColor: theme.colors.error[8],
            color: theme.colors.white[0],
        },
        '&:hover': {
            borderColor: theme.colors.dark,
            color: theme.colors.white[0],
            backgroundColor: theme.colors.error[8],
        }
    },
    secondary: {
        '&[data-selected]': {
            backgroundColor: theme.colors.secondary[8],
            color: theme.colors.white[0],
        },
        '&[data-hovered]': {
            backgroundColor: theme.colors.secondary[8],
            color: theme.colors.white[0],
        },
        '&:hover': {
            color: theme.colors.white[0],
            backgroundColor: theme.colors.secondary[8],
        }
    },
    success: {
        '&[data-selected]': {
            backgroundColor: theme.colors.success[8],
            color: theme.colors.white[0],
        },
        '&[data-hovered]': {
            backgroundColor: theme.colors.success[8],
            color: theme.colors.white[0],
        },
        '&:hover': {
            color: theme.colors.white[0],
            backgroundColor: theme.colors.success[8],
        }
    },
    info: {
        '&[data-selected]': {
            backgroundColor: theme.colors.info[8],
            color: theme.colors.white[0],
        },
        '&[data-hovered]': {
            backgroundColor: theme.colors.info[8],
            color: theme.colors.white[0],
        },
        '&:hover': {
            color: theme.colors.white[0],
            backgroundColor: theme.colors.info[8],
        }
    },
    inputSelect: {
        border: '0px',
        textAlign: 'center',
        paddingLeft: '30px',
        paddingRight: '35px',
        fontSize: '18px',
        fontWeight: '600',
        backgroundColor: theme.colors.gray[9],
    },
    selectPrimary: {
        color: theme.colors.white[0],
        backgroundColor: theme.colors.primary[8]
    },
    selectError: {
        color: theme.colors.white[0],
        backgroundColor: theme.colors.error[8]
    },
    selectSecondary: {
        color: theme.colors.white[0],
        backgroundColor: theme.colors.secondary[8]
    },
    selectSuccess: {
        color: theme.colors.white[0],
        backgroundColor: theme.colors.success[8]
    },
    selectInfo: {
        color: theme.colors.white[0],
        backgroundColor: theme.colors.info[8]
    }
}));

export default useStyles