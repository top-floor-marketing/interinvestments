import get from 'lodash/get';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';

export const getListingCategory = (response) => {
    const tempCategory = get(response, ["listingCategories", "nodes"], []);
    const categorySegment = map(tempCategory, (val) => {
        return {
            value: "" + val.databaseId,
            label: val.name
        }
    });
    return categorySegment;
}

export const getListingNei = (response) => {
    const tempNei = get(response, ["neighborhoods", "nodes"], []);
    const neiSelect = map(tempNei, (val) => {
        return {
            value: "" + val.databaseId,
            label: val.name
        }
    });
    return neiSelect;
}

export const getAllListings = (newResponse, oldResponse, arrayIdListings) => {
    const listingsResponse = get(newResponse, ["listings", "nodes"], []);
    const tempFullData = [...listingsResponse, ...oldResponse];
    return map(tempFullData, (val) => {
      return {
        ...val,
        isFeatured: findIndex(arrayIdListings, (val2) => val.databaseId === val2) > -1
      }
    })
}


  export const getArrayIdListings = (response) => {
    const listings = get(response, ["dataAgent", "0", "listings", "nodes"], []);
    return listings.reduce((accumulator, curValue) => {
      accumulator.push(curValue.databaseId);
      return accumulator;
    }, []);
  }