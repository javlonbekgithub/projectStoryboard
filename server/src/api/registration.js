const Router = require ('express')
const { User } = require ('../schemas/user')
const sha256 = require("crypto-js/sha256")
const { sendError } = require('../helpers')
const { generateToken } = require('../helpers')

registration = Router()
registration.post('/', async (req,res) => {
  let user = req.body
  let dbRes = await User.findOne({ email: user.email })
  if(!dbRes) {
      user.password = sha256(user.password)
      let addedUser = await User.insertMany([user])
      if(addedUser) {
          let { name , avatar , stories } = addedUser[0]
          res.json({ 
              name,avatar,stories,
              token: generateToken(user.email) 
            })
      } else {
          // res.json({error:'can\'t'})
          res.json(sendError('can\'t'))
      }
  } else {
      // res.json({error:'already'})
      res.json(sendError('already'))
  }
})
   

module.exports =  { registration }


