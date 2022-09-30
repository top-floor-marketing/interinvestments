import React, { useState, useCallback, memo } from 'react'
// mantine 
import { Box, Text, createStyles, LoadingOverlay } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
// components
import ModalChangePipeline from '../../Component/ModalChangePipeline'
import PipelineItem from './PipelineItem'
import { PipelineColumnVirtual } from '../../Component/VirtualListContainer';
// hook
import useGetPipelineLeads from './hook/useGetPipelineLeads';

import useClientGlobalStore from '../../GlobalStore/useClientGlobalStore';
import PaperFilterAgent from './paperFilterAgent';

import { USER_ROLES_CRM } from '../../GlobalStore/utils';

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
                infoUser: { databaseId, agentType },
            },
            global: {
                statusUserLead: listStatus,
            },
        },
    } = useClientGlobalStore();

    const getInfoState = useCallback((label) => {
        return get(filter(listStatus, (val) => toLower(val.label) === toLower(label)), ["0", "value"], 0);
    }, [listStatus]);

    const [idAgentForAdmin, setIdAgentForAdmin] = useState(null);
    const [openedMOdal, setOpenedModal] = useState(false);
    const [valueSelect, setvalueSelect] = useState(false);
    const [valueUserPipeline, setValueUserPipeline] = useState(null)
    const { ref, width } = useElementSize();
    const { classes } = useStyles({ width });

    const getIdForPipeline = () => {
        if(agentType === USER_ROLES_CRM.ADMIN) {
            return get(idAgentForAdmin, ["id"], null);
        }
        return databaseId;
    }

    const { data: dataNotContacted, refetch: reFetchNotContacted, isLoading: isLoadingNotContacted } = useGetPipelineLeads({ agentId: getIdForPipeline(), statusId: getInfoState('Not Contacted') });
    const { data: dataContacted, refetch: reFetchContacted, isLoading: isLoadingContacted } = useGetPipelineLeads({ agentId: getIdForPipeline(), statusId: getInfoState('contacted') });
    const { data: dataShowing, refetch: reFetchShowing, isLoading: isLoadingShowing } = useGetPipelineLeads({ agentId: getIdForPipeline(), statusId: getInfoState('showing') });
    const { data: dataContract, refetch: reFetchContract, isLoading: isLoadingContract } = useGetPipelineLeads({ agentId: getIdForPipeline(), statusId: getInfoState('contract') });
    const { data: dataASk, refetch: reFetchAsk, isLoading: isLoadingAsk } = useGetPipelineLeads({ agentId: getIdForPipeline(), statusId: getInfoState('ask referrals') });

    const refechPipeline = (prevState, newState) => {
        if (getInfoState('Not Contacted') === prevState || getInfoState('Not Contacted') === newState)
            reFetchNotContacted()
        if (getInfoState('contacted') === prevState || getInfoState('contacted') === newState)
            reFetchContacted()
        if (getInfoState('showing') === prevState || getInfoState('showing') === newState)
            reFetchShowing()
        if (getInfoState('contract') === prevState || getInfoState('contract') === newState)
            reFetchContract()
        if (getInfoState('ask referrals') === prevState || getInfoState('ask referrals') === newState)
            reFetchAsk()
    }

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <LoadingOverlay
                visible={(
                    isLoadingNotContacted ||
                    isLoadingContacted ||
                    isLoadingShowing ||
                    isLoadingContract ||
                    isLoadingAsk
                ) || false}
                overlayBlur={0.5}
                overlayOpacity={0.4}
                overlayColor="#eaeae9"
                loaderProps={{ size: 'sm', color: '#ffb839', variant: 'bars' }}
            />
            <ModalChangePipeline
                refechPipeline={refechPipeline}
                valueUserPipeline={valueUserPipeline}
                setValueUserPipeline={setValueUserPipeline}
                openedMOdal={openedMOdal}
                setOpenedModal={setOpenedModal}
                valueSelect={valueSelect}
                setvalueSelect={setvalueSelect}
            />
            <Box className={classes.container}>

                {
                    (agentType === USER_ROLES_CRM.ADMIN)
                    && <PaperFilterAgent idAgent={idAgentForAdmin} setIdAgent={setIdAgentForAdmin} />
                }

               
                <Text className={classes.titlePipeline} component='h3'>
                    Pipeline
                    {
                       (agentType === USER_ROLES_CRM.ADMIN)
                       && ": ".concat(get(idAgentForAdmin, ["firstName"], "").concat(" ").concat(get(idAgentForAdmin, ["lastName"], "")))
                    }
                </Text>

                <Box className={classes.containerPipeline} ref={ref}>
                    <Box className={classes.containerColPipeline}>
                        <PipelineColumnVirtual
                            data={dataNotContacted}
                            totalData={dataNotContacted.length}
                            color='error'
                            title='Not Contacted'
                        >
                            <PipelineItem
                                setValueUserPipeline={setValueUserPipeline}
                                onClick={() => setOpenedModal(true)}
                                enabled={agentType !== USER_ROLES_CRM.ADMIN}
                            />
                        </PipelineColumnVirtual>
                    </Box>

                    <Box className={classes.containerColPipeline}>
                        <PipelineColumnVirtual
                            data={dataContacted}
                            totalData={dataContacted.length}
                            color='primary'
                            title='Contacted'
                        >
                            <PipelineItem
                                setValueUserPipeline={setValueUserPipeline}
                                onClick={() => setOpenedModal(true)}
                                enabled={agentType !== USER_ROLES_CRM.ADMIN}
                            />
                        </PipelineColumnVirtual>
                    </Box>

                    <Box className={classes.containerColPipeline}>
                        <PipelineColumnVirtual
                            data={dataShowing}
                            totalData={dataShowing.length}
                            color='secondary'
                            title='Showing'
                        >
                            <PipelineItem
                                setValueUserPipeline={setValueUserPipeline}
                                onClick={() => setOpenedModal(true)}
                                enabled={agentType !== USER_ROLES_CRM.ADMIN}
                            />
                        </PipelineColumnVirtual>
                    </Box>

                    <Box className={classes.containerColPipeline}>
                        <PipelineColumnVirtual
                            data={dataContract}
                            totalData={dataContract.length}
                            color='success'
                            title='Contract'
                        >
                            <PipelineItem
                                setValueUserPipeline={setValueUserPipeline}
                                onClick={() => setOpenedModal(true)}
                                enabled={agentType !== USER_ROLES_CRM.ADMIN}
                            />
                        </PipelineColumnVirtual>
                    </Box>

                    <Box className={classes.containerColPipeline}>
                        <PipelineColumnVirtual
                            data={dataASk}
                            totalData={dataASk.length}
                            color='info'
                            title='Ask Referrals'
                        >
                            <PipelineItem
                                setValueUserPipeline={setValueUserPipeline}
                                onClick={() => setOpenedModal(true)}
                                enabled={agentType !== USER_ROLES_CRM.ADMIN}
                            />
                        </PipelineColumnVirtual>
                    </Box>

                </Box>
            </Box>
        </div>
    )
}

export default memo(Pipeline)