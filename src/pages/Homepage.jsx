import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FavouriteButton from '../components/FavouriteButton';

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}

export default function Homepage() {
    const [coffees, setCoffees] = useState([]);
    const [compareList, setCompareList] = useState([]);
    const [showMaxMessage, setShowMaxMessage] = useState(false);
    const [sortCategory, setSortCategory] = useState('');
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const debouncedSetSearchQuery = useCallback(debounce(setSearchQuery, 500), []);


    function handleRemoveCompare(id) {
        setCompareList(prev => prev.filter(coffee => coffee.id !== id));
    }

    function handleCompare(coffee) {
        setCompareList(prev => {
            if (prev.length >= 5) {
                setShowMaxMessage(true);
                setTimeout(() => setShowMaxMessage(false), 2000);
                return prev;
            };
            return [...prev, coffee];
        });
    }

    useEffect(() => {
        fetch("http://localhost:3001/coffees")
            .then(res => res.json())
            .then(data => setCoffees(data));
    }, []);

    const categoryClass = {
        Chicchi: "beans",
        Capsule: "capsule",
        Macinato: "ground"
    };

    const filteredAndSortedCoffees = useMemo(() => {
        let filteredCoffees = [...coffees];
        if (searchQuery.trim() !== "") {
            const lowerQuery = searchQuery.toLowerCase();
            filteredCoffees = filteredCoffees.filter(coffee =>
                coffee.title.toLowerCase().includes(lowerQuery)
            );
        }

        if (sortCategory === 'Chicchi') {
            filteredCoffees = filteredCoffees.filter(c => c.category === 'Chicchi');
        } else if (sortCategory === 'Capsule') {
            filteredCoffees = filteredCoffees.filter(c => c.category === 'Capsule');
        } else if (sortCategory === 'Macinato') {
            filteredCoffees = filteredCoffees.filter(c => c.category === 'Macinato');
        }
        return filteredCoffees.sort((a, b) => a.title.localeCompare(b.title) * sortOrder);
    }, [coffees, sortCategory, sortOrder, searchQuery]);

    return (
        <>
            <div className="my-container text-center ">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cerca un caffè..."
                            onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mt-4 gx-4">
                    <div className="col-3">
                        <div className="p-3 rounded sidebar" >
                            <div className="mb-3 text-start">
                                <h5>Categoria</h5>
                                <select
                                    id="category"
                                    className="form-select"
                                    value={sortCategory}
                                    onChange={(e) => setSortCategory(e.target.value)}
                                >
                                    <option value="">Tutte</option>
                                    <option value="Chicchi">Chicchi</option>
                                    <option value="Capsule">Capsule</option>
                                    <option value="Macinato">Macinato</option>
                                </select>
                            </div>
                            <div className="mb-3 text-start">
                                <h5 >Ordine alfabetico</h5>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" checked={sortOrder === 1} onChange={() => setSortOrder(1)} />
                                    <label className="form-check-label" htmlFor="radioDefault1">
                                        A - Z
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2" onChange={() => setSortOrder(-1)} />
                                    <label className="form-check-label" htmlFor="radioDefault2">
                                        Z - A
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row g-3">
                            {filteredAndSortedCoffees.map(coffee => (
                                <div key={coffee.id} className="col-12 col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body text-start">
                                            <Link to={`/coffees/${coffee.id}`} className="text-decoration-none text-dark">
                                                <h5 className="card-title">{coffee.title}</h5>
                                                <p className="card-text">
                                                    <span className={`badge ${categoryClass[coffee.category] || ""}`}>
                                                        {coffee.category}
                                                    </span>
                                                </p>
                                            </Link>
                                            <div className="mt-3 d-flex gap-2">
                                                <button
                                                    className="btn btn-compare"
                                                    onClick={() => handleCompare(coffee)}
                                                    disabled={compareList.some(c => c.id === coffee.id)}
                                                >
                                                    {compareList.some(c => c.id === coffee.id) ? "Aggiunto" : "Confronta"}
                                                </button>
                                                <FavouriteButton coffee={coffee} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >

            {showMaxMessage && (
                <div
                    className="toast show align-items-center text-bg-warning border-0 position-fixed bottom-0 start-50 translate-middle-x m-4"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body">
                            Puoi confrontare massimo 5 caffè
                        </div>
                    </div>
                </div>
            )}
            {compareList.length > 0 && (
                <div className="compare-bar d-flex align-items-center justify-content-between sticky-bottom">
                    <div className="d-flex gap-2 overflow-auto">
                        {compareList.map(coffee => (
                            <div key={coffee.id} className="compare-item d-flex align-items-center gap-1">
                                <span>{coffee.title}</span>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleRemoveCompare(coffee.id)}
                                >
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-compare" disabled={compareList.length < 2}>
                        Confronta ora
                    </button>
                </div>
            )}
        </>);
};