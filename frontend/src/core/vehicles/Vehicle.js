import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getVehicleById, isAuthenticated, rentVehicle } from '../apiCore'
import Card from '../Card';
import Navigation from '../../layout/Navigation';

const Vehicle = (props) => {

    const [error,setError] = useState(false)
    const [vehicle, setVehicle] = useState({});
    const [success, setSuccess] = useState(false); 

    const loadSingleVehicle = _id => {
        console.log(_id);
        getVehicleById(_id).then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setVehicle(data)
            }
        });
    }

    const rent = (e) => {
        const token = JSON.parse(localStorage.getItem('x-access-token')).token
        e.preventDefault();
        setError(''); 
        setSuccess(false); 

        rentVehicle(token, vehicle._id)
            .then(data => {
                if(data.error) {
                    setError(true)
                } else {
                    setError('')
                    setSuccess(true)
                }
            })
    }

    const showSuccess = () => {
        if(success){
            return <h3 className="text-success">Auto rentado </h3>
        } 
    }
    
    const showError = () => {
        if(error){
            return <h3 className="text-danger">Inicie sesion para rentar. 
            
            </h3>
        } 
    }

    useEffect(() => {
        const _id = props.match.params._id
        loadSingleVehicle(_id);
        // eslint-disable-next-line
    }, [props])

    const redirectUser = () => {

        if (isAuthenticated()) {
            return <Link onClick={rent}>
                <button className="btn btn-success">Rentar auto</button>
            </Link>
        } else {
            return <Link to="/login">
                <button className="btn btn-success">Rentar auto</button>
            </Link>
        }
    }

    return (
        <>
            <Navigation />
            <div className="container">
                <h2>Pagina de vehiculos</h2>  
                {showSuccess()}
                {showError()}
                {
                    vehicle &&
                    <Card vehicles={vehicle} />

                }
                {redirectUser()}
            </div>
        </>
    )
}

export default Vehicle