const CYPHER = require('./env')
const aes = require('crypto-js/aes')
const utf8 = require('crypto-js/enc-utf8')
const { User } = require('./schemas/user')

const sendError = error => ({error})

const generateToken = email => {
    let token = `${email}|${new Date().valueOf() + (3600000 * 24)}`
    return aes.encrypt(token, CYPHER.toString()).toString()
}

const checkToken = async (req , res , next) => {
    let token = req.body.token

    if (token) {
       let changedtoken = aes.decrypt(token, CYPHER.toString()).toString(utf8)
        let email = changedtoken.split('|')[0]
        let expiredDate = changedtoken.split('|')[1]    
        if (expiredDate <= new Date().valueOf()) {
            res.json(sendError('token-expired'))
        } else {
            let user = await User.findOne({ email})
            if (user){
            req.currentUser = user
            delete req.body.token        
            next()
        }
        }
    } else {
        res.json(sendError('no-token-sent'))
    }
} 
module.exports = { sendError, generateToken, checkToken}