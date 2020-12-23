import React from 'react';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">AlquilerVehiculos</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#" />
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                    aria-aria-haspopup="true" aria-expanded="false">Search</a>

                                <div className="dropdown-menu" arial-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Search</a>
                                    <a className="dropdown-item" href="#">Pricing</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Pricing</a>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Perfil</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" >Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" >Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;