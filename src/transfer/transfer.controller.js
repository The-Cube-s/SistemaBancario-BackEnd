import Transfer from '../transfer/transfer.model.js'
import Account from '../account/account.model.js'

// historial de la cuenta
export const getAccountInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        // Busca todas las transferencias asociadas al usuario
        const transfers = await Transfer.find({ user: userId });
        // Calcula el saldo actual sumando los créditos y restando los débitos
        let saldo = 0;
        transfers.fgitorEach(transfer => {
            if (transfer.userTarget.toString() === userId.toString()) {
                saldo += transfer.amount // Crédito
            } else {
                saldo -= transfer.amount // Débito
            }
        })

        // respuesta con el saldo y el historial de transferencias
        res.status(200).json({ saldo, transfers })
    } catch (error) {
        console.error('Error al obtener la información de la cuenta:', error)
        res.status(500).json({ message: 'Error al obtener la información de la cuenta' })
    }
}

// realiza una transferencia
export const transferAmount = async (req, res) => {
    try {
        const { noaccount, dpi, amount } = req.body
        const userId = req.user.id
        // Verifica que el monto no exceda Q2000
        if (amount > 2000) {
            return res.status(400).json({ message: 'No se puede transferir más de Q2000' })
        }
        // Verifica que el usuario no exceda el límite diario de Q10000
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const totalTransfersToday = await Transfer.aggregate([
            { $match: { user: userId, date: { $gte: today } } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ])
        const totalToday = totalTransfersToday.length > 0 ? totalTransfersToday[0].totalAmount : 0
        if (totalToday + amount > 10000) {
            return res.status(400).json({ message: 'Se ha excedido el límite de transferencia diario' })
        }
        // Verifica si la cuenta destino existe
        const account = await Account.findOne({ noaccount, user: userId })
        if (!account) {
            return res.status(404).json({ message: 'La cuenta destino no existe' })
        }
        // Verifica que el usuario no transfiera más de su saldo actual
        if (amount > account.balance) {
            return res.status(400).json({ message: 'No tienes suficientes fondos para realizar esta transferencia' })
        }
        // Realiza la transferencia
        const transfer = new Transfer({
            date: new Date(),
            amount,
            userTarget: account._id, // ID de la cuenta destino
            user: userId // ID del usuario remitente
        });
        await transfer.save();
        // Actualiza los saldos de las cuentas
        await Account.findByIdAndUpdate(account._id, { $inc: { balance: amount } })
        await Account.findByIdAndUpdate(userId, { $inc: { balance: -amount } })

        res.status(200).json({ message: 'Transferencia realizada exitosamente' })
    } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        res.status(500).json({ message: 'Error al realizar la transferencia' })
    }
};