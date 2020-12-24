import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Navigation from '../../layout/Navigation'
import { login, authenticate, isAuthenticated } from '../apiCore';

import '../css/auth.css';

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false,
        redirectToReferrer: false
    })

    const { email, password, redirectToReferrer, loading, error } = values;
    const { user } = isAuthenticated();

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true })
        login({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(
                        data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            })
                        }
                    )
                }
            })
    }

    const loginForm = () => (
        <form className="sing-box">
            <div className="form-group">
                <label className="text-muted">Correo</label>
                <input
                    onChange={handleChange('email')}
                    type="text"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Contraseña</label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button
                className=" mt-2 s-btn btn btn-primary"
                onClick={clickSubmit}
            >
                Login
        </button>
        </form>
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.userType === 1) {
                return <Redirect to="/profile" />
            } else {
                return <Redirect to="/" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Cargando...</h2>
            </div>
        )
    )

    return (
        <>
            <Navigation />
            <div className="mt-5">
                <h4 className="text-center mb-5">Inicio de sesion</h4>
                {showError()}
                {showLoading()}
                {loginForm()}
                {redirectUser()}
            </div>

        </>

    )
}

export default Login
