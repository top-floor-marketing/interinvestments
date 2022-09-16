import { memo } from 'react';
import { Box, createStyles } from '@mantine/core';
import PropTypes from 'prop-types';

import mapRender from './mapRender';

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
    },
}));

const PdfPlugin = (props) => {
    const { classes } = useStyles();
    return (
        <Box className={classes.container}>
            <mapRender />
        </Box>
    )
}

PdfPlugin.defaultProps = {
    idListing: null,
}

PdfPlugin.propTypes = {
    idListing: PropTypes.number
};

export default memo(PdfPlugin);