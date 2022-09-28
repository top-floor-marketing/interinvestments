import React from 'react'
// mantine
import { Box, Button } from '@mantine/core';
import { FileDownload } from 'tabler-icons-react';

import { triggerPdfListing } from './listenerPDF.js';

import toInteger from 'lodash/toInteger';

// styles
import stylesGlobal from '../../styles.global.module.scss';

const URL_QUERY_ID_NAME = 'agent-id';

const ButtonProgress = ({ idListing }) => {

    const idElementButtonPdf = 'idElementButtonPdf';

    const createPDFListing = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const idInUrl = toInteger(queryParams.get(URL_QUERY_ID_NAME));
        const details = {
            idElement: idElementButtonPdf,
            idListing: idListing || null,
            idAgent: idInUrl || null
        }
        triggerPdfListing(details);
    }

    return (
        <Box className={stylesGlobal.genericLisFlex} 
                data-aos-once="true"
                data-aos-delay='700'
                data-aos-duration='1000'
                data-aos="fade-right"
        >
                <Button
                    id={idElementButtonPdf}
                    onClick={() => createPDFListing()}
                    className={stylesGlobal.buttonAll}
                    radius="lg"
                    size="lg"
                    rightIcon={<FileDownload />}
                    uppercase
                >
                    Download PDF Property
                </Button>
        </Box>
    )
}

export default ButtonProgress