import { API } from '../config';


//Obtenemos los vehiculos del backend 
export const getVehicles = () => {
    return fetch(
        `${API}/vehicles`,
        {
            method: 'GET'
        }
    )
        .then(response => {
            console.log(response);
            return response.json()
        })
        .catch(err => console.log(err))
}

//Obtenemos un vehiculo en especifico del backend
export const getVehicleById = (_id) => {
    return fetch(
        `${API}/vehicle/` + _id,
        {
            method: 'GET'
        })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .catch(err => console.log(err))
}

// Log in
export const login = user => {
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })
}

//Obtenemos los datos del usuario logeado
export const me = (token) => {
    return fetch(`${API}/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
    }
    )
        .then(response => {
            console.log(response);
            return response.json()
        })
        .catch(err => console.log(err))
}

//Registramos usuarios
export const register = user => {
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })
}

//Log out
export const singout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('x-access-token');
        next();
    }
}

//Autenticamos y seteamos el token de la sesion del usario
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('x-access-token', JSON.stringify(data));
        next()
    }
}


//Verificamos si el usuario esta loggeado
export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        console.log('false')
        return false;

    }
    if (localStorage.getItem('x-access-token')) {
        return JSON.parse(localStorage.getItem('x-access-token'))
    }
    return false;
}

//Creamos una categoria
export const newCategory = (token, name) => {
    return fetch(`${API}/category`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(name)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })
}

//Obtenemos las categorias creadas
export const getCategories = (token) => {
    return fetch(`${API}/category`, {
        method: 'GET',
        headers: {
            'x-access-token': token
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })
}

//Creamos un nuevo vehiculo
export const newVehicle = (token, vehicle) => {
    console.log(vehicle);
    return fetch(`${API}/vehicles`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        },
        body: vehicle

    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })
}

//Rentamos un vehiculo
export const rentVehicle = (token, id) => {
    console.log(id);
       return fetch(`${API}/vehicle/`+ id, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })

}
