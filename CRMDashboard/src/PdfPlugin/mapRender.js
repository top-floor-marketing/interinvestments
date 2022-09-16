import { memo } from 'react';
import { Box, createStyles } from '@mantine/core';
import PropTypes from 'prop-types';

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
        backgroundColor: theme.colors.success[0]
    },
}));

const MapRender = (props) => {
    const { classes } = useStyles();
    return (
        <Box className={classes.container}>

        </Box>
    )
}

MapRender.defaultProps = {
    idListing: null,
}

MapRender.propTypes = {
    idListing: PropTypes.number
};

export default memo(MapRender);