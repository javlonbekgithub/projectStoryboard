const express = require('express')
const { registration } = require('./api/registration')
const cors = require('cors')
const { story } = require('./api/story')
const { login } = require('./api/login')
const { connect, connection, createConnection,set } = require('mongoose')
const path = require('path')

uri = 'mongodb://localhost/storyboard'
connect(uri , 
    {useNewUrlParser: true}
// { useUnifiedTopology: true }
)
set('useFindAndModify', false)
// createConnection(uri, { useNewUrlParser: true })

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, '../public')))


server.use('/api/registration',registration)
server.use('/api/login',login)
server.use('/api/story',story)

const PORT = process.env.PORT || 3001


connection.once('open',() => server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`)))