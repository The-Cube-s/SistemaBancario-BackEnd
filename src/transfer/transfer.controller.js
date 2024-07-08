import Transfer from '../transfer/transfer.model.js'
import Account from '../account/account.model.js'
import User from '../user/user.model.js'

export const getAccountInfo = async (req, res) => {
    try {
        const userId = req.user.id;

        // Obtener todas las transferencias del usuario y popular los datos relevantes
        const transfers = await Transfer.find({ user: userId })
            .populate('user', 'name') // Popular el nombre del usuario
            .populate('userTarget', 'typeofaccount'); // Popular el tipo de cuenta del usuario de destino

        let saldo = 0;
        transfers.forEach(transfer => {
            if (transfer.userTarget._id.toString() === userId.toString()) {
                saldo += transfer.amount;
            } else {
                saldo -= transfer.amount;
            }
        });

        // Respuesta con el saldo y el historial de transferencias
        res.status(200).send({ saldo, transfers });
    } catch (error) {
        console.error('Error al obtener la información de la cuenta:', error);
        res.status(500).send({ message: 'Error al obtener la información de la cuenta' });
    }
};

// realiza una transferencia
export const transferAmount = async (req, res) => {
    try {
        const { noaccount, amount } = req.body;
        const userId = req.user.id;  // Obtener el ID del usuario autenticado
        const dpi = req.user.DPI;  // Obtener el DPI del usuario autenticado
        /*console.log(`DPI del usuario logeado: ${dpi}`);
        console.log(`NoAccount recibido: ${noaccount}`);
        console.log(`Amount recibido: ${amount}`);*/
        if (amount > 2000) return res.status(400).send({ message: 'No se puede transferir más de Q2000' });
        const accountOrigin = await Account.findOne({ user: userId }).populate('user');
        if (!accountOrigin) {
            console.error(`No se encontró cuenta con DPI del usuario logeado: ${dpi}`);
            return res.status(404).send({ message: 'La cuenta origen no existe' });
        }
        // Verifica que el usuario no exceda el límite diario de Q10000
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const totalTransfersToday = await Transfer.aggregate([
            { $match: { user: userId, date: { $gte: today } } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);
        const totalToday = totalTransfersToday.length > 0 ? totalTransfersToday[0].totalAmount : 0;
        if (totalToday + amount > 10000) return res.status(400).send({ message: 'Se ha excedido el límite de transferencia diario' });
        // Verifica si la cuenta destino existe
        const accountDest = await Account.findOne({ noaccount });
        if (!accountDest) {
            console.error(`No se encontró cuenta con NoAccount: ${noaccount}`);
            return res.status(404).send({ message: 'La cuenta destino no existe' });
        }
        // Verifica que el usuario no transfiera más de su saldo actual
        if (amount > accountOrigin.balance) {
            return res.status(400).send({ message: 'No tienes suficientes fondos para realizar esta transferencia' });
        }
        // Realiza la transferencia
        const transfer = new Transfer({
            date: new Date(),
            amount,
            userTarget: accountDest._id, // ID de la cuenta destino
            user: userId, // ID del usuario remitente
            account: accountOrigin._id // ID de la cuenta origen
        });
        await transfer.save();
        // Actualiza los saldos de las cuentas
        await Account.findByIdAndUpdate(accountDest._id, { $inc: { balance: amount } });
        await Account.findByIdAndUpdate(accountOrigin._id, { $inc: { balance: -amount } });

        res.status(200).send({ message: 'Transferencia realizada exitosamente' });
    } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        res.status(500).send({ message: 'Error al realizar la transferencia' });
    }
};