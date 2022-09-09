import React from 'react'
import PropTypes from "prop-types";
// components
// import useModalPipeline from './useModalPipeline'
// mantine
import { Text, Paper, createStyles } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons';

import AvatarText from '../../Component/AvatarText';

const useStyles = createStyles((theme, _params) => {
    return {
        PaperPipeline: {
            width: "100%",
            height: "100%",
            maxHeight: '70px',
            display: "flex",
            flexDirection: "row",
            gap: theme.other.spacing.p2,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '0px',
            paddingBottom: '0px'
        },
        nameUserLead: {
            margin: '0px',
            textAlign: 'left'
        },
        Avatar: {
            '.mantine-Avatar-placeholder': {
                color: theme.colors.gray[6]
            },
            borderRadius: '30px'
        },
        modalBody: {
            display: "flex",
            flexDirection: 'column',
            gap: theme.other.spacing.p4,
        }
    }
});

const PipelineItem = (props) => {

    const { classes } = useStyles()
    const { firstName, lastName, onClick: onClickPaper } = props

    return (
        <Paper onClick={() => onClickPaper()} className={classes.PaperPipeline}>
             <AvatarText
                size={"40px"}
                firstName={firstName}
                lastName={lastName}
            />
            <Text className={classes.nameUserLead} component='p' lineClamp={1} title={`${firstName} ${lastName}`}>
                {firstName}&nbsp;{lastName}
            </Text>
            <ActionIcon size="lg">
                <IconAdjustments size={30} />
            </ActionIcon>
        </Paper>
    );
    
}

PipelineItem.defaultProps = {
    state: 6,
    onClick: () => { },
    nameLeads: 'Use it to create cards'
}

PipelineItem.propTypes = {
    state: PropTypes.number || null,
    nameLeads: PropTypes.string,
    onClick: PropTypes.func
};

export default PipelineItem