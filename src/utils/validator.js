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

//Validacion de updateUser
export const checkUpdate = async(data, userId)=>{
    if (userId){
        //validamos si data esta vacío   o 
        if(Object.entries(data).length === 0  
        || data.password == ''){
            return false
        }
        return true
    }
}

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
