const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema( {

    name: String, 
    lastName: String, 
    userType: {
        type: Number,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true, 
        minlength: 5
    }
});

userSchema.methods.encryptPassword = async (password) => { 
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);

};

userSchema.methods.validatePassword = function (password) { 
   return  bcrypt.compare(password, this.password);
};

module.exports = model('Users', userSchema);