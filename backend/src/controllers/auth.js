const controller = {}; 

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

controller.register = async (req, res, next) =>{ 
    try { 
        const {name, lastName, email, password, userType, passwordCheck} = req.body;
        const correo = email.toLowerCase()

        if(!correo || !password || !passwordCheck) {
            return res.status(400).json({message: "Campos obligatorios no llenados"})
        }
        
        if(password.length < 5) {
            return res.status(400).json({message: "La contraseña debe ser de 5 caracteres minimo"})
        }
    
        if(password !== passwordCheck) { 
            return res.status(400).json({message: "Las contraseñas no coinciden"});
        }

        if(userType === null) {
            return res.status(400).json({message: "Seleccione su tipo de usuario"});
        }
    

        const existingEmail= await User.findOne({email: correo});

        if(existingEmail) {
            return res.status(400).json({message: "Correo ya registrado"});
        }

        const user = new User({
            name: name, 
            lastName: lastName, 
            email: correo, 
            password: password, 
            userType: userType       
        });
    
        user.password = await user.encryptPassword(user.password); 
        await user.save();
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        });

        res.json({
            auth: true,
            token: token,
            message: 'Usuario creado'
        });

    }catch(err) {
        res.status(500).json({error: err.message});
    }
}

controller.login = async (req,res, next)=> { 

    try {
        const {email, password} = req.body;
        const correo = email.toLowerCase()

        if(!correo || !password) {
            return res.status(400).json({message: "Campos vacios."})
        }
        const user = await User.findOne({email: correo})
    
        if(!user) {
            return res.status(400).json({message: "Correo o Contraseña incorrectos"});
        }
    
        const validPassword = await user.validatePassword(password);
        
        if(!validPassword) {
            return res.status(401).json({auth: false, token: null, message: "Correo o Contraseña incorrectos"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET || config.secret, {
            expiresIn: 60 * 60 * 24
        });
    
        res.json({
            auth: true,
            token,
            user: {
                id: user._id,
                name: user.name, 
                lastName: user.lastName,
                email: user.email,
                userType: user.userType
            } 
        });

    }catch(err) {
        res.status(500).json({error: err.message});
    }
}

controller.me = async (req,res, next) => { 
    
    const user = await User.findById(req.userId, { password: 0});
    
    if(!user){
        return res.status(404).send('USER NOT FOUND')
    }

    res.json(user)
}

controller.deleteAccount = async (req, res, next) => { 
    try {
        const deletedUser = await User.findByIdAndDelete(req.userId);
        res.json(deletedUser);

    }catch(err) {
        res.status(500).json({error: err.message});
    }
}

controller.tokenIsValid = async (req, res, next) => { 
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.json(false);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || config.secret);

        if(!decoded) {
            return res.json(false);
        }

        const user = await User.findById(decoded.id);
        if(!user) {
            return res.json(false);
        }

        return res.json(true);

    }catch(err) {
        res.status(500).json({error: err.message});
    }
}


module.exports = controller;