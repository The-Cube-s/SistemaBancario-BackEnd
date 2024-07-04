import Transfer from '../transfer/transfer.model.js'
import Deposit from '../account/account.model.js'
import User from '../user/user.model.js'
import Account from '../account/account.model.js';

export const getMyTransfer = async (req, res)=>{
    try {
        const userId = req.user.id; 
        const transfers = await Transfer.find({ user: userId }).populate('userTarget', 'account');

        res.status(200).send(transfers);
    } catch (error) {
        console.error('Error al cargar mis transferencias:', error);
        res.status(500).send({ message: 'Error al cargar' });
    }
}

//aun no lo termino
export const getMyDeposits = async (req, res) => {
    try {
        const userId = req.user.id;  // ID del usuario autenticado
        console.log("UserID from request:", userId);

        // Buscar depósitos directamente asociados al usuario
        const deposits = await Deposit.find({ user: userId }).select('date amount user');

        console.log("Deposits found for user:", deposits);

        if (!deposits.length) {
            console.log("No deposits found for the user.");
            return res.status(404).send({ message: "No deposits found for this user." });
        }

        res.status(200).send(deposits);
    } catch (error) {
        console.error('Error retrieving deposits:', error);
        res.status(500).send({ message: 'Error retrieving deposits' });
    }
}