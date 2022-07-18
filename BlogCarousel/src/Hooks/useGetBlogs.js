import { useState } from "react";

import { useQueryHelper } from "../GraphqlClient/useRequest";

import { GET_POST_BLOG_GQL } from "../GraphqlClient/gql";

import { removeHtmlInString, maxString } from "../utils";

const ANIMATIONS = {
  0: {
    image: ["animate__animated animate__delay-0.5s animate__bounceInUp", "animate__animated animate__delay-0.5s animate__fadeInTopRight"],
    content: ["animate__animated animate__delay-0.5s animate__bounceInRight", "animate__animated animate__delay-0.5s animate__flipInY"]
  },
  1: {
    image: ["animate__animated animate__delay-0.5s animate__jackInTheBox", "animate__animated animate__delay-0.5s animate__slideInDown"],
    content: ["animate__animated animate__delay-0.5s animate__zoomInDown", "animate__animated animate__delay-0.5s animate__bounceInUp"]
  },
  2: {
    image: ["animate__animated animate__delay-0.5s animate__pulse", "animate__animated animate__delay-0.5s animate__fadeInRightBig"],
    content: ["animate__animated animate__delay-0.5s animate__fadeInTopLeft", "animate__animated animate__delay-0.5s animate__rotateInDownLeft"]
  },
  3: {
    image: ["animate__animated animate__delay-0.5s animate__flipInX", "animate__animated animate__delay-0.5s animate__fadeInUp"],
    content: ["animate__animated animate__delay-0.5s animate__slideInUp", "animate__animated animate__delay-0.5s animate__zoomInDown"]
  }
}

const UseGetBlogs = () => {
  const [fullData, setFullData] = useState([]);
  const [perPage] = useState(4);

  const fullDataGenerator = (newData) => {
    let parseData = [];
    parseData = newData.map((val, index) => {
      return {
        id: val.databaseId,
        urlImage: val.featuredImage?.node?.sourceUrl || null,
        title: maxString(val.title, 150),
        description: maxString(removeHtmlInString(val.excerpt), 250),
        imageAnimation: ANIMATIONS[index]?.image || [],
        contentAnimation: ANIMATIONS[index]?.content || [],
        slug: val?.slug || null,
        uri: val?.uri || null
      };
    });
    return parseData;
  };

  const {
    isLoading: loadingBlogs,
    isError: errorBlogs,
    isFetching: isFetchingBlogs,
  } = useQueryHelper({
    name: "get-post-blogs-carousel",
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
