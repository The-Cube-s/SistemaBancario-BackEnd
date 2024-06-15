'use strict'
import Favorite from './favorites.model.js'
import Account from '../account/account.model.js'
import User from '../user/user.model.js'

// Controlador para agregar favoritos
export const addFavorite = async (req, res) => {
    try {
        let data = req.body
        let account = await Account.findOne({ _id: data.account })
        if(!account) return res.status(404).send({ message: 'Account not found'})
        
        let favorite = await Favorite.findOne({ alias: data.alias, account: data.account })
        if(favorite) return res.status(404).send({ message: 'Alias or account must be diferent'})
        let favorites = new Favorite(data)
        await favorites.save()
        return res.send({message: 'Add favorites was successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding favorite' });
    }
};


export const getAllFavorites = async(req, res) => {
    try {
        let favorite = await Favorite.find()
        //console.log(favorite[0].account);
        let account = await Account.findOne({_id: favorite[0].account})
        let user = await User.findOne({ _id: account.user})

        console.log(user.name, user.DPI, user.surname);
        let dataUser = "Name: "+ user.name + " " + "DPI: " + user.DPI + " " + " Apellido: "+ user.surname;
        //console.log(account);
        return res.send({favorite, dataUser})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting favorite' });
    }
}

export const getById = async(req, res) => {
    try {
        let { search } = req.body
        let favorite = await Favorite.find({ _id: search })
        //console.log(favorite[0].account);
        let account = await Account.findOne({_id: favorite[0].account})
        let user = await User.findOne({ _id: account.user})

        console.log(user.name, user.DPI, user.surname);
        let dataUser = "Name: "+ user.name + " " + "DPI: " + user.DPI + " " + " Apellido: "+ user.surname;
        //console.log(account);
        return res.send({favorite, dataUser})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting favorite' });
    }
}


