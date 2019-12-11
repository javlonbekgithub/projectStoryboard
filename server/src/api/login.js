const Router = require ('express')
const { User } = require ('../schemas/user')
const sha256 = require("crypto-js/sha256")
const{ sendError } = require('../helpers')
const { generateToken } = require('../helpers')

login = Router()

login.post('/', async (req,res) => {
    user = req.body
    dbUser = await User.findOne({email: user.email})
    
    if (dbUser) {
        if (sha256(user.password).toString() === dbUser.password) {
            let { name , avatar , stories } = dbUser
            res.json({
                name, avatar, stories,
                token:generateToken(dbUser.email)
            })
        }
        else {
            res.json(sendError('incorrect password'))
        }         
    }
    else {
        res.json(sendError('user_not found'))
    }

})
module.exports = { login }


