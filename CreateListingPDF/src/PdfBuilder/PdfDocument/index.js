import { Document, Font, Page, Text  } from '@react-pdf/renderer';

import OutfitFont from '../../Assets/outfit-cdnfonts/OutfitRegular.ttf';

import get from 'lodash/get';
import words from 'lodash/words';

// pages
import PageOne from './pageOne';

const FONT_FAMILY = 'Outfit';
const INTERINVESTMENT = 'Interinvestments';

// Register font
Font.register({ family: FONT_FAMILY, fontStyle: "normal", fontWeight: "normal", src: OutfitFont   });

const PdfDocument = ({ listing, agent }) => {
    console.log("listing ", listing)
    console.log("agent ", agent)

    const DOCUMENT_METADATA = {
        title: get(listing, ["title"], INTERINVESTMENT),
        author: "Interinvestments",
        subject: "",
        keywords: words(get(listing, ["title"], INTERINVESTMENT)),
        creator: "Interinvestments",
        producer: "Interinvestments",
        pdfVersion: "1.0",
        language: "en",
       /*  pageMode: "fullScreen",
        pageLayout: "singlePage" */
    }

    return (
        <Document {...DOCUMENT_METADATA}>
            <PageOne listing={listing} />
        </Document>
    )
}

export default PdfDocument;