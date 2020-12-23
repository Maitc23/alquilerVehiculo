import React,{useState, useEffect} from 'react';
import Navbar from '../layout/Navbar';
import {getVehicles} from './apiCore';
import Card from './Card'



const Home = () => {

    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState(false);

    const loadVehicles = () => {
        getVehicles().then(data => {
 
                setVehicles(data)
                console.log(data);
 
            
        })
    }

    useEffect(() => {
        loadVehicles();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container">
                <div  className="row">
                    {vehicles.map((vehicle, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                            <Card vehicles={vehicle}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;