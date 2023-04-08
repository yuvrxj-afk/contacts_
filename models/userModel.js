const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true],
        unique: [true, "Already Taken"]
    },
    password: {
        type: String,
        required: [true]
    }
},
    {
         timeStamps: true 
    }
)

module.exports = mongoose.model('User', UserSchema)