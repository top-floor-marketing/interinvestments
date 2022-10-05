import React from 'react'
import PropTypes from "prop-types";
// mantine
import { Text, Paper, createStyles } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons';
// components
import AvatarText from '../../Component/AvatarText';
// utils
import omit from 'lodash/omit';

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
    const { firstName, lastName, onClick: onClickPaper, setValueUserPipeline } = props

    return (
        <Paper
            onClick={() => {
                if (props.enabled) {
                    onClickPaper()
                    setValueUserPipeline({ ...omit(props, ['onClick', 'setValueUserPipeline', 'children']) })
                }
            }}
            className={classes.PaperPipeline}
        >
            <AvatarText
                size={"40px"}
                firstName={firstName}
                lastName={lastName}
            />
            <Text className={classes.nameUserLead} component='p' lineClamp={1} title={`${firstName} ${lastName}`}>
                {firstName}&nbsp;{lastName}
            </Text>
            {
                (props.enabled)
                &&
                <ActionIcon size="lg" color="dark">
                    <IconAdjustments size={24} />
                </ActionIcon>
            }
        </Paper>
    );

}

PipelineItem.defaultProps = {
    state: 6,
    onClick: () => { },
    nameLeads: 'Use it to create cards',
    enabled: true
}

PipelineItem.propTypes = {
    state: PropTypes.number || null,
    nameLeads: PropTypes.string,
    onClick: PropTypes.func,
    enabled: PropTypes.bool
};

export default PipelineItem