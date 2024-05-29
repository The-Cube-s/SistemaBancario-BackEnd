'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let token = req.body.token || req.query.token || req.headers['authorization']
        if (!token) return res.status(401).send('A token is required for authentication')
        //token = token.replace(/^Bearer\s+/, '')
        let { uid } = jwt.verify(token, secretKey)
        let user = await User.findOne({ _id: uid })
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token'})
    }
}

export const isAdmin = async(req, res, next) =>{
    try{
        let { user } = req
        if(!user ||  user.role !== 'ADMIN') return res.status(403).send({message: `You don't have access | username: ${ user.username}`}) 
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send({message: 'Unauthorized role'})
    }
}

export const isClient = async(req, res, next) => {
    try {
        let { user } = req
        if(!user || user.role !== 'CLIENT') return res.status(403).send({message: `You don´t have access | username: ${user.username}`})
        next()
    } catch (err) {
        console.error(err)
        return res.status(403).send({message: 'Unauthorized role'})
    }
}