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
<<<<<<< HEAD
        transfers.forEach(transfer => {
=======
        transfers.fgitorEach(transfer => {
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
            if (transfer.userTarget.toString() === userId.toString()) {
                saldo += transfer.amount // Crédito
            } else {
                saldo -= transfer.amount // Débito
            }
        })

        // respuesta con el saldo y el historial de transferencias
<<<<<<< HEAD
        res.status(200).send({ saldo, transfers })
    } catch (error) {
        console.error('Error al obtener la información de la cuenta:', error)
        res.status(500).send({ message: 'Error al obtener la información de la cuenta' })
=======
        res.status(200).json({ saldo, transfers })
    } catch (error) {
        console.error('Error al obtener la información de la cuenta:', error)
        res.status(500).json({ message: 'Error al obtener la información de la cuenta' })
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
    }
}

// realiza una transferencia
export const transferAmount = async (req, res) => {
    try {
        const { noaccount, amount } = req.body;
        const userId = req.user.id;  // Obtener el ID del usuario autenticado
        const dpi = req.user.DPI;  // Obtener el DPI del usuario autenticado
<<<<<<< HEAD
        /*console.log(`DPI del usuario logeado: ${dpi}`);
        console.log(`NoAccount recibido: ${noaccount}`);
        console.log(`Amount recibido: ${amount}`);*/
        if (amount > 2000) return res.status(400).send({ message: 'No se puede transferir más de Q2000' });
        const accountOrigin = await Account.findOne({ user: userId }).populate('user');
        if (!accountOrigin) {
            console.error(`No se encontró cuenta con DPI del usuario logeado: ${dpi}`);
            return res.status(404).send({ message: 'La cuenta origen no existe' });
        }
=======

        console.log(`DPI del usuario logeado: ${dpi}`);
        console.log(`NoAccount recibido: ${noaccount}`);
        console.log(`Amount recibido: ${amount}`);

        // Verifica que el monto no exceda Q2000
        if (amount > 2000) {
            return res.status(400).json({ message: 'No se puede transferir más de Q2000' });
        }

        // Busca la cuenta origen por DPI del usuario autenticado
        const accountOrigin = await Account.findOne({ user: userId }).populate('user');
        if (!accountOrigin) {
            console.error(`No se encontró cuenta con DPI del usuario logeado: ${dpi}`);
            return res.status(404).json({ message: 'La cuenta origen no existe' });
        }

>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
        // Verifica que el usuario no exceda el límite diario de Q10000
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const totalTransfersToday = await Transfer.aggregate([
            { $match: { user: userId, date: { $gte: today } } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);
        const totalToday = totalTransfersToday.length > 0 ? totalTransfersToday[0].totalAmount : 0;
<<<<<<< HEAD
        if (totalToday + amount > 10000) return res.status(400).send({ message: 'Se ha excedido el límite de transferencia diario' });
=======
        if (totalToday + amount > 10000) {
            return res.status(400).json({ message: 'Se ha excedido el límite de transferencia diario' });
        }

>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
        // Verifica si la cuenta destino existe
        const accountDest = await Account.findOne({ noaccount });
        if (!accountDest) {
            console.error(`No se encontró cuenta con NoAccount: ${noaccount}`);
<<<<<<< HEAD
            return res.status(404).send({ message: 'La cuenta destino no existe' });
        }
        // Verifica que el usuario no transfiera más de su saldo actual
        if (amount > accountOrigin.balance) {
            return res.status(400).send({ message: 'No tienes suficientes fondos para realizar esta transferencia' });
        }
=======
            return res.status(404).json({ message: 'La cuenta destino no existe' });
        }

        // Verifica que el usuario no transfiera más de su saldo actual
        if (amount > accountOrigin.balance) {
            return res.status(400).json({ message: 'No tienes suficientes fondos para realizar esta transferencia' });
        }

>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
        // Realiza la transferencia
        const transfer = new Transfer({
            date: new Date(),
            amount,
            userTarget: accountDest._id, // ID de la cuenta destino
            user: userId, // ID del usuario remitente
            account: accountOrigin._id // ID de la cuenta origen
        });
        await transfer.save();
<<<<<<< HEAD
=======

>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
        // Actualiza los saldos de las cuentas
        await Account.findByIdAndUpdate(accountDest._id, { $inc: { balance: amount } });
        await Account.findByIdAndUpdate(accountOrigin._id, { $inc: { balance: -amount } });

<<<<<<< HEAD
        res.status(200).send({ message: 'Transferencia realizada exitosamente' });
    } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        res.status(500).send({ message: 'Error al realizar la transferencia' });
=======
        res.status(200).json({ message: 'Transferencia realizada exitosamente' });
    } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        res.status(500).json({ message: 'Error al realizar la transferencia' });
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
    }
};
