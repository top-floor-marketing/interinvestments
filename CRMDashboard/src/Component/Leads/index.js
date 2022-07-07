
import { createStyles, Box } from '@mantine/core';

// components
import SpringDiv from '../SpringDiv';
import SearchBox from './SearchBox';
import LeadsTable from './LeadsTable';

// pipeline context-store
import LeadsProvider from './LeadsStore/leadsProvider';

const useStyles = createStyles((theme, _params) => ({
    container: {
        width: "100%",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p5,
    },
}));

const Leads = () => {

    const { classes } = useStyles();

    return (
        <LeadsProvider>
            <SpringDiv delay={200} duration={400}>
                <Box className={classes.container}>
                    <SpringDiv delay={400} duration={200}>
                        <SearchBox />
                    </SpringDiv>
                    <SpringDiv delay={600} duration={200}>
                        <LeadsTable />
                    </SpringDiv>
                </Box>
            </SpringDiv>
        </LeadsProvider>
    )
}

export default Leads;