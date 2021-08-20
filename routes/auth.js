const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authController')

const auth = require('./../middlewares/auth')


/**
 * AUTHJS
 * 2 rutas, una para iniciar la sesión. Otra para verificarla.
 */

// INICIAR SESIÓN
router.post('/login', authController.loginUser)

// VERIFICAR SESIÓN
router.get("/", auth, authController.verifyingToken)

module.exports = router
