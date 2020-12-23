const multer = require('multer'); 
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/storage/imgs')
    }, 
    filename: function(req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase())

    }

})

const upload = multer({
    storage,
    limits: {fileSize: 1000000}, 
    fileFilter:(req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype); 
        const extname = filetypes.test(path.extname(file.originalname)); 

        if(mimetype && extname) {
            return cb(null, true)
        }
        cb("Error: El archivo debe ser una imagen");
    }
})

module.exports = upload