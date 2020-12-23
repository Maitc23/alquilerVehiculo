const controller = {};

const Vehicles = require('../models/vehicle');

controller.newVehicle = async (req, res, next) => {
    try {
        const { brand, model, year, transmissionType, petrolType, price, description, category, quantity } = req.body;

        if (!brand || !model || !year || !transmissionType || !petrolType || !price || !category) {
            return res.status(400).json({ message: "Campos obligatorios no llenados" });
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

controller.listVehicles = async (req, res, next) => {
    try {
        let order = req.query.order ? req.query.order : 'asc' //Ordenamos de forma ascendente
        let sortBy = req.query.sortBy ? req.query.sortBy : 'brand' //Filtramos por la marca del vehiculo

        const vehicles = await Vehicles.find()
            .populate({ path: 'category' })
            .sort([[sortBy, order]])

        if (!vehicles || vehicles.length === 0) {
            return res.status(400).send('No tiene vehiculos registrados');
        }

        res.json(vehicles);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

controller.removeVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicles.findByIdAndDelete(req.params);

        if (!vehicle) {
            return res.status(400).send('Este Vehiculo no existe en la BD');
        }

        res.status(200).json({ message: 'Vehiculo borrado' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

controller.vehicleById = async (req, res, next) => {
    try {

        const vehicle = await Vehicles.findById(req.params)
            .populate({ path: 'category' });

        if (vehicle === null || vehicle.length === 0) {
            return res.status(400).json({ message: 'Vehiculo seleccionado no disponible' });
        }

        res.status(200).json(vehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = controller