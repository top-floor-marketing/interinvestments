
import { createStyles, Box } from '@mantine/core';

// components
import SpringDiv from '../SpringDiv';
import SearchBox from './SearchBox';
import PipelineTable from './PipelineTable';

// pipeline context-store
import PipelineProvider from './PipelineStore/pipelineProvider';

const useStyles = createStyles((theme, _params) => ({
    container: {
        width: "100%",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p5,
    },
}));

const Pipeline = () => {

    const { classes } = useStyles();

    return (
        <PipelineProvider>
            <SpringDiv delay={200} duration={400}>
                <Box className={classes.container}>
                    <SpringDiv delay={400} duration={200}>
                        <SearchBox />
                    </SpringDiv>
                    <SpringDiv delay={600} duration={200}>
                        <PipelineTable />
                    </SpringDiv>
                </Box>
            </SpringDiv>
        </PipelineProvider>
    )
}

export default Pipeline;