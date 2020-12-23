const controller = {};

const Category = require('../models/category');

controller.newCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Campos obligatorios no llenados" });
        }

        const category = new Category({
            name: name.toLowerCase()
        })

        await category.save();
        res.status(200).json({
            message: 'Categoria Creada'
        })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

controller.listCategory = async (req, res, next) => {
    try {
        const list = await Category.find();

        if (!list) {
            return res.status(400).send('No tiene categoria de vehiculos registradas');
        }
        res.status(200).json(list);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


controller.removeCategory = async (req, res, next) => {
    try {

        const category = await Category.findByIdAndDelete(req.params);
        
        if(!category) { 
            return res.status(400).send('Esta categoria no existe en la BD');  
        }

        res.status(200).json({ message: 'Categoria Borrada' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

controller.categoryById = async (req, res, next) => {

    try {
        const category = await Category.findById(req.params);

        if (category === null || category.length === 0) {
            return res.status(400).json({ message: 'Categoria seleccionada no disponible' })
        }

        res.status(200).json(category);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }


}


module.exports = controller;