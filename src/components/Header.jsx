import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="navbar ">
            <div className="container-fluid">
                <Link className="navbar-brand title" to={'/'}>SorSo a SorSo</Link>
                <form className="d-flex w-25" role="search">
                    <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-accent" type="submit">Search</button>
                </form>
                <span data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" role='button'><i className="fa-solid fa-heart text-danger me-1"></i>Preferiti</span>

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Preferiti</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        ...
                    </div>
                </div>
            </div>
        </nav>
    );
}