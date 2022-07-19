import { useState } from 'react'

// react-query
// import { useQueryHelper } from "../GraphqlClient/useRequest";

const useGetFeaturedDev = () => {
    const [fullData, setFullData] = useState([]);




    return {
        data: fullData,
    }
}

export default useGetFeaturedDev