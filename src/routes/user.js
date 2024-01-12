const route = require('express').Router()
const basicAuth = require('../middleware/basicAuth')
const bcrypt = require('bcrypt')

const users = []

route.post('/', basicAuth, async (req, res) => {
    const { email, password } = req.user
    const id = users.length + 1

    const salt = 10
    const hash = await bcrypt.hash(password, salt)

    const user = {
        id,
        email,
        password: hash
    }

    users.push(user)
    res.send(201).json({ id, email })
})

route.get('/', basicAuth, async (req, res) => {
    const user = users.find(user => user.email === req.user.email)

    if (!user) {
        return res.status(404).send({ error: 'User not found.' })
    }

    const result = await bcrypt.compare(req.user.password, user.password)

    if (!result) {
        return res.status(401).send({ error: 'Incorrect password.' })
    }

    res.json({ id: user.id, email: user.email })
})

module.exports = { route };

