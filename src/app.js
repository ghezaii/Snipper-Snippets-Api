require('dotenv').config('.env')
const express = require("express")
const app = express()
const { router } = require("./routes/snippet")
const { route } = require("./routes/user")

const port = 4000

const {
    AUTH0_SECRET,
    AUTH0_AUDIENCE,
    AUTH0_CLIENT_ID,
    AUTH0_BASE_URL,
} = process.env

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: AUTH0_SECRET,
    baseURL: AUTH0_AUDIENCE,
    clientID: AUTH0_CLIENT_ID,
    issuerBaseURL: AUTH0_BASE_URL,
}

const { auth } = require('express-openid-connect');

app.use(auth(config))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/snippet", router)
app.use("/user", route)

module.exports = app;