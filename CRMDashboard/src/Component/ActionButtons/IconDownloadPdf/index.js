import { useState, useEffect } from 'react';
import { ActionIcon, Tooltip } from "@mantine/core";
import { FileDownload } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import PdfListener from "../../PdfListener";

import omit from 'lodash/omit';

const IconDownloadPdf = (props) => {
  const idElement = `pdf_${props.idListing}`;
  const [disableRender, setDisableRender] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisableRender(false);
    }, 1500);
  }, [])
  return (
    <PdfListener idAgent={props.idAgent} idListing={props.idListing}  idElement={idElement}>
      <Tooltip multiline
        position="top"
        color={"dark"}
        placement={"center"}
        label={props.labelTooltip}
        className={props.className}>

        <ActionIcon id={idElement} {...omit(props, ['labelTooltip', 'idListing', 'idAgent'])} disabled={disableRender} >
          <FileDownload size={props.size} />
        </ActionIcon>

      </Tooltip>
    </PdfListener>
  );
};

// Specifies the default values for props:
IconDownloadPdf.defaultProps = {
  className: "",
  variant: "hover",
  size: 20,
  labelTooltip: "Download Property PDF",
  idListing: null,
  idAgent: null,
  color: "dark"
};

IconDownloadPdf.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
  idListing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  idAgent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default IconDownloadPdf;
