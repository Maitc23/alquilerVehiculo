import React, {useState} from 'react'; 
import {Link} from 'react-router-dom';

import Navigation from '../../../layout/Navigation';
import { newCategory} from '../../apiCore'

const NewCategory = () =>{

    const [name, setName] = useState(''); 
    const [error, setError] = useState(false); 
    const [success, setSuccess] = useState(false); 


    const handleChange = e => {
        setError(''); 
        setName(e.target.value);
    }

    const clickSubmit = (e) => {
    const token = JSON.parse(localStorage.getItem('x-access-token')).token
        e.preventDefault();
        setError(''); 
        setSuccess(false); 
        //Llamamos el API al end-point
        newCategory(token, {name})         
            .then(data => {
                console.log(token)
                if(data.error){
                    console.log(data.error);
                    setError(true)
                } else {
                    setError('')
                    setSuccess(true)
                }
            })
    }

    const showSuccess = () => {
        if(success){
            return <h3 className="text-success">La categoria "{name}" fue creada. </h3>
        } 
    }
    
    const showError = () => {
        if(error){
            return <h3 className="text-danger">Error al insertar la categoria "{name}". 
            
            </h3>
        } 
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/" className="text-warning">
                Volver a inicio
            </Link>
        </div>
    )

    const newCategoryForm = () => (
        <form onSubmit ={clickSubmit}>
            <div className="form-group">
                <label  className="text-muted">Nombre</label>
                <input type="text" className="form-control"
                onChange={handleChange} value={name} required autoFocus/>
            </div>
            <button className="btn btn-outline-success">
                Crear categoria
            </button>
        </form>
    )

    return (
     <>
        <Navigation />
        <div className="mt-5 container">
        {showSuccess()}
        {showError()}
        {newCategoryForm()} 
        {goBack()}
        </div>
    
     </>
 )   
}


export default NewCategory;