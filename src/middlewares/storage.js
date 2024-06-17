import multer from "multer";
import path from "path";
import fs from "fs";

// Asegurar que la carpeta "uploads" exista
const ensureUploadsFolder = () => {
    const uploadsFolderPath = './src/uploads';
    if (!fs.existsSync(uploadsFolderPath)) {
        fs.mkdirSync(uploadsFolderPath, { recursive: true }); // Crear la carpeta, incluyendo cualquier carpeta padre necesaria
    }
};

// Configuración de almacenamiento para guardar imágenes
const save = multer.diskStorage({
    destination: (req, file, cb) => {
        ensureUploadsFolder(); // Asegurar que la carpeta "uploads" exista
        cb(null, './src/uploads'); // Guardar archivos en la carpeta "uploads"
    },
    filename: (req, file, cb) => {
        if (file !== null) {
            // Eliminar la extensión del nombre original del archivo
            const fileNameWithoutExt = file.originalname.split('.').slice(0, -1).join('.');
            // Obtener la extensión del archivo
            const ext = file.originalname.split('.').pop();
            // Crear un nuevo nombre de archivo único
            const fileName = `${fileNameWithoutExt}-${Date.now()}.${ext}`;
            cb(null, fileName);
        }
    }
});

/**
 * Filtro de archivos para asegurarse de que solo se acepten imágenes con los formatos permitidos.
 * @param {Object} res - El objeto de respuesta
 * @param {Object} file - El archivo subido
 * @param {Function} cb - Callback para continuar con la carga del archivo
 */
const filter = (res, file, cb) => {
    if (file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(null, false); // Rechazar el archivo
    }
};

// Middleware para validar y almacenar imágenes usando multer
export const validateImage = multer({ storage: save, fileFilter: filter });