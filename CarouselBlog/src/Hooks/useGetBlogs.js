import { useState } from "react";

import { useQueryHelper } from "../GraphqlClient/useRequest";

import { GET_POST_BLOG_GQL } from "../GraphqlClient/gql";

const UseGetBlogs = () => {
  const [isFirtsFetch, setIsFirtsFetch] = useState(true);
  const [fullData, setFullData] = useState([]);
  const [perPage] = useState(4);

  const fullDataGenerator = (prevData, nextData) => {
    let nextData_ = [];
    nextData_ = nextData.map((val) => {
      return {
        title: val.title,
        subTitle: val.listingData.newDevelopment.nameOfDevelopment,
        id: val.databaseId,
        photos: val.listingData.newDevelopment.photos || [],
      };
    });
    return [...prevData, ...nextData_];
  };

  // first query
  const {
    isLoading: loadingBlogs,
    isError: errorBlogs,
    isFetching: isFetchingBlogs,
  } = useQueryHelper({
    name: "get-post-blogs",
    gql: GET_POST_BLOG_GQL,
    config: {
      onSuccess: (response) => {
        const { posts } = response;
        console.log("GET_POST_BLOG_GQL ", posts);
        console.log("nodes ", posts.nodes);

        /* const regex = /(<([^>]+)>)/gi;
        const body = "<p>test</p>";
        const result = body.replace(regex, "");
        console.log(result); */
      },
      onError: () => {
        setIsFirtsFetch(false);
      },
    },
    variables: {
      first: perPage,
    },
  });

  return {
    data: fullData,
    renderSkeleton: loadingBlogs || isFirtsFetch || isFetchingBlogs,
    isLoading: loadingBlogs || isFetchingBlogs,
    isError: errorBlogs,
  };
};

export default UseGetBlogs;
