const { Schema, model } = require('mongoose');
const { host, port } = require('../config/config')

const vehicleSchema = new Schema({

    brand: {
        type: String,
        trim: true,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        trim: true
    },
    transmissionType: {
        type: String,
        required: true
    },
    petrolType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        maxlength: 2000
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    solicitante: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    quantity: {
        type: Number,
        default: 1
    },
    state: {
        type: Number, 
        default: 0
    },
    imgUrl: String
},
    { timestamps: true }
);

vehicleSchema.methods.setImgUrl = function setImgUrl(filename) {
    this.imgUrl = `${host}:${port}/public/${filename}`;

}
module.exports = model('Vehicles', vehicleSchema);