import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_LEADS_LIST } from "../../../GraphqlClient/leads.gql";

// global Store
import { useSelector } from "react-redux";

// Leads Store
import useLeadsStore from "./useLeadsStore";

// utils
import { getIsAdminUser } from "../../../Store/utils";

// lodash
import get from 'lodash/get';
import random from 'lodash/random';

const useGetLead = ({ fetchInMount }) => {

    const { infoUser: { roles } } = useSelector((state) => state.user);

    const isAdmin = getIsAdminUser(roles);

    const { 
        state: { isSkeleton, currentPage, perPage, cursorPaginator, leadsData }, 
        actions: {
            setIsSkeleton,
            setLeadsData
        }
    } = useLeadsStore();

    const formatResponseData = (prevData, nextData) => {
      const newData = [];

      const _nodes = get(nextData, ["users", "nodes"], []);

      _nodes.map((val, index) => {
        newData.push({
          id: get(val, "databaseId", null),
          name: get(val, "name", null),
          phoneNumber: get(val, "phoneNumber", null),
          email: get(val, "email", null),
          key: random(1, 10000) + "_" + index
        });
      })
      return [...prevData, ...newData];
    }

    const { isLoading: isLoadingQuery, isFetching: isFetchingQuery, isError, refetch } = useQueryHelper({
        name: "get-leads-list-crm",
        gql: GET_LEADS_LIST,
        config: {
          cacheTime: 10000,
          enabled: fetchInMount === undefined ? true : fetchInMount,
          onSuccess: (response) => {
            setIsSkeleton(false);
            setLeadsData(formatResponseData(leadsData, response));
          },
          onError: (e) => {
            setIsSkeleton(false);
            console.log("e ", e);
          },
        },
        variables: {
          perPage: perPage,
          after: cursorPaginator,
        },
    });

    return {
        isSkeleton,
        isLoading: isSkeleton || isLoadingQuery || isFetchingQuery,
        leadsData,
        refetchData: refetch,
        isAdmin
    }
}

export default useGetLead;