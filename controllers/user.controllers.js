const { compare, hash } = require('bcryptjs')
const _ = require('lodash')

const knex = require('../db/knex')
const { createToken } = require('../utils/jwt.utils')


let loginUser = async (req, res) => {
	try {
		const { id, password } = req.body

		let dbReturn = await knex('users').select().where({email: id}).orWhere({phone: id})
		let user = dbReturn[0]
		let isValid = await compare(password, user.password)
		if (isValid) {
			let userValues = {
				id: user.id,
			}
			let token = await createToken(userValues)
			return res.json({ message: 'Login Successful', token })
		} else {
			return res.json({ message: 'Invalid Parameters'})
		}
	} catch (error) {
		return res.status(300).json(error)
	}
}

let registerUser = async (req, res) => {
	try {
		const {email, phone } = req.body
		let check = await knex('users').select().where({ email: email }).orWhere({ phone: phone })

		if (!check.length) {
			let data = req.body
			data.password = await hash(data.password, 16)
			
			let account_no = generateAccNo()
			
			await knex('users').insert({ ...data, account_no })
			let dbReturn = await knex.select().from('users').where({ email })
			let newUser = dbReturn[0]
			
			let token = await createToken({
				id: newUser.id
			})

			res.json({
				message: "Sign Up successful",
				fullname: newUser.fullName,
				email: newUser.email,
				phone: newUser.phone,
				account_no: newUser.accountNumber,
				token
			})
		} else {
			res.status(300).json({ message: "Email or Phone has been used to open an account alreday" })
		}
	} catch (error) {
		return res.status(300).json(error)
	}
}

let getUsers = async (req, res) => {
	try {
		let users = await knex('users').select()
		res.json(users)
	} catch (error) {
		res.status(300).json(error)
	}
}

let getUserByAccount = async (req, res) => {
	try {
		let { id } = req.params
		let dbReturn = await knex('users').select().where({accountNumber: id})
		let user = dbReturn[0]

		res.json({fullName : user.fullName})
	} catch (error) {
		res.status(300).json(error)
	}
}

let transferWithin = async (req, res) => {
	try {
		let { destAccountNo, amount } = req.body
		let { id } = req.user;

		let dbReturnSender = await knex('users').select().where({ id })
		let dbReturnReceiver = await knex('users').select().where({ accountNumber: destAccountNo })
		let sender = dbReturnSender[0]
		let senderBalance = sender.balance
		let receiver = dbReturnReceiver[0]
		let receiverBalance = receiver.balance

		if (amount > 0) {
			if (senderBalance > amount){
				console.log("Run Transfer")
				// senderBalance -= amount
				// receiverBalance += amount
				
				let red = await knex('users').where({ id }).update({ balance: senderBalance - amount })
				let blue = await knex('users').where({ accountNumber: destAccountNo }).update({ balance: receiverBalance + amount })

				res.json(red, blue)
			} else {
				console.log("Insufficient Funds")
			}
		} else {
			res.status(300).json({message: "Invalid amount"})
		}
		// console.log(user)

		res.json({destAccountNo, amount, balance })
	} catch (error) {
		res.status(300).json(error)
	}
}

let fund = async (req, res) => {
	try {
		let { amount } = req.body
		let { id } = req.user

		let ret = await knex('users').select().where({ id })

		let balance = ret[0].balance + amount
		await knex('users').where({ id }).update({ balance })
		let user = await knex('users').select().where({ id })

		res.json(user)
	} catch (error) {
		res.status(300).json(error)
	}
}

let withdraw = async (req, res) => {
	try {
		let { amount } = req.body
		let { id } = req.user

		let ret = await knex('users').select().where({ id })

		let balance = ret[0].balance - amount
		await knex('users').where({ id }).update({ balance })
		let user = await knex('users').select().where({ id })
				
		res.json(user)
	} catch (error) {
		res.status(300).json(error)
	}
}

let generateAccNo = () => {
	let result = ''
	const characters = '0123456789'
	for (let i = 0; i < 9; i++) {
		result += characters.charAt(Math.floor(Math.random() * 10))
	}
	return result
}

module.exports = { loginUser, registerUser, getUserByAccount, transferWithin, getUsers, fund, withdraw }