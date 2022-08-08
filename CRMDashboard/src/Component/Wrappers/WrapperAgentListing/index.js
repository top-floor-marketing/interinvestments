import { cloneElement, memo } from 'react';

import { useQueryHelper } from '../../../GraphqlClient/useRequest';
import { GET_LISTINGS_CATEGORY, GET_ALL_NEIGHBORHOODS } from '../../../GraphqlClient/listings.gql';

import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore';

import PropTypes from 'prop-types';

import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

const WrapperAgentListing = ({ children }) => {

    const { actions: { setListingCategories, setListingNei } } = useClientGlobalStore();

    const getListingCategory = (response) => {
        const tempCategory = get(response, ["listingCategories", "nodes"], []);
        const categorySegment = map(tempCategory, (val) => {
            return {
                value: "" + val.databaseId,
                label: val.name
            }
        });
        return categorySegment;
    }

    const getListingNei = (response) => {
        const tempNei = get(response, ["neighborhoods", "nodes"], []);
        const neiSelect = map(tempNei, (val) => {
            return {
                value: "" + val.databaseId,
                label: val.name
            }
        });
        return neiSelect;
    }

    const { isSuccess: isSuccessCategory, isError: isErrorCategory } = useQueryHelper({
        name: "get-category-listing-crm",
        gql: GET_LISTINGS_CATEGORY,
        config: {
            enabled: true,
            cacheTime: 10000,
            onSuccess: (response) => {
               const categories = getListingCategory(response);
                setListingCategories(categories);
            },
        },
        variables: {
            first: 3
        },
    });

    const { isSuccess: isSuccessNei, isError: isErrorNei } = useQueryHelper({
        name: "get-neiborhood-listing-crm",
        gql: GET_ALL_NEIGHBORHOODS,
        config: {
          enabled: isSuccessCategory,
          cacheTime: 10000,
          onSuccess: (response) => {
            const nei = getListingNei(response);
            setListingNei(nei);
          },
        }
    });

    return cloneElement(children, { isLoading: (!isSuccessCategory || !isSuccessNei) })
    
}

WrapperAgentListing.propTypes = {
    children: PropTypes.node
}

export default memo(WrapperAgentListing);