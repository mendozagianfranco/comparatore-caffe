import { createContext, useContext, useState } from 'react';


const FavouriteContext = createContext();

function FavouriteProvider({ children }) {
    const [favourites, setFavourites] = useState([]);
    return (
        <FavouriteContext.Provider value={{ favourites, setFavourites }}>
            {children}
        </FavouriteContext.Provider>
    );
}

function useFavourite() {
    const context = useContext(FavouriteContext);
    return context;
}

export { FavouriteProvider, useFavourite };