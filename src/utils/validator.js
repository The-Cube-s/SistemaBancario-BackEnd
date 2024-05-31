'use strict'
import { hash, compare } from 'bcrypt'

export const encrypt = (password) =>{
    try {
        return hash(password, 10)
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkPassword = async(password, hash) =>{
    try {
        return await compare(password, hash)
    } catch (error) {
        console.error(error)
        return error
    }
}

//Validacion de updateUser (No se puede cambiar los campos de abajo)
export const checkUpdate = (data, userId) => {
    if (userId) {
        // Estos campos no se pueden editar
        const nonEditableFields = ['name', 'DPI', 'noaccount', 'address', 'jobname', 'monthlyincome']; 
        const containsNonEditableFields = Object.keys(data).some(key => nonEditableFields.includes(key));

        if (containsNonEditableFields) {
            return false;
        }
        // Decimos que password no debe estar vacia
        if (Object.entries(data).length === 0 || data.password === '') {
            return false;
        }
        return true;
    }
    return false;
};

export const checkUpdateProduct = async(data, productId)=>{
    if (productId){
        //validamos si data esta vacío   o 
        if(Object.entries(data).length === 0 ||
        data.name ||
        data.name == ''||
        data.description ||
        data.description == ''||
        data.price ||
        data.price == ''){
            return false
        }
        return true
    }
}
