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
import useGetAdminPipeline from './hook/useGetAdminPipeline';
import PaperFilterAgent from './paperFilterAgent';

import { USER_ROLES_CRM, PIPELINE_STATUS } from '../../GlobalStore/utils';

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
            margin: 0,
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
            [`@media (min-width: ${theme.breakpoints.md})`]: {
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

    const { ref, width } = useElementSize();

    const [idAgentForAdmin, setIdAgentForAdmin] = useState(null);
    const [openedMOdal, setOpenedModal] = useState(false);
    const [valueSelect, setvalueSelect] = useState(false);
    const [valueUserPipeline, setValueUserPipeline] = useState(null)

    const { classes } = useStyles({ width });

    // all pipeline for admin
    const { data: dataAllPipeline, isLoading: isLoadingAll, refetch: refecthAll } = useGetAdminPipeline({ agentType });

    const getIdForPipeline = () => {
        if (agentType === USER_ROLES_CRM.ADMIN) {
            return get(idAgentForAdmin, ["id"], null);
        }
        return databaseId;
    }

    const { data: dataNotContacted, refetch: reFetchNotContacted, isLoading: isLoadingNotContacted } =
        useGetPipelineLeads({ agentId: getIdForPipeline(), agentSelected: idAgentForAdmin, statusId: getInfoState(PIPELINE_STATUS.NOT_CONTACTED) });
    const { data: dataContacted, refetch: reFetchContacted, isLoading: isLoadingContacted } =
        useGetPipelineLeads({ agentId: getIdForPipeline(), agentSelected: idAgentForAdmin, statusId: getInfoState(PIPELINE_STATUS.CONTACTED) });
    const { data: dataShowing, refetch: reFetchShowing, isLoading: isLoadingShowing } =
        useGetPipelineLeads({ agentId: getIdForPipeline(), agentSelected: idAgentForAdmin, statusId: getInfoState(PIPELINE_STATUS.SHOWING) });
    const { data: dataContract, refetch: reFetchContract, isLoading: isLoadingContract } =
        useGetPipelineLeads({ agentId: getIdForPipeline(), agentSelected: idAgentForAdmin, statusId: getInfoState(PIPELINE_STATUS.CONTRACT) });
    const { data: dataASk, refetch: reFetchAsk, isLoading: isLoadingAsk } =
        useGetPipelineLeads({ agentId: getIdForPipeline(), agentSelected: idAgentForAdmin, statusId: getInfoState(PIPELINE_STATUS.ASK_REFERRALS) });

    const refechPipeline = (prevState, newState) => {
        if (getInfoState(PIPELINE_STATUS.NOT_CONTACTED) === prevState || getInfoState(PIPELINE_STATUS.NOT_CONTACTED) === newState)
            reFetchNotContacted()
        if (getInfoState(PIPELINE_STATUS.CONTACTED) === prevState || getInfoState(PIPELINE_STATUS.CONTACTED) === newState)
            reFetchContacted()
        if (getInfoState(PIPELINE_STATUS.SHOWING) === prevState || getInfoState(PIPELINE_STATUS.SHOWING) === newState)
            reFetchShowing()
        if (getInfoState(PIPELINE_STATUS.CONTRACT) === prevState || getInfoState(PIPELINE_STATUS.CONTRACT) === newState)
            reFetchContract()
        if (getInfoState(PIPELINE_STATUS.ASK_REFERRALS) === prevState || getInfoState(PIPELINE_STATUS.ASK_REFERRALS) === newState)
            reFetchAsk()
    }

    const USING_FULL_PIPELINE = (agentType === USER_ROLES_CRM.ADMIN && !idAgentForAdmin);

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <LoadingOverlay
                visible={(
                    isLoadingNotContacted ||
                    isLoadingContacted ||
                    isLoadingShowing ||
                    isLoadingContract ||
                    isLoadingAsk
                    || isLoadingAll
                )}
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
                    && <PaperFilterAgent idAgent={idAgentForAdmin} refecthAll={refecthAll} setIdAgent={setIdAgentForAdmin} />
                }

                <Text className={classes.titlePipeline} component='h3'>
                    Pipeline
                </Text>

                <Box className={classes.containerPipeline} ref={ref}>
                    <Box className={classes.containerColPipeline}>
                        <PipelineColumnVirtual
                            data={USING_FULL_PIPELINE ? dataAllPipeline.dataNotContacted : dataNotContacted}
                            totalData={USING_FULL_PIPELINE ? dataAllPipeline.dataNotContacted.length : dataNotContacted.length}
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
                            data={USING_FULL_PIPELINE ? dataAllPipeline.dataContacted : dataContacted}
                            totalData={USING_FULL_PIPELINE ? dataAllPipeline.dataContacted.length : dataContacted.length}
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
                            data={USING_FULL_PIPELINE ? dataAllPipeline.dataShowing : dataShowing}
                            totalData={USING_FULL_PIPELINE ? dataAllPipeline.dataShowing.length : dataShowing.length}
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
                            data={USING_FULL_PIPELINE ? dataAllPipeline.dataContract : dataContract}
                            totalData={USING_FULL_PIPELINE ? dataAllPipeline.dataContract.length : dataContract.length}
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
                            data={USING_FULL_PIPELINE ? dataAllPipeline.dataASk : dataASk}
                            totalData={USING_FULL_PIPELINE ? dataAllPipeline.dataASk.length : dataASk.length}
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