// mantine
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
    containerBadgeSelect: {
        width: "100%"
    },
    textInput: {
        color: theme.colors.white[0],
        fontSize: '18px',
        fontWeight: '400'
    },
    input: {
        background: theme.colors.primary[4],
        paddingLeft: '90px !important',
        border: 'none',
        fontWeight: '700 !important',
        textAling: 'left'
    },
    iconSection: {
        width: '40%',
        display: 'flex',
        paddingLeft: '10px !important',
        justifyContent: 'flex-start'
    },
    ChevronIcon: {
        cursor: 'pointer',
        width: '36px',
        height: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default useStyles