import { Link } from 'react-router-dom';
import { useFavourite } from '../contexts/FavouriteContext';

export default function Header() {
    const { favourites, setFavourites } = useFavourite();

    return (
        <nav className="navbar sticky-top ">
            <div className="container-fluid">
                <Link className="fs-4 title" to={'/'}>SorSo a SorSo</Link>
                <span data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" role='button'><i className="fa-solid fa-heart text-danger me-1"></i>Preferiti</span>

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Preferiti</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        {favourites.length === 0 ? 'Nessun Preferito...' : favourites.map((coffee) => (
                            <div key={coffee.id} className="card mb-2 shadow-sm ">
                                <div className="card-body d-flex justify-content-between align-items-center py-2 px-3">
                                    <Link to={`/coffees/${coffee.id}`}>
                                        <h6 className="mb-0 fw-semibold">{coffee.title}</h6>
                                        <small className="text-muted">{coffee.category}</small>
                                    </Link>
                                    <button
                                        onClick={() => setFavourites(prev => prev.filter(c => c.id !== coffee.id))}
                                        className="btn btn-sm btn-outline-danger"
                                        title="Rimuovi dai preferiti"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </nav>
    );
}