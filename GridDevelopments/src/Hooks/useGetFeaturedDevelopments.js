import { useState } from "react";

import { useQueryHelper } from "../GraphqlClient/useRequest";

import {
  GET_LISTING_FEATURED_DEVELOPMENTS,
  GET_TAG_FEATURED_DEVELOPMENTS,
  GET_SINGLE_LISTING_GQL,
  GET_AGENT_FEATURED_LISTING
} from "../GraphqlClient/gql";

import toInteger from "lodash/toInteger";
import toLower from "lodash/toLower";

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const URL_SHARED_FLAG = 'shared';
const URL_QUERY_ID_NAME = 'agent-id';

const useGetFeaturedDevelopments = (idAgent) => {

  const [isFirtsFetch, setIsFirtsFetch] = useState(true);
  const [fullData, setFullData] = useState([]);
  const [tagId, setTagId] = useState(0);
  const [perPage] = useState(8);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [cursorPaginator, setCursorPaginator] = useState("");
  const [dataQuickView, setDataQuickView] = useState({
    id: 0,
    content: null,
  });
  const [showOverlay, setShowOverlay] = useState(false);

  const getUriWithAgentId = (uri) => {
    const queryParams = new URLSearchParams(window.location.search);
    const isShared = (toLower(queryParams.get(URL_SHARED_FLAG)) === 'true');
    const idInUrl = toInteger(queryParams.get(URL_QUERY_ID_NAME));
    const fullUri = (isShared && idInUrl) ? `${DOMAIN_URL}/${uri}?${URL_QUERY_ID_NAME}=${idInUrl}&${URL_SHARED_FLAG}=true` : uri
    console.log("fullUri")
    return fullUri;
  }

  const fullDataGenerator = (prevData, nextData) => {
    
    let nextData_ = nextData.map((val) => {
      return {
        title: val.title,
        subTitle: val.neighborhoods?.nodes.length ? val.neighborhoods?.nodes[0]?.name || '' : '',
        id: val.databaseId,
        photos: val.listingData?.newDevelopment?.photos || [],
        uri: getUriWithAgentId(val?.uri)
      };
    });
    return [...prevData, ...nextData_];
  };

  // first query
  const {
    isLoading: loadingTag,
    isError: errorTag,
    isFetching: isFetchingTag,
  } = useQueryHelper({
    name: "get-tag-featured-dev-gd",
    gql: GET_TAG_FEATURED_DEVELOPMENTS,
    config: {
      onSuccess: (response) => {
        const { tags } = response;
        if (tags?.nodes.length) {
          setTagId(tags?.nodes[0].databaseId);
        } else {
            setFullData([]);
            setHasNextPage(false);
            setIsFirtsFetch(false);
        }
      },
      onError: () => {
        setFullData([]);
        setHasNextPage(false);
        setIsFirtsFetch(false);
      },
    },
  });

  // second and main query, Dependent Query
  const {
    isLoading: loadingListListing,
    isFetching: isFetchingListListing,
    isError: errorListListing,
    refetch: refetchListListing,
  } = useQueryHelper({
    name: (idAgent) ? "get-agent-listing-gd" : "get-listing-featured-dev-gd",
    gql: (idAgent) ? GET_AGENT_FEATURED_LISTING : GET_LISTING_FEATURED_DEVELOPMENTS,
    config: {
      enabled: tagId > 0,
      onSuccess: (response) => {
        if(idAgent) {
          const { dataAgent } = response;
          if(dataAgent[0]) {
            const { listings } = dataAgent[0];
            const { nodes } = listings;
            const newData = fullDataGenerator(fullData, nodes);
            setFullData(newData);
          }
          setCursorPaginator("");
          setHasNextPage(false);
          setIsFirtsFetch(false);
        } else {
          const { listings } = response;
          const { nodes, pageInfo } = listings;
          if (pageInfo.endCursor) {
            setCursorPaginator(pageInfo.endCursor);
          }
          setHasNextPage(pageInfo?.hasNextPage || false);
          const newData = fullDataGenerator(fullData, nodes);
          setFullData(newData);
          setIsFirtsFetch(false);
        }
      },
      onError: () => {
        setFullData([]);
        setHasNextPage(false);
        setIsFirtsFetch(false);
      },
    },
    variables: 
      (idAgent) ? {
        agentId: parseInt(idAgent)
      } :
      {
        tagId: (""+tagId),
        perPage: perPage,
        after: cursorPaginator,
      }
    ,
  });

  // Get Specific Listing
  const {
    isError: errorSingleListing,
  } = useQueryHelper({
    name: "get-single-listing-gd",
    gql: GET_SINGLE_LISTING_GQL,
    config: {
      enabled: !isFirtsFetch && dataQuickView.id > 0,
      onSuccess: (response) => {
        const { listings } = response;
        let content = null;
        if (listings.nodes.length > 0) {
          const findListing = listings.nodes[0];

          content = {
            photos: findListing.listingData?.newDevelopment?.photos || [],
            ...findListing,
            uri:  getUriWithAgentId(findListing?.uri)
          };

        }
        setDataQuickView({
          ...dataQuickView,
          content: content,
        });
        setShowOverlay(false);
      },
      onError: () => {
        setDataQuickView({
          content: null,
          id: 0,
        });
      },
    },
    variables: {
      id: dataQuickView.id,
    },
  });

  const fetchListListing = () => {
    refetchListListing();
  };

  const openModalQuickView = (id) => {
    setShowOverlay(true);
    setDataQuickView({
      ...dataQuickView,
      id: id,
    });
  };

  const onCloseModalQuickView = () => {
    setDataQuickView({
      content: null,
      id: 0,
    });
  };

  return {
    data: fullData,
    renderSkeleton: loadingTag || isFirtsFetch || isFetchingTag,
    isLoading:
      loadingTag ||
      loadingListListing ||
      isFetchingTag ||
      isFetchingListListing,
    isError: errorTag || errorListListing,
    hasNextPage,
    fetchListListing,
    openModalQuickView,
    showOverlay,
    dataQuickView,
    showErrorSingleListing: errorSingleListing,
    onCloseModalQuickView,
  };
};

export default useGetFeaturedDevelopments;
