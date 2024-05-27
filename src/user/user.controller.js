'use strict'

import User from './user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { encrypt, checkPassword } from '../utils/validator.js'
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


const mathRandom = () =>{
    let num = ''
    for(let i = 0; i < 20; i++){
        num += Math.floor(Math.random() * 10)
    }
    return num
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
            noaccount: mathRandom(),
            DPI: '1234567891234',
            adress: 'ADMINB',
            email: 'ADMINB',
            phone: '12345678',
            role: 'ADMIN',
            jobname: 'asdasd',
            monthlyincome: '2503.20'
        })
         
        await newUser.save()
    }   
    } catch (err) {
        console.error(err)
    }
} 

export const register = async(req, res) =>{
    try {
        let data = req.body
        let findUser = await User.findOne({username: data.username})
        if(findUser) return res.status(403).send({message: `User ${data.username} alredy exists`})
        data.password = await encrypt(data.password) 
        data,noaccount = await mathRandom()
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save()
        return res.send({message: `Register successfully, can be logged with user ${user.username}`})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error register user ' })
    }
}