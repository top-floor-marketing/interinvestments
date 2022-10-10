import React from 'react'
import PropTypes from "prop-types";
// mantine
import { Text, Paper, createStyles, Box } from '@mantine/core';
import { CustomIconTooltip } from '../../Component/ActionButtons';
import { IconAdjustments } from '@tabler/icons';
// components
import AvatarText from '../../Component/AvatarText';
// utils
import omit from 'lodash/omit';

const useStyles = createStyles((theme, _params, getRef) => {
    return {
        PaperPipeline: {
            width: "100%",
            height: "100%",
            maxHeight: '70px',
            display: "flex",
            flexDirection: "row",
            gap: theme.other.spacing.p2,
            alignItems: 'center',
            paddingTop: theme.other.spacing.p2,
            paddingBottom: theme.other.spacing.p2,
            cursor: _params?.enabled ? "pointer" : "initial",
            '&:hover': {
                [`.${getRef("nameUserLead")}`]: {
                    fontWeight: "600"
                },
                [`.${getRef("customIconTooltip")}`]: {
                    backgroundColor: 'transparent',
                    color: theme.colors.dark[9],
                    transform: "scale(1.15)"
                },
            }
        },
        nameUserLead: {
            ref: getRef("nameUserLead"),
            wordBreak: "break-word",
            margin: '0px',
            fontSize: "14px",
            [`${theme.fn.smallerThan(1400)}`]: {
                fontSize: "12px",
            },
            textAlign: 'left'
        },
        modalBody: {
            display: "flex",
            flexDirection: 'column',
            gap: theme.other.spacing.p4,
        },
        boxDivider: {
            marginLeft: "auto",
            paddingLeft: theme.other.spacing.p1,
            paddingRight: theme.other.spacing.p1,
            borderLeft: `0.5px solid ${theme.colors.gray[5]}`,
            height: "100%"
        },
        customIconTooltip: {
            ref: getRef("customIconTooltip"),
            marginLeft: "auto"
        }
    }
});

const PipelineItem = (props) => {

    const { enabled, firstName, lastName, agentAvatar, agentFullName, onClick: onClickPaper, setValueUserPipeline } = props

    const { classes } = useStyles({ enabled })

    return (
        <Paper
            onClick={() => {
                if (enabled) {
                    onClickPaper()
                    setValueUserPipeline({ ...omit(props, ['onClick', 'setValueUserPipeline', 'children']) })
                }
            }}
            className={classes.PaperPipeline}
        >
            <AvatarText
                className={classes.avatarText}
                size={"30px"}
                firstName={firstName}
                lastName={lastName}
                src={null}
            />
            <Text className={classes.nameUserLead}
                component='span'
                lineClamp={2} title={`Lead: ${firstName} ${lastName}`}>
                {firstName}&nbsp;{lastName}
            </Text>
            {
                (!enabled && agentAvatar && agentFullName)
                &&
                <>
                    <Box className={classes.boxDivider} />
                    <AvatarText
                        size={"30px"}
                        firstName={agentFullName}
                        lastName={null}
                        src={agentAvatar}
                        tooltipLabel={`Agent: ${agentFullName}`}
                    />
                </>
            }
            {
                (enabled)
                &&
                <CustomIconTooltip className={classes.customIconTooltip} size={24} color="dark" labelTooltip="Edit Lead Status">
                    <IconAdjustments />
                </CustomIconTooltip>
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