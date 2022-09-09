import React, { useState, useCallback, memo } from 'react'
// mantine 
import { Box, Text, createStyles, Modal } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
// components
import PipelineItem from './PipelineItem'
import BodyModal from './BodyModal'
import { PipelineColumnVirtual } from '../../Component/VirtualListContainer';
// hook
import useGetPipelineLeads from './hook/useGetPipelineLeads';

import useClientGlobalStore from '../../GlobalStore/useClientGlobalStore';

import filter from 'lodash/filter';
import toLower from 'lodash/toLower';
import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => {

    // total de pixles del gap
    const gapTotal = theme.other.spacing.p4 * 4

    const validateWidthPipeline = () => {
        const { width } = _params
        if (width >= 764 && width <= 1000) {
            // min width
            return {
                width: '210px',
                minWidth: "210px"
            }
        }

        if (width >= 1001) {
            // total del (width - total del gap) / la cantidad de columnas
            return {
                width: `${(width - gapTotal) / 5}px`,
                minWidth: `${(width - gapTotal) / 5}px`,
            }
        }

        return {
            width: "100%",
        }
    }

    return {
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: theme.other.spacing.p4,
            position: "relative"
        },
        titlePipeline: {
            fontSize: '24px',
            fontWeight: '12px'
        },
        containerPipeline: {
            display: 'flex',
            width: "100%",
            gap: theme.other.spacing.p4,
            flexDirection: "column",
            height: '700px',
            overflow: 'auto',
            [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                flexDirection: 'row',
            },
        },
        modalBody: {
            display: "flex",
            flexDirection: 'column',
            gap: theme.other.spacing.p4,
        },
        containerColPipeline: {
            ...validateWidthPipeline()
        },
        noData: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            alignItems: "center",
            padding: theme.other.spacing.p8,
        },
    }
});


const Pipeline = () => {

    const {
        state: {
            user: {
                infoUser: { databaseId },
            },
            global: {
                statusUserLead: listStatus,
            },
        },
    } = useClientGlobalStore();

    const getInfoState = useCallback((label) => {
        return get(filter(listStatus, (val) => toLower(val.label) === toLower(label)), ["0", "value"], 0);
    }, [listStatus]);

    const [openedMOdal, setOpenedModal] = useState(false);
    const [valueSelect, setvalueSelect] = useState(false);
    const { ref, width } = useElementSize();
    const { classes } = useStyles({ width });

    const { data: dataNotContacted, refetch: reFetchNotContacted } = useGetPipelineLeads({ agentId: databaseId, statusId: getInfoState('Not Contacted') });
    const { data: dataContacted, refetch: reFetchContacted } = useGetPipelineLeads({ agentId: databaseId, statusId: getInfoState('contacted') });
    const { data: dataShowing, refetch: reFetchShowing } = useGetPipelineLeads({ agentId: databaseId, statusId: getInfoState('showing') });
    const { data: dataContract, refetch: reFetchContract } = useGetPipelineLeads({ agentId: databaseId, statusId: getInfoState('contract') });
    const { data: dataASk, refetch: reFetchAsk } = useGetPipelineLeads({ agentId: databaseId, statusId: getInfoState('ask referrals') });

    return (
        <Box className={classes.container}>
            <Modal
                opened={openedMOdal}
                onClose={() => setOpenedModal(false)}
                title="Lorem ipsum dolor sit amet,"
            >
                <Box className={classes.modalBody}>
                    <BodyModal valueSelect={valueSelect} setvalueSelect={setvalueSelect} />
                </Box>
            </Modal>

            <Text className={classes.titlePipeline} component='h3'>Pipeline</Text>
            <Box className={classes.containerPipeline} ref={ref}>

                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={dataNotContacted}
                        totalData={dataNotContacted.length}
                        color='error'
                        title='Not Contacted'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>

                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={dataContacted}
                        totalData={dataContacted.length}
                        color='primary'
                        title='Contacted'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>


                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={dataASk}
                        totalData={dataASk.length}
                        color='info'
                        title='Ask Referrals'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>

                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={dataContract}
                        totalData={dataContract.length}
                        color='success'
                        title='Contract'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>

                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={dataShowing}
                        totalData={dataShowing.length}
                        color='secondary'
                        title='Showing'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>

            </Box>
        </Box>
    )
}

export default memo(Pipeline)