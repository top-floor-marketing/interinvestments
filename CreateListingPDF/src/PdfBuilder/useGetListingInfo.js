import { useState } from 'react';
import { useQueryHelper } from '../GraphqlClient/useRequest';

import { GET_LISTING_FOR_PDF } from '../GraphqlClient/listing.gql';
import { GET_AGENT_PROFILE_INFO, AGENT_ROLES } from '../GraphqlClient/agent.gql';

import {
    incrementNavigationProgress,
    stopNavigationProgress,
} from '@mantine/nprogress';

import get from 'lodash/get';

const useGetListingInfo = ({ idListing, idAgent }) => {

    const [infoForPdf, setInfoForPdf] = useState({ listing: null, agent: null });

    const getVariablesForAgent = () => {
        if (parseInt(idAgent) > 0) {
            return {
                agentId: idAgent,
                agentType: AGENT_ROLES.AGENT
            }
        }
        return {
            agentType: AGENT_ROLES.ADMIN
        }
    }

    const { isLoading: isLoadingListing, error: isErrorListing } = useQueryHelper(
        {
            gql: GET_LISTING_FOR_PDF,
            name: "GET_LISTING_FOR_PDF",
            config: {
                cacheTime: 120000,
                onSuccess: (response) => {
                    setInfoForPdf({
                        ...infoForPdf,
                        listing: get(response, ["listings", "nodes", "0"], null)
                    });
                    incrementNavigationProgress(15);
                },
                onError: () => {
                    stopNavigationProgress();
                }
            },
            variables: {
                id: idListing
            },
        }
    );

    const { isLoading: isLoadingAgent, error: isErrorAgent } = useQueryHelper(
        {
            gql: GET_AGENT_PROFILE_INFO,
            name: "GET_AGENT_PROFILE_INFO",
            config: {
                cacheTime: 120000,
                onSuccess: (response) => {
                    setInfoForPdf({
                        ...infoForPdf,
                        agent: get(response, ["dataAgent", "0"], null)
                    });
                    incrementNavigationProgress(15);
                },
                onError: () => {
                    stopNavigationProgress();
                }
            },
            variables: getVariablesForAgent()
        }
    );

    return {
        data: infoForPdf,
        error: isErrorAgent || isErrorListing,
        isLoading: isLoadingAgent || isLoadingListing || !infoForPdf.listing || !infoForPdf.agent
    }
}

export default useGetListingInfo;