// 1. IMPORTACIONES
const express = require("express")
const cors = require('cors')

const conectarDB = require('./config/db')

const app = express()

// 2. MIDDLEWARES
// CONSEGUIMOS LAS VARIABLES DE ENTORNO
require('dotenv').config()

// NOS CONECTAMOS A BASE DE DATOS
conectarDB()

app.use(cors())

app.use(express.json({extended: true}))


// 3. RUTEO

app.use("/api/users", require('./routes/users'))
app.use("/api/auth", require('./routes/auth'))



app.get("/", (req, res) => {
    res.send("Hola!")
})

// 4. SERVIDOR

app.listen(process.env.PORT, () => {
    console.log("Estamos conectados al servidor")
})




