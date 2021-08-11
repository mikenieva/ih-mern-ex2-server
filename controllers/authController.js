const Usuario = require('./../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")



exports.verifyingToken = async (req, res) => {

    console.log(req.user)

    try {
        const usuario = await Usuario.findById(req.user.id).select('-password')

        res.json({usuario})

    } catch (error) {
        res.status(500).json({msg: "Hubo un error"})
    }


}

exports.loginUser = async (req, res) => {

    const {email, password} = req.body


    try {

        let foundUser = await Usuario.findOne({email})

        console.log("obteniendo usuario:", foundUser)

        if(!foundUser){
            return res.status(400).json({msg: "El usuario no existe"})
        }

        // Revisar el password    
        const passCorrecto = await bcryptjs.compare(password, foundUser.password)
        
        if(!passCorrecto){
            return await res.status(400).json({msg: "Password incorrecto"})
        }

        // Si todo correcto, crear JSON WEB TOKEN
        const payload = {
            user: {
                id: foundUser.id
            }
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600000
        }, (error, token) => {
            if(error) throw error;

            // MENSAJE DE CONFIRMACIÓN
            console.log(token)
            res.json({token})
        })
        
    } catch (error) {
        console.log(error)
    }

}