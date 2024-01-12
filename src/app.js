require('dotenv').config()
const express = require("express")
const app = express()
const { router } = require("./routes/snippet")
const { route } = require("./routes/user")

const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/snippet", router)
app.use("/user", route)

module.exports = app;