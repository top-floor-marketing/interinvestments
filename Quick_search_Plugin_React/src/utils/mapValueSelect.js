export const SELECT_TABS_CATEGORY = (req) => {
  return req.map((value) => {
    return {
      value: value.databaseId.toString(),
      label: value.name,
    };
  });
};

export const SELECT_NEIGHBORHOODS = (req) => {
  return req.map((value) => {
    return {
      value: value.databaseId.toString(),
      label: value.name,
    };
  });
};

export const ENUM_NEIGHBORHOODS = (idCategory) => {
  switch (idCategory) {
    case "21":
      return "NEW_CONDOS";
    case "23":
      return "NEW_HOMES";
    case "22":
      return "RENTAL_COMMUNITIES";
    default:
      return "NEW_CONDOS";
  }
};
