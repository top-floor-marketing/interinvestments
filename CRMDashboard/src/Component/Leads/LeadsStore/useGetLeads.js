import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_LEADS_LIST } from "../../../GraphqlClient/leads.gql";

// global Store
import { useSelector } from "react-redux";

// Leads Store
import useLeadsStore from "./useLeadsStore";

// utils
import { getIsAdminUser } from "../../../Store/utils";

const useGetLead = ({ fetchInMount }) => {

    const { infoUser: { roles } } = useSelector((state) => state.user);

    const isAdmin = getIsAdminUser(roles);

    const { 
        state: { isLoading, currentPage, perPage, cursorPaginator, leadsData }, 
        actions: { 
            setLoading,
            setLeadsData
        }
    } = useLeadsStore();

    const { isLoading: isLoadingQuery, isFetching, isError, refetch } = useQueryHelper({
        name: "get-leads-list-crm",
        gql: GET_LEADS_LIST,
        config: {
          cacheTime: 10000,
          enabled: fetchInMount === undefined ? true : fetchInMount,
          onSuccess: (response) => {
            console.log("response ", response);
          },
          onError: (e) => {
            console.log("e ", e);
          },
        },
        variables: {
          perPage: perPage,
          after: cursorPaginator,
        },
    });

    return {
        isLoading: isLoading || isLoadingQuery || isFetching,
        dataLeads: [],
        refetchData: refetch,
        isAdmin
    }
}

export default useGetLead;