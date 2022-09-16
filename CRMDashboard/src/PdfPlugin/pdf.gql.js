export const GET_PDF_SINGLE_LISTING = gql`
  query listings($id: Int!) {
    listings(first: 1, where: { id: $id }) {
      nodes {
        databaseId
        uri 
        listingData {
          newDevelopment {
            livingArea
            views
            priceMin
            priceMax
            nameOfDevelopment
            livingArea
            longitude
          }
        }
        title
        neighborhoods {
          nodes {
            description
            databaseId
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            uri
          }
        }
      }
    }
  }
`;
