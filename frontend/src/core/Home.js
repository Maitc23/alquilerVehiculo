import React, { useState, useEffect } from 'react';
import Navigation from '../layout/Navigation';
import { getVehicles } from './apiCore';
import Card from './Card'



const Home = () => {

    const [vehicles, setVehicles] = useState([]);
    const [setError] = useState(false);

    //Cargamos los vehiculos de la BD
    const loadVehicles = () => {
        getVehicles().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setVehicles(data)
                console.log(data);
            }
        })
    }

    useEffect(() => {
        loadVehicles();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Navigation />
            <div className="container">
                <div className="row">
                    {vehicles.map((vehicle, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                            <Card vehicles={vehicle} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;