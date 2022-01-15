import { createContext, useContext, useState } from "react";
//Set default
const UserContext = createContext<any>({
    loginUser: "",
    setLoginUser: () => {},
});
const UserContextProvider = UserContext.Provider;

export { UserContext, UserContextProvider };
