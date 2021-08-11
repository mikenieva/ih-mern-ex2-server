const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const User = mongoose.model("User", UsersSchema)

module.exports = User


