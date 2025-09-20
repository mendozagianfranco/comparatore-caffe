import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import FavoriteButton from '../components/FavouriteButton';
import { MAX_ITEMS } from '../App';

export default function CoffeeDetailPage() {

    const { id } = useParams();
    const [coffee, setCoffee] = useState({});
    const { compareList, setCompareList } = useGlobalContext();
    const { setShowMaxMessage } = useGlobalContext();

    function handleCompare(coffee) {
        setCompareList(prev => {
            if (prev.length >= MAX_ITEMS) {
                setShowMaxMessage(true);
                setTimeout(() => setShowMaxMessage(false), 2000);
                return prev;
            };
            return [...prev, coffee];
        });
    }

    useEffect(() => {
        fetch(`http://localhost:3001/coffees/${id}`)
            .then(res => res.json())
            .then(data => setCoffee(data.coffee));
    }, []);

    if (!coffee) {
        return <div className="container py-5">Caffè non trovato</div>;
    }

    const categoryClass = {
        Chicchi: "beans",
        Capsule: "capsule",
        Macinato: "ground"
    };

    return (
        <div className="container py-5">
            <div className="row g-4 align-items-center">
                <div className="col-md-5">
                    <img
                        src={coffee.imageUrl}
                        alt={coffee.title}
                        className="coffee-img img-fluid mx-auto d-block"
                    />
                </div>

                <div className="col-md-7">
                    <h2>{coffee.title}</h2>

                    <div className="mb-3">
                        <span className={`badge ${categoryClass[coffee.category] || ""}`}>{coffee.category}</span>
                        {coffee.isDecaf && (
                            <span className="badge bg-secondary ms-2">Decaffeinato</span>
                        )}
                    </div>

                    <p>{coffee.description}</p>

                    <ul className="list-unstyled mt-3">
                        <li><strong>Brand:</strong> {coffee.brand}</li>
                        <li><strong>Origine:</strong> {coffee.origin}</li>
                        <li><strong>Livello di Tostatura:</strong> {coffee.roastLevel}</li>
                        <li><strong>Intensità:</strong> {coffee.intensity}/10</li>
                        <li><strong>Contenuto di Caffeina:</strong> {coffee.caffeineContent} mg</li>
                        <li><strong>Peso:</strong> {coffee.weight} g</li>
                        <li><strong>Prezzo:</strong> {coffee.price ? `€${coffee.price.toFixed(2)}` : "N/A"}</li>
                    </ul>

                    {coffee.flavorNotes?.length > 0 && (
                        <div className="mt-4">
                            <strong>Note aromatiche:</strong>
                            <div className="d-flex gap-2 mt-2 flex-nowrap overflow-auto pb-2">
                                {coffee.flavorNotes.map((flavor, i) => (
                                    <span
                                        key={i}
                                        className="badge bg-light text-dark border flex-shrink-0"
                                    >
                                        {flavor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="mt-4">
                        <button
                            className="btn btn-compare"
                            onClick={() => handleCompare(coffee)}
                            disabled={compareList.some(c => c.id === coffee.id)}
                        >
                            {compareList.some(c => c.id === coffee.id) ? "Aggiunto" : "Confronta"}
                        </button>
                        <FavoriteButton coffee={coffee} />
                    </div>
                </div>
            </div>
        </div>
    );
}