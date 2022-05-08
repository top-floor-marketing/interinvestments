import { useState } from "react";

import { useQueryHelper } from "../GraphqlClient/useRequest";

import { GET_POST_BLOG_GQL } from "../GraphqlClient/gql";

import { removeHtmlInString, maxString } from "../utils";

const UseGetBlogs = () => {
  const [fullData, setFullData] = useState([]);
  const [perPage] = useState(4);

  const fullDataGenerator = (newData) => {
    let parseData = [];
    parseData = newData.map((val) => {
      return {
        id: val.databaseId,
        urlImage: val.featuredImage?.node?.sourceUrl || null,
        title: maxString(val.title, 150),
        description: maxString(removeHtmlInString(val.excerpt), 250),
      };
    });
    return parseData;
  };

  // get firts 4 Blogs
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
        setFullData(fullDataGenerator(posts.nodes));
      },
      onError: () => {},
    },
    variables: {
      first: perPage,
    },
  });

  return {
    data: fullData,
    isLoading: loadingBlogs || isFetchingBlogs,
    isError: errorBlogs,
    isEmpty: fullData.length === 0,
  };
};

export default UseGetBlogs;
