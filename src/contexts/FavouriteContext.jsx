import { createContext, useContext, useState } from 'react';


const FavouriteContext = createContext();

function FavouriteProvider({ children }) {
    const [favourites, setFavourites] = useState(() => {
        let prevState = localStorage.getItem('favourites');
        if (prevState) {
            return JSON.parse(prevState);
        } else {
            localStorage.setItem('favourites', JSON.stringify([]));
            return [];
        }
    });

    const updateFavourites = (newState) => {
        let updated;

        if (typeof newState === "function") {
            updated = newState(favourites);
        } else {
            updated = newState;
        }

        setFavourites(updated);
        localStorage.setItem("favourites", JSON.stringify(updated));
    };


    return (
        <FavouriteContext.Provider value={{ favourites, updateFavourites }}>
            {children}
        </FavouriteContext.Provider>
    );
}

function useFavourite() {
    const context = useContext(FavouriteContext);
    return context;
}

export { FavouriteProvider, useFavourite };