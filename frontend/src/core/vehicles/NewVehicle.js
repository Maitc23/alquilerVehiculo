/**
 * 
 * Solo dejo  el formulario para mostrar como deberia ser, por temas de tiempo
 * no esta funcional ya que falta poder enviar la imagen y su ruta al backend desde aqui,
 * pero se puede insertar nuevos vehiculos consumiendo el API, usando postman o cualquier otro programa parecido.
 * 
 */

import React, { useState, useEffect } from 'react';
import Navigation from '../../layout/Navigation';
import { newVehicle, getCategories } from '../apiCore';


const NewVehicle = () => {
  const [setCategory] = useState(0);

  const [values, setValues] = useState({
    brand: '',
    model: '',
    year: '',
    transmissionType: '',
    petrolType: '',
    price: '',
    category: [],
    description: '',
    quantity: '',
    imgUrl: '',
    loading: false,
    redirectToProfile: false,
    formData: '',
    createdVehicle: '',
    error: ''
  })
  const {
    brand,
    model,
    year,
    transmissionType,
    petrolType,
    price,
    description,
    quantity,
    // eslint-disable-next-line
    imgUrl,
    category,
    error,
    loading,
    // eslint-disable-next-line
    redirectToProfile,
    createdVehicle,
    formData
  } = values;

  //Obtencion de las categorias creadas
  const init = () => {
    const token = JSON.parse(localStorage.getItem('x-access-token')).token
    if (!token) {
      window.location.href = '/';

    }
    getCategories(token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, category: data, formData: new FormData() })
      }
    })
  }

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    init();
    // eslint-disable-next-line
  }, []);


  const handleChange = name => e => {

    const value = name === 'imgUrl' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }


  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )
  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdVehicle ? '' : 'none' }}
    >
      <h2>{`${createdVehicle} fue creado correctamente`}</h2>
    </div>
  )

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Cargando ...</h2>
      </div>
    )

  const clickSubmit = e => {
    const token = JSON.parse(localStorage.getItem('x-access-token')).token

    e.preventDefault()
    setValues({ ...values, error: '', loading: true })
    newVehicle(token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {

        setValues({
          ...values,
          brand: '',
          model: '',
          year: '',
          transmissionType: '',
          petrolType: '',
          price: '',
          description: '',
          quantity: '',
          imgUrl: '',
          loading: false,
          createdVehicle: data.brand
        })
      }
    })
  }

  const newVehicleForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Imagen del vehiculo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('imgUrl')}
            type='file'
            name='imgUrl'
            accept='image/*'
          />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Marca</label>
        <input
          onChange={handleChange('brand')}
          type='text'
          className='form-control'
          value={brand}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Modelo</label>
        <input
          onChange={handleChange('model')}
          type='text'
          className='form-control'
          value={model}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Año</label>
        <input
          onChange={handleChange('year')}
          type='text'
          className='form-control'
          value={year}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Tipo de transmision</label>
        <input
          onChange={handleChange('transmissionType')}
          type='text'
          className='form-control'
          value={transmissionType}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Tipo de gasolina</label>
        <input
          onChange={handleChange('petrolType')}
          type='text'
          className='form-control'
          value={petrolType}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price del alquiler por dia</label>
        <input
          onChange={handleChange('price')}
          type='text'
          className='form-control'
          value={price}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Cantidad del vehiculo</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Categoria</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          type='text'
          className='form-control'
        >
          <option>Selecciona una Categoria</option>
          {category &&
            category.map((category, index) => (
              <option key={index} value={category.value}>
                {category.name}
              </option>
            ))}
        </select>
      </div>


      <div className='form-group'>
        <label className='text-muted'>Descipcion</label>
        <input
          onChange={handleChange('description')}
          type='text'
          className='form-control'
          value={description}
        />
      </div>


      <button className='btn btn-outline-primary'>Guardar vehiculo</button>
    </form>
  )


  return (
    <>
      <Navigation />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Crear vehiculos</h2>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newVehicleForm()}
          </div>
        </div>
      </div>
    </>
  )
}


export default NewVehicle;