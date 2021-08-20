const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {

    // REVISIÓN DE VALIDACIONES

    const errors = validationResult(req)

    console.log(errors)

    // NO HAYA ERRORES
    if(!errors.isEmpty()){

        return res.status(400).json({
            msg: errors.array()
        })
    }

    const { username, email, password } = req.body

    try {

        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)

        const respuestaDB = await User.create({
            username, 
            email, 
            password: hashedPassword
        })
        
        // USUARIO CREADO. VAMOS A CREAR EL JSON WEB TOKEN

        // CREAR UN JWT
        const payload = {
            user: {
                id: respuestaDB._id 
            }
        }
        
        // FIRMAR EL JWT
        jwt.sign(
            payload, // LOS DATOS QUE SE ENVÍAN AL FRONT (CLIENTE)
            process.env.SECRET, // ESTA ES LA LLAVE PARA DESCIFRAR LA FIRMA ELECTRÓNICA,
            {
                expiresIn: 360000
            },
            (error, token) => {

                if(error) throw error

                res.json({
                    token
                })
            }
        )

    } catch (error) {

        return res.status(400).json({
            msg: error
        })

    }

}




