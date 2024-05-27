import { initServer } from './config/app.js'
import { connect } from './config/mong.js'
//declarar rutas por defecto
import { userDefect } from './src/user/user.controller.js'
//import { categoryDefault } from './src/categories/categories.controller.js'

initServer()
connect()
userDefect()
//categoryDefault()