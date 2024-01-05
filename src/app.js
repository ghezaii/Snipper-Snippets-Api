const express = require("express")
const app = express()
const { router } = require("./routes/snippet")

const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/snippet", router)

module.exports = app;