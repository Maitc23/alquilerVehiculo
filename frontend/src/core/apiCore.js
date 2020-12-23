import {API} from '../config';

export const getVehicles = () =>{
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
        .catch(err =>  console.log(err))
}
