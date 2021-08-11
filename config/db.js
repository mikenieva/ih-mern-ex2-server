const mongoose = require('mongoose')

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log("Conectados a la base de datos")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}


module.exports = conectarDB
