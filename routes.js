const Router = require('express').Router()

const { authenticateUser } = require('./middlewares/auth')
const { loginUser, registerUser, getUsers, getUserByAccount, transferWithin, fund, withdraw } = require('./controllers/user.controllers')


Router.post('/register', registerUser)
Router.post('/login', loginUser)
Router.get('/users', getUsers)
Router.get('/user/:id', authenticateUser, getUserByAccount)
Router.post('/send', authenticateUser, transferWithin)
Router.post('/fund', authenticateUser, fund)
Router.post('/withdraw', authenticateUser, withdraw)


module.exports = Router