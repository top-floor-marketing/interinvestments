import { ActionIcon, Tooltip } from "@mantine/core";
import { useClipboard } from '@mantine/hooks';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const CustomIconTooltip = (props) => {

    const clipboard = useClipboard({ timeout: 2000 });

    const onClickAction = () => {
        if (props.onClick)
            props.onClick()
        else
            clipboardCopy()
    }

    const clipboardCopy = () => {
        clipboard.copy(`${props.labelTooltip}`)
    }

    return (
        <Tooltip 
            position="top"
            color={clipboard.copied ? "success" : "dark"}
            placement={clipboard.copied ? "end" : "center"}
            label={(clipboard.copied) ? "Copied!" : props.labelTooltip}
            className={props.className}>
            <ActionIcon {...omit(props, ['labelTooltip', 'url'])} onClick={() => onClickAction()}>
                {props.children}
            </ActionIcon>
        </Tooltip>
    );
};

// Specifies the default values for props:
CustomIconTooltip.defaultProps = {
    children: null,
    className: "",
    url: "",
    labelTooltip: "No link found!",
    size: 16,
    color: "dark",
    onClick: null
};

CustomIconTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    url: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    labelTooltip: PropTypes.string,
    onClick: PropTypes.func
};

export default CustomIconTooltip;
