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
}));

export default useStyles