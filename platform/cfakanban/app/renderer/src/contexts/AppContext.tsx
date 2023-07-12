import React, { createContext, useState } from "react";

type AppContextType = {
    isUpdate: boolean;
    setUpdate: (isUpdate: boolean) => void;
};

type AppContextProps = {
    children: React.ReactNode;
};

export const AppContext = createContext<AppContextType>({
    isUpdate: false,
    setUpdate: () => { },
});

export const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
    const [isUpdate, setUpdate] = useState<boolean>(false);

    const value: AppContextType = {
        isUpdate,
        setUpdate,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};