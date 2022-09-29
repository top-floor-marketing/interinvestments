import { memo } from 'react';
import { Box, createStyles, Paper, Avatar } from "@mantine/core";

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
        padding: theme.other.spacing.p4
    },
}));

const CardAgent = (props) => {
    const { classes } = useStyles();

    return (
        <Paper className={classes.container}>
            <Avatar
                radius="_40px"
                size="lg"
                src={get(props, ["avatarProfile"], "")}
            />
        </Paper>
    )
};

export default memo(CardAgent);
