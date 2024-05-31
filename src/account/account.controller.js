'use strict'

import Account from './account.model.js'
import User from '../user/user.model.js'

const mathRandom = () =>{
    let num = ''
    for(let i = 0; i < 20; i++){
        num += Math.floor(Math.random() * 10)
    }
    return num
}

export const test = (req, res) =>{
    console.log('test is running');
    return res.send({message: 'Test is running'})
}

export const saveAccount = async(req, res) =>{
    try {
        let data = req.body
        let user = await User.findOne({_id: data.user})
        if(!user) return res.status(404).send({message: 'User not found'})
        let findAccount = await Account.findOne({user: data.user, typeofaccount: data.typeofaccount})
        if(findAccount) return res.status(401).send({message: 'Account alredy exists'})
<<<<<<< HEAD
        if(data.balance < 0 ) return res.status(401).send({message: 'The balance cannot be less than 0'})
        data.noaccount = await mathRandom()
        let account = new Account(data)
        await account.save()
        return res.send({message: 'Account save successfully', account})
=======
        data.noaccount = await mathRandom()
        let account = new Account(data)
        await account.save()
        return res.send({message: 'Account save successfully'})
>>>>>>> cd9232a1c22353d0ceac1943d526db0364888edd
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error save account'})
    }
}
<<<<<<< HEAD

export const getAccount = async(req, res) =>{
    try {
        let account = await Account.find()
        return res.send(account)
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting account'})
    }
}
=======
>>>>>>> cd9232a1c22353d0ceac1943d526db0364888edd
