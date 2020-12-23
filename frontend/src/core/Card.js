import React, { useState } from 'react';
import './css/card.css';

const Card = ({ vehicles }) => {
    const [count, setCount] = useState(vehicles.count);
    return (
        <div className="card m-10 card-cont">
            <div>
                <img src={vehicles.imgUrl} style={{ maxHeight: "600px", maxWidth: "300px" }} class="card-img-top" alt="..." />

                <h2>{vehicles.bran} {vehicles.model}{vehicles.year}</h2>
                <p>${vehicles.price}</p>
                <p>{vehicles.description} </p>
                <button className="btn btn-info">Detalles</button>
            </div>


        </div>
    )

}

export default Card