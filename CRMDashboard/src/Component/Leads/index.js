
import { createStyles, Box } from '@mantine/core';

// local storage
import { useLocalStorage } from "@mantine/hooks";
import { LOCAL_STORAGE } from '../../Utils/globalConstants';

// routes 
import { ROUTES_NAMES } from '../../Route/routes';

// redux global 
import { useSelector } from 'react-redux';

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
        gap: theme.other.spacing.p4,
    },
}));

const Leads = () => {

    const { classes } = useStyles();

    const { route } = useSelector((state) => state.user);

    const [leadIdDetail, setLeadDetailIdLocalStorage] = useLocalStorage({
        key: LOCAL_STORAGE.LEAD_DETAIL_ID,
        defaultValue: null,
    });

    return (
        <LeadsProvider>
            <SpringDiv delay={200} duration={400}>
                <Box className={classes.container}>
                    {
                        (route === ROUTES_NAMES.LEADS_DETAILS) ?
                            <>
                                <SpringDiv delay={400} duration={200}>
                                    LEADS DETAILS
                                </SpringDiv>
                            </>
                            :
                            <>
                                <SpringDiv delay={400} duration={200}>
                                    <SearchBox />
                                </SpringDiv>
                                <SpringDiv delay={600} duration={200}>
                                    <LeadsTable />
                                </SpringDiv>
                            </>
                    }
                </Box>
            </SpringDiv>
        </LeadsProvider>
    )
}

export default Leads;