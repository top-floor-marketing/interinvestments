import { gql } from "graphql-request";

export const GET_LEADS_SERVICES = gql`
  query servicesTypes {
    servicesTypes {
      nodes {
        name,
        databaseId
      }
    }
  }
`

export const GET_SERVICES_FORM = gql`
query iRServiceBy($iRServiceId: Int!) {
  iRServiceBy(iRServiceId: $iRServiceId) {
    databaseId
    title
    buyers {
      areYouRelocatingToMiami
      areYouInterestedInNewConstructionOrResale
      areYouWorkingWithARealtor
      budget
      desiredLocations
      doYouHaveAPreferenceInViews
      expectedMoveIn
      fieldGroupName
      howDidYouHearAboutUs
      ifYouAreApplyingForAMortgageHaveYouBeenPreApproved
      specialRequirementsnotes
      styleOfArchitecture
    }
    commercial {
      aproximateSize
      areYouWorkingWithARealtor
      desiredLocations
      fieldGroupName
      lookingToBuyOrLease
      typesOfCommercialProperties
      specialRequirementsnotes
    }
    invest {
      areYouInterestedInPropertyManagementServices
      areYouLookingForAShortTermRentalairbnbFriendlyProperty
      budget
      fieldGroupName
      message
    }
    renters {
      areYouWorkingWithARealtor
      desiredLocation
      creditHistory
      doYouHavePets
      fieldGroupName
      howLongOfALeaseAreYouLookingFor
      howManyBedroomsAreYouLookingFor
      moveInDate
      specialRequirementscomments
      whatIsYourBudget
    }
    List {
      areYouLookingToSellOrRentYourProperty
      fieldGroupName
      ifRentingAreYouInterestedInManagementServices
      message
      propertyAddressOptional
      whenWouldYouLikeToListYourProperty
    }
  }
}
`