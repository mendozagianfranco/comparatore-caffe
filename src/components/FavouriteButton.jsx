import { useState } from "react";

export default function FavoriteButton() {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavorite = () => {
        setIsFavorite(true);
    };

    return (
        <button
            className={`btn btn-sm text-danger`}
            onClick={handleFavorite}
        >
            {isFavorite ? <i className="fs-4 fa-solid fa-heart"></i> : <i className="fs-4 fa-regular fa-heart"></i>}
        </button>
    );
}