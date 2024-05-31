'use strict'

import User from './user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) =>{
    console.log('Test is running');
    return res.send({message: 'Test is running'})
}

export const login = async(req, res) => {
    try {
        let {account, password} = req.body
        let user = await User.findOne({
            $or: [
                {username: account},
                {email: account}
            ]
        })
       if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {message: `Welcome ${loggedUser.name}`
                , loggedUser, token})
        }
        return res.status(400).send({message: `User not found`})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to login'})
    }
}

export const userDefect = async(req,res) =>{
    try {
        const userExists = await User.findOne({username: 'ADMINB'})        
        if(userExists){
           console.log('usuario existente')
        }else{
        const encryptPassword = await encrypt('ADMINB')
        const newUser = new User({
            name: 'ADMINB',
            surname: 'ADMINB',
            username: 'ADMINB',
            password: encryptPassword,
            DPI: '1234567891234',
            address: 'ADMINB',
            email: 'ADMINB',
            phone: '12345678',
            role: 'ADMIN',
            jobname: 'asdasd',
            monthlyincome: '00.00'
        })
         
        await newUser.save()
    }   
    } catch (err) {
        console.error(err)
    }
} 

//Register general 
export const register = async(req, res) =>{
    try {
        let data = req.body
        let findUser = await User.findOne({
            $or: [
                {username: data.username},
                {email: data.email}
            ]
        })
        if(findUser) return res.status(403).send({message: `User ${data.username} alredy exists`})
        data.password = await encrypt(data.password) 
        let user = new User(data)
        await user.save()
        return res.send({message: `Register successfully, can be logged with user ${user.username}`})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error register user', err })
    }
}
/* ADMIN A ADMIN  */
export const updateAdmin = async(req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that can not be update'})
        let secretKey = process.env.SECRET_KEY
        let token = req.headers.authorization
        const { uid } = jwt.verify(token, secretKey)
        if( uid != id) return res.status(404).send({message: 'You cant not update another ADMIN'})
        let updateAdmin = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateAdmin) return res.status(404).send({message: 'ADMIN not found and not update'})
        return res.send({message: 'ADMIN updated successfully', updateAdmin})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error updating ADMIN'})
    }
}
/* update client ADMIN A CLIENTE*/
export const update = async(req, res) =>{
    try {
        let { id } = req.params
        let data = req.body
        let userToUpdate = await User.findById(id)
        if(userToUpdate.role === 'ADMIN') {
            return res.status(403).send({ message: 'No se permite actualizar usuarios con rol de administrador' });
        }
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that can not be update'})
        data.password = await encrypt(data.password)
        let updateUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if(!updateUser) return res.status(401).send({message: 'User not fount and not update'})
        return res.send({message: 'Update user', updateUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username)return res.status(400).send({message: `Username ${err.keyValue.username} is alredy exists`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

/* CLIENT A CLIENT */
export const updateClient = async(req, res) =>{
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that can not be update'})
        let secretKey = process.env.SECRET_KEY
        let token = req.headers.authorization
        const { uid } = jwt.verify(token, secretKey)
        if(uid != id ) return res.status(404).send({ message: 'You can not update another CLIENT'})
        data.password = await encrypt(data.password)
        let updateUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if(!updateUser) return res.status(401).send({message: 'User not fount and not update'})
        return res.send({message: 'Update user', updateUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username)return res.status(400).send({message: `Username ${err.keyValue.username} is alredy exists`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

/* ADMIN a CLIENT */
export const deleteUser = async(req, res)=>{
    try {
        let { id } = req.params
        let userToDelete = await User.findById(id)
        if(userToDelete.role === 'ADMIN') {
            return res.status(403).send({ message: 'No se permite eliminar usuarios con rol de administrador' });
        }
        let deletedUser = await User.findOneAndDelete({_id: id})
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not delete'})
        return res.send({message: `Account with username ${deletedUser.username} delete successfully`}) 
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: `Error deleting account`})
    }
}


export const getUser = async(req, res) => {
    try {
        let users = await User.find()
        return res.send({users})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error getting users'})
    }
}

/* FUNCIONES DEL ADMIN AL CLIENTE 
    EDITAR, ELIMINAR, VISUALIZAR, AGREGAR OTRO ADMIN o CLIENTE

    EXCEPTO A OTRO ADMIN
*/

