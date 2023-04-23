import React, { useEffect } from "react";
import LoadingFull from '../LoadingFull';
import useUserIsAuth from './hooks/useUserIsAuth';

const withAutentication = (Component) => {
    const WithAutentication = (props) => {
        const { loadingVerify } = useUserIsAuth();
        useEffect(() => {
            const element = document.querySelector("#wpadminbar");
            if(element) {
              element.style.display = 'none';
            }
          },[]);
        if(loadingVerify) { 
          return <LoadingFull isLoadingLazy idLazy="ContainerCRM" />
        }
        return <Component {...props} />;
    };
    
    return WithAutentication;
}

export default withAutentication;