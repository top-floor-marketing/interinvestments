import { triggerPdfListing } from "./eventsListener";
import { Box } from "@mantine/core";
import PropTypes from 'prop-types';

const PdfListener = ({ children, idListing, idAgent, idElement }) => {
    // idListing: int, idAgent: int, idElement: string, agentType: string
    // CreateListingPDF plugin
    const clickForTrigger = () => {
        const data = {
            idListing,
            idAgent,
            idElement
        }
        triggerPdfListing(data);
    }
    return (
        <Box onClick={() => clickForTrigger()}>
            {children}
        </Box>
    )
}

PdfListener.defaultProps = {
    children: null,
    idListing: null,
    idAgent: null,
}

PdfListener.propTypes = {
    children: PropTypes.node,
    idListing: PropTypes.number,
    idAgent: PropTypes.number,
}

export default PdfListener;