import React from "react";
import LoadingFull from '../LoadingFull';
import useUserIsAuth from './hooks/useUserIsAuth';

const withAutentication = (Component) => {
    const WithAutentication = (props) => {
        const { loadingVerify } = useUserIsAuth();
        if(loadingVerify) { 
          return <LoadingFull isLoadingLazy idLazy="ContainerCRM" />
        }
        return <Component {...props} />;
    };
    
    return WithAutentication;
}

export default withAutentication;