import React from 'react'
// mantine
import { Timeline, Text, createStyles } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons';


const useStyles = createStyles((theme, _params, getRef) => ({
    timeline: {
        marginBottom: theme.other.spacing.p4,
        height: '370px',
        overflow: 'auto'
    }
}))

const TimelineLeads = () => {
    const { classes } = useStyles();
    return (
        <Timeline
            styles={{ itemBody: { paddingLeft: '12px' } }}
            className={classes.timeline}
            active={6}
            bulletSize={24}
            lineWidth={2}
        >
            <Timeline.Item
                bullet={<IconGitBranch size={16} color="white" />}
                title="New branch"
                color={'info'}
            >
                <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
                <Text size="xs" mt={4}>2 hours ago</Text>
            </Timeline.Item>

            <Timeline.Item color={'error'} bullet={<IconGitCommit size={16} color="white" />} title="Commits" >
                <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
                <Text size="xs" mt={4}>52 minutes ago</Text>
            </Timeline.Item>

            <Timeline.Item color={'primary'} title="Pull request" bullet={<IconGitPullRequest size={16} color="white" />}>
                <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
                <Text size="xs" mt={4}>34 minutes ago</Text>
            </Timeline.Item>

            <Timeline.Item color={'primary'} title="Pull request" bullet={<IconGitPullRequest size={16} color="white" />}>
                <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
                <Text size="xs" mt={4}>34 minutes ago</Text>
            </Timeline.Item>

            <Timeline.Item color={'secondary'} title="Code review" bullet={<IconMessageDots size={16} color="white" />}>
                <Text color="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
                <Text size="xs" mt={4}>12 minutes ago</Text>
            </Timeline.Item>

            <Timeline.Item color={'secondary'} title="Code review" bullet={<IconMessageDots size={16} color="white" />}>
                <Text color="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
                <Text size="xs" mt={4}>12 minutes ago</Text>
            </Timeline.Item>
        </Timeline>
    );
}

export default TimelineLeads