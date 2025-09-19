import { createPortal } from "react-dom";
import { useGlobalContext } from '../contexts/GlobalContext';
import { useEffect, useState } from 'react';


export default function ModalCompare() {
    const { compareList } = useGlobalContext();
    const [coffeesToCompare, setCoffeesToCompare] = useState([]);

    useEffect(() => {
        const fetchCoffees = async () => {
            try {
                const promises = compareList.map(c =>
                    fetch(`http://localhost:3001/coffees/${c.id}`)
                        .then(res => res.json())
                );

                const results = await Promise.all(promises);
                if (results.message) {
                    throw new Error(results.message);
                }
                setCoffeesToCompare(results.map(r => r.coffee));
            } catch (error) {
                console.error(error);
            }
        };

        if (compareList.length > 0) {
            fetchCoffees();
        }
    }, [compareList]);


    return createPortal(
        <div
            className="modal fade"
            id="coffeeModal"
            tabIndex="-1"
            aria-labelledby="coffeeModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="coffeeModalLabel">
                            Confronto Caffè
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="table-responsive rounded">
                            <table className="table compare-table table-bordered table-striped text-center align-middle">
                                <thead className='table-dark'>
                                    <tr>
                                        <th className='w-10'>Caratteristica</th>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <th key={index}>{coffee.title}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='first-col'>Categoria</td>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <td key={index}>{coffee.category}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className='first-col'>Marca</td>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <td key={index}>{coffee.brand}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className='first-col'>Paese di Origine</td>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <td key={index}>{coffee.origin}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className='first-col'>Livello di Tostatura</td>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <td key={index}>{coffee.roastLevel ?? "-"}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className='first-col'>Prezzo (€)</td>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <td key={index}>{coffee.price ? `€${coffee.price.toFixed(2)}` : "-"}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className='first-col'>Contenuto caffeina (mg)</td>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <td key={index}>{coffee.caffeineContent}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className='first-col'>Note di Gusto</td>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <td key={index}>{coffee.flavorNotes ? coffee.flavorNotes.join(", ") : "-"}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className='first-col'>Intensità</td>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <td key={index}>{coffee.intensity}/10</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className='first-col'>Decaffeinato</td>
                                        {coffeesToCompare.map((coffee, index) => (
                                            <td key={index}>{coffee.isDecaf ? "Sì" : "No"}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
