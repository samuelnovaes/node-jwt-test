const express = require('express')
const jwt = require('jwt-simple')
const bodyParser = require('body-parser')
const app = express()
const secret = 'minhavidaeumamerda'
const users = [
	{
		id: 1,
		login: 'aaa',
		name: 'AAA',
		password: 'aaa'
	},
	{
		id: 2,
		login: 'bbb',
		name: 'BBB',
		password: 'bbb'
	}
]

app.use(bodyParser.json())

function auth(req, res, next){
	let token = req.headers['x-access-token']
	if(token){
		try {
			let decode = jwt.decode(token, secret)
			if(decode.expire < Date.now()){
				res.status(401).json('Token expirado!')
			}
			else {
				req.user = users.find(x => x.id == decode.id)
				next()
			}
		}
		catch(err){
			res.status(401).json('Token inválido!')
		}
	}
	else {
		res.status(401).json('É necessário passar o token!')
	}
}

app.post('/login', (req, res) => {
	let user = users.find(x => x.login == req.body.login && x.password == req.body.password)
	if(user){
		res.json(jwt.encode({
			id: user.id,
			expire: Date.now() + (5 * 60 * 1000)
		}, secret))
	}
	else {
		res.status(401).json('Login inválido!')
	}
})

app.get('/user', auth, (req, res, next) => {
	res.json(`Hello ${req.user.name}!`)
})

app.listen(8080, () => {
	console.log('http://localhost:8080')
})
