import React from 'react';
import { Link } from 'react-router-dom';
import './css/card.css';


const Card = ({ vehicles }) => {

    return (
        <div className="card m-10 card-cont">
            <div>
                <img src={vehicles.imgUrl} style={{ maxHeight: "600px", maxWidth: "300px" }} class="card-img-top" alt="..." />

                <h2>{vehicles.brand} {vehicles.model} {vehicles.year}</h2>
                <p>${vehicles.price} por dia</p>
                <p>{vehicles.description} </p>
                <Link to={`/vehicle/${vehicles._id}`}>
                    <button className="btn btn-info">Detalles</button>
                </Link>
            </div>
        </div>
    )
}

export default Card