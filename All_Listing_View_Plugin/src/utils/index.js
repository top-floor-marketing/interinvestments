import numFormatter from "./FormaterNumber";

const ENUM_NEIGHBORHOODS = (idCategory) => {
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

export { numFormatter, ENUM_NEIGHBORHOODS };
