import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import Navigation from '../../layout/Navigation'
import { register } from '../apiCore';
import '../css/auth.css';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        passwordCheck: '',
        userType: '',
        error: '',
        success: false
    })

    const { name, lastName, email, password, passwordCheck, userType, success, error } = values;

    const selectUserType = [
        { id: 1, value: null, name: 'Selecciona tu tipo de usuario' },
        { id: 2, value: 1, name: 'Administrador' },
        { id: 3, value: 2, name: 'Cliente' }
    ];

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false })
        register({ name, lastName, email, password, passwordCheck, userType }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    passwordCheck: '',
                    error: '',
                    success: true
                })
            }

        })
    }
    const registerForm = () => (
        <form className="register-box">
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input
                    onChange={handleChange('name')}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Apellido</label>
                <input
                    onChange={handleChange('lastName')}
                    type="text"
                    className="form-control"
                    value={lastName}
                />
            </div>
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
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Confirmar contraseña</label>
                <input
                    onChange={handleChange('passwordCheck')}
                    type="password"
                    className="form-control"
                    value={passwordCheck}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Tipo de usuario</label>
                <select
                    onChange={handleChange('userType')}
                    className="form-control"
                    value={userType}
                >
                    {selectUserType.map((userType) => (
                        <option key={userType.id} value={userType.value}>
                            {userType.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                className=" mt-3 s-btn btn btn-primary"
                onClick={clickSubmit}
            >
                Registrar
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        success && (
            <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
                <Link to='/login'>Log in</Link>
            </div>
        )
    )
    return (
        <>
            <Navigation />
            <div className="mt-5">
                <h4 className="text-center mb-5">Registro de usuario</h4>
                {showError()}
                {showSuccess()}
                {registerForm()}

            </div>
        </>
    )
}

export default Register