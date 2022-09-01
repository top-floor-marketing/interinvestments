import { Box, createStyles, Skeleton } from "@mantine/core";
import SpringDiv from "../../Component/SpringDiv";

const useStyles = createStyles((theme, _params) => ({
    container: {
        width: "100%",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4
    },
    containerFilter: {
        width: "100%",
        minHeight: "50px",
        display: "flex",
        flexDirection: "column",
    },
    containerListing: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    }
}));

const SkeletonListing = () => {

    const { classes } = useStyles();

    return (
        <Box className={classes.container}>
            <SpringDiv delay={100} duration={300} >
                <Skeleton visible className={classes.containerFilter}>
                </Skeleton>
            </SpringDiv>
            <SpringDiv delay={200} duration={300} fullHeight>
                <Skeleton visible className={classes.containerListing}>
                </Skeleton>
            </SpringDiv>
        </Box>

    )
}

export default SkeletonListing;