import { useMemo } from 'react';
import { useFavourite } from '../contexts/FavouriteContext';


export default function FavoriteButton({ coffee }) {
    const { favourites, setFavourites } = useFavourite();
    const isFavorite = useMemo(() => favourites.some(c => c.id === coffee.id), [favourites]);

    const handleFavorite = (coffee) => {
        setFavourites(prev => {
            if (isFavorite) {
                return prev.filter(c => c.id !== coffee.id);
            }
            return [...prev, coffee];
        });
    };
    return (
        <button
            className={`btn btn-sm text-danger`}
            onClick={() => handleFavorite(coffee)}
        >
            {isFavorite ? <i className="fs-4 fa-solid fa-heart"></i> : <i className="fs-4 fa-regular fa-heart"></i>}
        </button>
    );
}