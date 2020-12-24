const controller = {};

const Vehicles = require('../models/vehicle');
const User = require('../models/user')


//Insertamos un nuevo vehiculo
controller.newVehicle = async (req, res, next) => {
    try {
        const { brand, model, year, transmissionType, petrolType, price, description, category, quantity } = req.body;

        if (!brand || !model || !year || !transmissionType || !petrolType || !price || !category) {
            return res.status(400).json({ error: "Campos obligatorios no llenados" });
        }

        const vehicle = new Vehicles({
            brand,
            model,
            year,
            transmissionType,
            petrolType,
            price,
            description,
            category,
            quantity
        })

        if (req.file) {
            const { filename } = req.file
            vehicle.setImgUrl(filename)
        }
        await vehicle.save();
        res.status(200).send({ message: 'Vehiculo guardado' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Lista de todos los vehiculos disponibles
controller.listVehicles = async (req, res, next) => {
    try {
        let order = req.query.order ? req.query.order : 'asc' //Ordenamos de forma ascendente
        let sortBy = req.query.sortBy ? req.query.sortBy : 'brand' //Filtramos por la marca del vehiculo

        const vehicles = await Vehicles.find()
            .populate({ path: 'category' })
            .sort([[sortBy, order]])

        if (!vehicles || vehicles.length === 0) {
            return res.status(400).json({error:'No tiene vehiculos registrados'});
        }

        res.json(vehicles);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Borramos vehiculos
controller.removeVehicle = async (req, res, next) => {
    try {
        //Buscamos al vehiculo por su ID y lo borramos
        const vehicle = await Vehicles.findByIdAndDelete(req.params);

        if (!vehicle) {
            return res.status(400).json({error:'Este Vehiculo no existe en la BD'});
        }

        res.status(200).json({ message: 'Vehiculo borrado' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

//Obtenemos un vehiculo en especifico
controller.vehicleById = async (req, res, next) => {
    try {
        //Obtenemos el vehiculo por su Id
        const vehicle = await Vehicles.findById(req.params)
            .populate({ path: 'category' });

        if (vehicle === null || vehicle.length === 0) {
            return res.status(400).json({ error: 'Vehiculo seleccionado no disponible' });
        }

        res.status(200).json(vehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


//Hacemos de rol de cliente y aqui rentamos el auto
controller.rentVehicle = async (req, res, next) => {
    try {

        const user = await User.findById(req.userId);

        //Buscamos el vehiculo por su id, restamos la cantidad disponible del mismo y cambiamos el estado de renta
        const vehicle = await Vehicles.findByIdAndUpdate(req.params, {
            solicitante: user,
            $inc: { quantity: -1 },
            state: 1
        });

        if (vehicle.quantity <= 0) {
            return res.status(400).json({ error: 'No quedan vehiculos de este tipo, disponibles para rentar, intente mas tarde' });
        }

        //Insertamos el vehiculo en el historial de renta del usuario
        user.vehicles.push(vehicle);
        await user.save();

        return res.status(200).json({ message: 'Vehiculo rentado' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



module.exports = controller