import { Document, Font} from '@react-pdf/renderer';

import OutfitFont from '../../Assets/outfit-cdnfonts/OutfitRegular.ttf';

import get from 'lodash/get';
import words from 'lodash/words';

// pages
import PageOne from './pageOne';
import PageTwo from './pageTwo';
import PageThree from './pageThree';

import { FONT_FAMILY, INTERINVESTMENT } from './utils';

// Register font
Font.register({ family: FONT_FAMILY, fontStyle: "normal", fontWeight: "normal", src: OutfitFont });

const PdfDocument = ({ listing, agent }) => {

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
            <PageOne listing={listing} agent={agent} />
            <PageTwo listing={listing} agent={agent} />
            <PageThree listing={listing} agent={agent} />
        </Document>
    )
}

export default PdfDocument;