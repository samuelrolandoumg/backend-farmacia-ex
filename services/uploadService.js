const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');
const path = require('path');

const uploadFileToCloudinary = async (file) => {
    try {
        const filePath = path.join(__dirname, '../uploads', file.originalname);
        fs.writeFileSync(filePath, file.buffer); // Guarda el archivo temporalmente

        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'farmacia',
            use_filename: true,
            unique_filename: false,
            resource_type: 'auto'
        });

        fs.unlinkSync(filePath); // Elimina el archivo temporal

        return result.secure_url;
    } catch (error) {
        throw new Error(`Error subiendo a Cloudinary: ${error.message}`);
    }
};

module.exports = { uploadFileToCloudinary };
