// mantine
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
    containerMain: {
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        },
        gap: theme.other.spacing.p4
    },
    input: {
        width: '100%'
    },
    inputFull: {
        gridColumn: "1 / -1",
    },
    input_2: {
        gridColumn: 'span 2 / span 2'
    },
    radioSegment: {
        '.mantine-SegmentedControl-active': {
            display: 'none'
        }
    },
    NumberInput: {
        backgroundColor: theme.colors.white[0],
        borderColor: theme.colors.gray[6]
    },
    controllNumberInput: {
        backgroundColor: theme.colors.white[0],
        borderColor: theme.colors.gray[6],
        '&:hover': {
            backgroundColor: `${theme.colors.primary[9]} !important`,
            borderColor: theme.colors.primary[9],
            color: theme.colors.white[0]
        }
    },
    subTitle: {
        color: theme.colors.dark[0],
        fontSize: "16px",
        lineHeight: "20px",
        fontWeight: 700,
    },
    title: {
        '.mantine-Text-root': {
            fontSize: "18px !important",
            fontWeight: 700,
        }
    },
    boxConatinerTypeLeads: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    containerInterested: {
        width: '100%',
        height: '100%'
    },
    containerFinalSteps: {
        display: 'flex',
        padding: '14px',
        flexDirection: 'column',
        gap: '12px',
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            flexDirection: 'row',
        },
    },
    contedInterested: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    contendInfo: {
        width: '100%',
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            width: '40%'
        }
    },
    containerInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
    },
    BadgeFinalStepp: {
        '.mantine-Badge-leftSection': {
            height: '16px'
        }
    },
    linkPhone: {
        '&:hover': {
            color: `${theme.colors.primary[6]} !important`
        }
    },
    tittleInterested: {
        fontSize: '14px'
    },
    titleFinalStepIfo: {
        margin: '0px',
        color: theme.colors.secondary[6],
        fontSize: '22px'
    }
}));

export default useStyles