import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/context";

function useLocalStorageData(params: any) {
    const [loginUserData, setLoginUserData] = useState<any>();
    const { action, id } = params;

    useEffect(() => {
        switch (action) {
            case "getLoginData":
                getLoginData();
                break;
        }
    }, []);

    const getLoginData = () => {
        const response = localStorage.getItem(id);
        if (response) setLoginUserData(JSON.parse(response));
        setLoginUserData(null);
    };
    return loginUserData;
}

export default useLocalStorageData;
