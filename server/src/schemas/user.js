
const { Schema, model } = require('mongoose')
const { URL } = require('../env')

const userSchema = new Schema ({
    email: String,
    password: String,
    data_created: {
        type: Date,
        default: Date.now
    },
    stories: [{
        ref: 'Stories',
        type: Schema.Types.ObjectId,
    }],
    avatar: {
        type: String,
        default: `${URL}/avatars/avatar.png`
    },
    name: {
        type: String,
        default: `New_User@${Math.random().toString().slice(2, 8)}`
    }
})
const User = model('Users',userSchema)
module.exports = { User }
