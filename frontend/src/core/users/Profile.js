import React, { useState, useEffect } from 'react';
import Navigation from '../../layout/Navigation';
import { me } from '../apiCore';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [setError] = useState(false);

    const myProfile = () => {
        const token = JSON.parse(localStorage.getItem('x-access-token')).token
        me(token).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProfile(data)
                console.log(data);
            }
        })
    }



    useEffect(() => {
        myProfile();
        // eslint-disable-next-line
    }, [])



    return (
        <div>
            <Navigation />
            <div className="mt-5 container">

                <h1>Nombre: {profile.name} {profile.lastName}</h1>
                <h1>Correo: {profile.email}</h1>
                <h1>Historial de autos alquilados: </h1>

                {profile.vehicles}

            </div>
        </div>
    )

}

export default Profile