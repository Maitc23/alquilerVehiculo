import React from 'react';
import { Link } from 'react-router-dom'
import {  NavItem } from 'reactstrap';
import { isAuthenticated, singout } from '../core/apiCore'


const Navigation = () => {

    const {user} = isAuthenticated();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">AlquilerVehiculos</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                            <NavItem className='nav-link'>
                                <Link
                                    className="nav-link"
                                    to='/'
                                >Inicio
                                </Link>
                            </NavItem>
                        </ul>
                        <ul className="navbar-nav">
                        {/* Verificamos la sesion del usuario*/}
                            {!isAuthenticated() && (
                                <>
                                    <NavItem className='nav-link'>
                                        <Link
                                            className="nav-link"
                                            to='/login'
                                        >Login
                                    </Link>
                                    </NavItem>

                                    <NavItem className='nav-link'>
                                        <Link
                                            className="nav-link"
                                            to='/register'
                                        >Registro
                                    </Link>
                                    </NavItem>
                                </>
                            )}
                            {   
                                isAuthenticated() && (
                                    <>
                                        <NavItem className='nav-link'>
                                            <Link
                                                className="nav-link"
                                                to='/profile'
                                            >Perfil
                                            </Link>
                                        </NavItem>
                                        {/* Verificamos el tipo de usuario y dependiendo, mandamos las opciones disponibles*/}
                                        {
                                         user.userType === 1 && (
                                            <> 
                                                <NavItem className='nav-link'>
                                                    <Link
                                                        className="nav-link"
                                                        to='/newCategory'
                                                    >Categorias
                                                    </Link>
                                                </NavItem>
                                        
                                                <NavItem className='nav-link'>
                                                    <Link
                                                        className="nav-link"
                                                        to='/newVehicle'
                                                    >Vehiculos
                                                    </Link>
                                                </NavItem>
                                            </>
                                         )
                                        }
                                        <NavItem className="nav-link">
                                            <Link
                                                to="/"
                                                onClick={() =>
                                                    singout(() => {
                                                        window.location.href = '/';
                                                    })} className="nav-link">
                                                Logout
                                             </Link>
                                        </NavItem>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;