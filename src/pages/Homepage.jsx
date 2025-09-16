import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const [coffees, setCoffees] = useState([]);

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

    return (
        <>


            <div className="my-container text-center ">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cerca un caffè..."
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
                                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" checked />
                                    <label className="form-check-label" htmlFor="radioDefault1">
                                        A - Z
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2" />
                                    <label className="form-check-label" htmlFor="radioDefault2">
                                        Z - A
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row g-3">
                            {coffees.map(coffee => (
                                <Link to={`/coffees/${coffee.id}`} key={coffee.id} className="col-12 col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body text-start">
                                            <h5 className="card-title">{coffee.title}</h5>
                                            <p className="card-text">
                                                <span className={`badge ${categoryClass[coffee.category] || ""}`}>
                                                    {coffee.category}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </>);
};