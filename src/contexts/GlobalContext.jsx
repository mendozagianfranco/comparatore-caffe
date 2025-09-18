import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
    const [compareList, setCompareList] = useState([]);
    const [showMaxMessage, setShowMaxMessage] = useState(false);


    return (
        <GlobalContext.Provider value={{ compareList, setCompareList, showMaxMessage, setShowMaxMessage }}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
    const context = useContext(GlobalContext);
    return context;
}

export { GlobalContextProvider, useGlobalContext };