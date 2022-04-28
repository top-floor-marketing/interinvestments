import React from "react";

import { useQueryHelper } from "../GraphqlClient/useRequest";
import { gql } from "graphql-request";

const Test = () => {
  //name, gql, variables, config
  const { data, error, isLoading, isSuccess } = useQueryHelper({
    name: "pokemonTest",
    gql: gql`
      query pokemons($first: Int!) {
        pokemons(first: $first) {
          id
          number
          name
          weight {
            minimum
            maximum
          }
          height {
            minimum
            maximum
          }
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
        }
      }
    `,
    variables: {
      first: 1,
    },
  });
  return (
    <div>
      <h1>LOADING: {JSON.stringify(isLoading)}</h1>
    </div>
  );
};

export default Test;
