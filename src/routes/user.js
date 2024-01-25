const route = require('express').Router()
const { requiresAuth } = require('express-openid-connect')

//const users = []

route.get('/', requiresAuth(), async (req, res) => {
    res.json(req.oidc.user)
})

module.exports = { route };

