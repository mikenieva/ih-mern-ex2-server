const express = require('express')
const router = express.Router()
const sessionController = require('./../controllers/sessionController')


/**
 * AUTHJS
 * 2 rutas, una para iniciar la sesión. Otra para verificarla.
 */

// INICIAR SESIÓN
router.post('/create-checkout-session', sessionController.generateSession)


module.exports = router
