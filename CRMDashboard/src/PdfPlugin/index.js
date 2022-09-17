import { memo } from 'react';
import { Box, createStyles } from '@mantine/core';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet } from '@react-18-pdf/renderer';

import mapRender from './mapRender';

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
    },
}));

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const PdfPlugin = (props) => {
    const { classes } = useStyles();
    return (
 <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
    )
    /* return (
        <Box className={classes.container}>
           <mapRender />
        </Box>
    ) */
}

PdfPlugin.defaultProps = {
    idListing: null,
}

PdfPlugin.propTypes = {
    idListing: PropTypes.number
};

export default memo(PdfPlugin);