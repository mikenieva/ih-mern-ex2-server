const express = require('express')
const router = express.Router()

const { check } = require('express-validator')

const userController = require('./../controllers/userController')

/**
 * USERS.JS
 * Creación de usuarios. 1 ruta.
 */

router.post(
    "/create", 
    [
        check("username", "El nombre es obligatorio").not().isEmpty(),
        check("email", "Agrega un email válido").isEmail(),
        check("password", "El password debe ser mínimo de 6").isLength({min: 6})
    ]    // AQUÍ VA UN MIDDLEWARE DE VALIDACIÓN
    ,userController.createUser)

module.exports = router
