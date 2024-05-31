//Levantamos el serivdor http con express   
'use strict'

//Importaciones
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import { config } from "dotenv"
import userRoutes from '../src/user/user.routes.js'
import productRoutes from '../src/product/product.routes.js'

//Configuraciones
const app = express()
config()
const port = process.env.PORT || 3056

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/user', userRoutes)
app.use('/product', productRoutes)

export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}