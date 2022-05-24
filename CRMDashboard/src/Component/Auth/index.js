import React from "react";

import Login from "./Login";

const AuthContainer = () => {
  return <Login onSuccessLogin={(response) => { console.log('response', response) }} />;
};

export default AuthContainer;
